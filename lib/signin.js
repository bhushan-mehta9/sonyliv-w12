import axios from "axios";
import * as constants from "@/constants/constant";
/**
 * Send OTP to user on his mobile number at the time of login
 * Creation Date : 10/02/2023
 */
export const createOtp = (
  mobileNum,
  countryCode,
  channelPartnerId,
  email,
  loginTypeMethod,
  otpSizeEmail,
  isFromProfileEdit,
  shortToken,
  accessToken,
  isMobileMandatory = false,
  isUserAccountDelete
) => {
  const { TENANT, API_VERSION_1_6, CLUSTER, LOCALE, CHANNEL } = constants;
  const cluster =
    (typeof window !== "undefined" && localStorage.getItem("cluster")) ||
    CLUSTER;
  const stateCode = localStorage.getItem("state_code") || "ALL";
  const createOtpUrl = `${process.env.API_BASE_PATH}/${TENANT}/${API_VERSION_1_6}/${cluster}/${LOCALE}/${CHANNEL}/${countryCode}/${stateCode}/CREATEOTP-V2`;
  const currentTime = new Date();
  let loginType;
  const userAccountStatus = isUserAccountDelete ? isUserAccountDelete : "";

  if (
    loginTypeMethod != null &&
    loginTypeMethod != undefined &&
    loginTypeMethod.length > 2
  ) {
    loginType = {
      loginType: loginTypeMethod,
    };
  }

  const mobileOrEmail = mobileNum
    ? { mobileNumber: mobileNum }
    : email
    ? { email: email }
    : null;

  let payload = {
    ...mobileOrEmail,
    channelPartnerID: channelPartnerId,
    country: countryCode,
    timestamp: currentTime.toISOString(),
    otpSize: otpSizeEmail,
    ...loginType,
    ...(isFromProfileEdit && { deviceType: "" }),
    ...(isFromProfileEdit && { serialNo: "" }),
    ...(isFromProfileEdit && { loginType: "REGISTER" }),
    ...(!!isMobileMandatory && { isMobileMandatory }),
    ...(shortToken && { shortToken: shortToken }),
    ...(accessToken && { accessToken: accessToken }),
  };

  if (userAccountStatus) {
    payload = { ...payload, source: userAccountStatus };
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
      if (
        error.response &&
        error.response.status === constants.ERROR_STATUS_CODE_500 &&
        error.response.data.resultCode === constants.FAILURE_RESULT_CODE &&
        error.response.data.errorDescription === constants.DEVICE_MAX_ERROR_DESC
      ) {
        return error.response.data;
      } else {
        throw error;
      }
    });
};
