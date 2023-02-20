import axios from "axios";
import * as constants from "@/constants/constant";
/**
 * Send OTP to user on his mobile number at the time of login
 * Creation Date : 10/02/2023
 */
export const createOtp = (
  mobileNum,
  countryCode,
) => {
  try {
    const { TENANT, API_VERSION_1_6, CLUSTER, LOCALE, CHANNEL } = constants;
    const cluster = (typeof window !== "undefined" && localStorage.getItem("cluster")) || CLUSTER;
    const stateCode = (typeof window !== "undefined" && localStorage.getItem("state_code")) || "ALL";

    const createOtpUrl = `${process.env.API_BASE_PATH}/${TENANT}/${API_VERSION_1_6}/${cluster}/${LOCALE}/${CHANNEL}/${countryCode}/${stateCode}/CREATEOTP-V2`;
    const currentTime = new Date();

    let payload = {
      "mobileNumber": mobileNum,
      "channelPartnerID": "MSMIND1",
      country: countryCode,
      timestamp: currentTime.toISOString(),
      "otpSize": 4,
      "loginType": "REGISTERORSIGNIN",
      "isMobileMandatory": true
    }

    return axios(createOtpUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-via-device": true,
        security_token: localStorage.getItem("security_token"),
        app_version: process.env.APP_VERSION,
        device_id: localStorage.getItem("token"),
      },
      data: payload,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Validate OTP enter by user at the time of login
 * Creation Date : 10/02/2023
 */
export const confirmOtp = (
  mobileNum,
  otp,
  countryCode,
) => {
  try {
    const { TENANT, API_VERSION_2_0, CLUSTER, LOCALE, CHANNEL } = constants;
    const cluster = (typeof window !== "undefined" && localStorage.getItem("cluster")) || CLUSTER;
    const version = localStorage.getItem("flipkartIdentityToken") ? "1.5" : API_VERSION_2_0;
    const stateCode = localStorage.getItem("state_code") || "ALL";

    const confirmOtpUrl = `${process.env.API_BASE_PATH}/${TENANT}/${version}/${cluster}/${LOCALE}/${CHANNEL}/${countryCode}/${stateCode}/CONFIRMOTP-V2`;
    const currentTime = new Date();
    const mobileOrEmail = mobileNum ? { mobileNumber: mobileNum } : null;

    let payload = {
      "channelPartnerID": "MSMIND1",
      ...mobileOrEmail,
      country: countryCode,
      otp: otp.toString(),
      "dmaId": "IN",
      "ageConfirmation": true,
      timestamp: currentTime.toISOString(),
      "isMobileMandatory": true,
      "deviceDetails": {
        appClientId: constants.APP_CLIENT_ID,
        deviceName: constants.GA_DEVICE_ID,
        deviceType: constants.DEVICE_TYPE,
        gaUserId: constants.GA_USER_ID,
        "modelNo": "Chrome Browser",
        serialNo: localStorage.getItem("token"),
      },
      address: {
        state: stateCode
      },
    }

    return axios(confirmOtpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-via-device": true,
        security_token: localStorage.getItem("security_token"),
      },
      data: payload,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
  } catch (error) {
    throw error;
  }
};