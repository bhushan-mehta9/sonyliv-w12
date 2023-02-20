import axios from "axios";
import * as constants from "@/constants/constant";

/**
 * GETPROFILE API call function
 * Creation Date : 15/02/2023
 */
export const getProfileDetails = async (channelPartnerID, country_code) => {
    const { TENANT, CLUSTER, LOCALE, CHANNEL, API_VERSION_FOR_GETPROFILE } = constants;
    const stateCode = localStorage.getItem("state_code") || "ALL";

    let profileUrl = `${process.env.API_BASE_PATH}/${TENANT}/${API_VERSION_FOR_GETPROFILE}/${CLUSTER}/${LOCALE}/${CHANNEL}/${country_code}/${stateCode}/GETPROFILE?channelPartnerID=${channelPartnerID}`;
    try {
        if (isMobile) {
            let param = profileUrl.includes("?") ? `&isMweb=true` : `?isMweb=true`
            profileUrl = `${profileUrl}${param}`;
        }
    } catch (error) {
        console.error(error, 'profileUrl');
    }
    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    if (ACCESS_TOKEN) {
        return await axios(profileUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-via-device": "true",
                authorization: ACCESS_TOKEN,
                security_token: localStorage.getItem("security_token"),
                app_version: process.env.APP_VERSION,
                device_id: localStorage.getItem("token"),
            },
        })
        .then((response) => {
            if (
                response.data &&
                response.data.resultObj &&
                response.data.resultObj.accessToken
            ) {
                localStorage.setItem(
                "accessToken",
                response.data.resultObj.accessToken
                );
                localStorage.setItem(
                "Hashed_CPID",
                response.data.resultObj.cpCustomerIDHash
                );
            }
  
            if (response.data &&
                response.data.resultObj &&
                response.data.resultObj.contactMessage && response.data.resultObj.contactMessage.length > 0 &&
                response.data.resultObj.contactMessage[0].subscription && response.data.resultObj.contactMessage[0].subscription.accountServiceMessage &&
                response.data.resultObj.contactMessage[0].subscription.accountServiceMessage.length > 0 &&
                response.data.resultObj.contactMessage[0].subscription.accountServiceMessage) {
                if (response.data.resultObj.contactMessage[0].subscription.accountServiceMessage.length > 0) {
                    let serviceIdArr = [];
                    const accountServiceMessageArr = response.data.resultObj.contactMessage[0].subscription.accountServiceMessage;
        
                    accountServiceMessageArr.map((actService) => {
                        if (actService.serviceID) {
                            serviceIdArr.push(actService.serviceID)
                        }
                    });
        
                    localStorage.setItem( "serviceID", serviceIdArr.join(',') );
                }
            }
    
            return response.data;
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return false;
    }
};


/**
 * get primary profil of user function
 * Creation Date : 20/02/2023
 */
export const getPrimaryProfile = (profileResponse) => {
    const profileArray =
        (profileResponse &&
        profileResponse.resultCode === constants.SUCCESS_RESULT_CODE &&
        profileResponse.resultObj &&
        Array.isArray(profileResponse.resultObj.contactMessage) &&
        profileResponse.resultObj.contactMessage) ||
        [];
    let primaryProfile = profileArray.find(
        (profile) => profile.isPrimaryContact === true
    );
    if (!primaryProfile) {
        const primary = profileArray[0];
        primaryProfile = primary;
    }
    return primaryProfile;
};


export const invokeGetProfile = async (channelPartnerID, country, ACCESS_TOKEN = null) => {
    return await getProfileDetails(channelPartnerID, country, ACCESS_TOKEN = null)
        .then((userProfile) => {
            if (userProfile.resultCode === constants.SUCCESS_RESULT_CODE) {
                localStorage.setItem("user_profile_data", JSON.stringify(userProfile));
                if (typeof localStorage !== "undefined") {
                    localStorage.setItem("CPID", userProfile.resultObj.cpCustomerID);
                    localStorage.setItem("Hashed_CPID", userProfile.resultObj.cpCustomerIDHash);
                }
                const isSingleProfile =
                    (userProfile &&
                    userProfile.resultCode === "OK" &&
                    userProfile.resultObj &&
                    Array.isArray(userProfile.resultObj.contactMessage) &&
                    userProfile.resultObj.contactMessage.length === 1) ||
                    false;
                if (
                    typeof localStorage !== "undefined" &&
                    localStorage.getItem("isGalaxyWebView") &&
                    isSingleProfile
                ) {
                    const contactId = userProfile.resultObj.contactMessage[0].contactID;
                    localStorage.setItem(constants.CONTACT_ID_KEY, contactId);
                    if (
                    userProfile.resultObj.contactMessage[0].contactType ===
                    constants.CONTACT_TYPE.KID
                    ) {
                        localStorage.setItem(
                            constants.KIDS_AGE_GROUP_NAME,
                            userProfile.resultObj.contactMessage[0].ageGroup
                        );
                    } else {
                        if (localStorage.getItem(constants.KIDS_AGE_GROUP_NAME)) {
                            localStorage.removeItem(constants.KIDS_AGE_GROUP_NAME);
                        }
                    }
                }
                let primaryprofile = getPrimaryProfile(userProfile);
                var userState, subcriptionStatus, isUpgradable, pendingPriceConsentInfo;
                var accountPacks =
                    primaryprofile && primaryprofile.subscription.accountServiceMessage
                    ? primaryprofile.subscription.accountServiceMessage
                    : [];

                const { subscription } = primaryprofile;
                const userStateParam = primaryprofile.userStateParam || constants.CLUSTERS.REGISTERED;
                localStorage.setItem("cluster", userStateParam);
                userState =
                    subscription.accountServiceMessage &&
                    subscription.accountServiceMessage.length > 0
                    ? 2
                    : 1;
                const upgradable =
                    subscription.accountServiceMessage &&
                    subscription.accountServiceMessage.find(
                    (pack) => pack.upgradable === false
                    );
                subcriptionStatus =
                    subscription.accountServiceMessage &&
                    subscription.accountServiceMessage.length > 0
                    ? "Active"
                    : "InActive";
                isUpgradable = upgradable ? false : true;
    
                for (let i = 0; i < subscription.accountServiceMessage.length; i++) {
                    if (subscription.accountServiceMessage[i].canShowConsent) {
                        pendingPriceConsentInfo = subscription.accountServiceMessage[i];
                        break;
                    }
                }
          
                return {
                    userState: userState,
                    subcriptionStatus: subcriptionStatus,
                    isUpgradable: isUpgradable,
                    userProfile: userProfile,
                    pendingPriceConsentInfo: pendingPriceConsentInfo,
                    accountPacks: accountPacks,
                };
            }
        })
        .catch((err) => {
            const statusCode = err.response.status;
            const resultCode = err.response.data.resultCode;
            if (
                statusCode === constants.UNAUTHORIZED_CODE &&
                resultCode === constants.FAILURE_RESULT_CODE
            ) {
                try {
                    localStorage.removeItem("accessToken");
                    localStorage.setItem("cluster", constants.DIRECTORY_1);
                } catch (error) {
                    throw error;
                }
            }
        });
};
  