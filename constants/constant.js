import { isMobile, isTablet } from "react-device-detect";

export const TENANT = "AGL";
export const API_VERSION = "1.4";
export const CLUSTER = "A";
export const LOCALE = "ENG";
export const CHANNEL = isMobile ? "MWEB" : "WEB";
export const MIDDLE_WARE = "AGL";
export const VERSION = "1.4";
export const DIRECTORY_1 = "A";
export const DIRECTORY_2 = "ENG";
export const PLATFORM = isMobile ? "MWEB" : "WEB";
export const APP_CLIENT_ID = "1212475532.1575468358";
export const GA_DEVICE_ID = "NA";
export const DEVICE_TYPE = "webClient";
export const GA_USER_ID = "GA1.2.1212475532.1575468358";
export const API_NEXT_VERSION = "1.5";
export const API_VERSION_1_5 = "1.5";
export const API_VERSION_1_6 = "1.6";
export const API_VERSION_1_7 = "1.7";
export const API_VERSION_1_8 = "1.8";
export const API_VERSION_1_9 = "1.9";
export const API_VERSION_2_0 = "2.0";
export const API_VERSION_2_1 = "2.1";
export const API_VERSION_2_2 = "2.2";
export const API_VERSION_2_3 = "2.3";
export const API_VERSION_2_4 = "2.4";
export const API_VERSION_2_5 = "2.5";
export const API_VERSION_FOR_GETPROFILE = "2.9";
export const SUCCESS_RESULT_CODE = "OK";
export const FAILURE_RESULT_CODE = "KO";
export const FAILURE_STATUS_CODE = 500;
export const UNAUTHORIZED_CODE = 401;
export const BADREQUEST_CODE = 400;
export const CONTACT_ID_KEY = "selected_contact_id";
export const KIDS_AGE_GROUP_NAME = "selected_kids_age_group";
export const CLUSTERS = {
    ANONYMOUS: "A",
    REGISTERED: "R",
    SUBSCRIBED: "SR",
    SUBSCRIBED_KID: "SRK",
};
export const CONTACT_TYPE = {
    KID: "Kid",
    ADULT: "Non Kid",
};



/*****************Profile setup screen label *******************/

export const profile_setup_title = 'Tell us about yourself';
export const profile_setup_choose_avatar_title = 'Choose avatar';
export const profile_setup_name_placeholder = 'Name';
export const profile_setup_kids_mode_title = "kid's mode";
export const profile_setup_dob_placeholder = 'Date of birth (DD/MM/YYYY)';
export const profile_setup_select_gender_title = 'What do you identify as?';
export const profile_setup_select_languages_title = 'Choose your preferred content language ';
export const profile_setup_create_cta = 'Create Profile';
/*************************************************************/