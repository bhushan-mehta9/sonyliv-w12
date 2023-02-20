import axios from "axios";
import * as constants from "@/constants/constant";
import useSWR from 'swr';

/**
 * ServerSide Common API call function
 * Creation Date : 10/02/2023
 */
export const getCommonData = async () =>  {
    const cluster = constants.DIRECTORY_1;
    let commonData = {};

    //generate security_token api call
    const SecurityUrl = `${process.env.API_BASE_PATH}/${constants.MIDDLE_WARE}/${constants.VERSION}/${cluster}/${constants.DIRECTORY_2}/${constants.PLATFORM}/ALL/GETTOKEN `;
    let securityTokenData = await axios
        .get(SecurityUrl)
        .then((response) => response)
        .catch((error) => {
            throw error;
        });
        
    let security_token = securityTokenData.data.resultObj;

    commonData.security_token =  security_token

    //ULD api call
    const countryUrl = `${process.env.API_BASE_PATH}/${constants.MIDDLE_WARE}/${constants.VERSION}/${constants.DIRECTORY_1}/${constants.DIRECTORY_2}/${constants.CHANNEL}/ALL/USER/ULD`;
    let uldData = await axios
        .get(countryUrl, {
            headers: {
                security_token: security_token,
            },
        })
        .then((response) => response)
        .catch((error) => {
            throw error;
        });

    if(uldData){
        commonData.uld =  uldData.data
    }

    //DICTIONARY api call
    let country_code = uldData.data.resultObj.country_code;
    const dictionaryUrl = `${process.env.API_BASE_PATH}/${constants.MIDDLE_WARE}/${constants.API_NEXT_VERSION}/${cluster}/${constants.DIRECTORY_2}/${constants.CHANNEL}/${country_code}/CONFIG/DICTIONARY`;
    let dictionaryData = await axios
        .get(dictionaryUrl, {
            headers: {
                security_token: security_token,
            },
        })
        .then((response) => response)
        .catch((error) => {
            throw error;
        });

    if(dictionaryData){
        commonData.dictionary =  dictionaryData.data
    }

    // INITIAL config api call
    const initialConfigPath = `${process.env.API_BASE_PATH}/${constants.MIDDLE_WARE}/${constants.API_NEXT_VERSION}/${cluster}/${constants.DIRECTORY_2}/${constants.CHANNEL}/${country_code}/INITIAL/CONFIG`;
    let initialConfigData = await axios
        .get(initialConfigPath, {
            headers: {
                security_token: security_token,
            },
        })
        .then((response) => response)
        .catch((error) => {
            throw error;
        });

    if(initialConfigData){
        commonData.initialConfig =  initialConfigData.data
    }

    // FEATURE config api call
    const featureConfigPath = `${process.env.API_BASE_PATH}/${constants.MIDDLE_WARE}/${constants.API_NEXT_VERSION}/${cluster}/${constants.DIRECTORY_2}/${constants.CHANNEL}/${country_code}/FEATURE/CONFIG`;
    let featureConfigData = await axios
        .get(featureConfigPath, {
            headers: {
                security_token: security_token,
            },
        })
        .then((response) => response)
        .catch((error) => {
            throw error;
        });

    if(featureConfigData){
        commonData.featureConfig =  featureConfigData.data
    }

    return commonData;
}


/**
 * function to create device_id token
 * Creation Date : 10/02/2023
 */
export const generateToken = () => {
    try {
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            var dt = new Date().getTime();
            var uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                var r = (dt + Math.random() * 16) % 16 | 0;
                dt = Math.floor(dt / 16);
                return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
            });
            localStorage.setItem('token',uuid + "-" + new Date().getTime().toString())
            return uuid + "-" + new Date().getTime().toString()
        }
    } catch (error) {
        throw error;
    }
}


/**
 * featch config data after login based on user status i.e R/SR/SRK
 * Creation Date : 10/02/2023
 */
export const getConfigApiAfterLogin = () => {
    try {
        let commonData = {};

        const cluster = (typeof window !== "undefined" && localStorage.getItem("cluster")) || constants.DIRECTORY_1;
        const country_code = (typeof window !== "undefined" && localStorage.getItem("country_code"))

        // INITIAL config api call
        const initialConfigPath = `${process.env.API_BASE_PATH}/${constants.MIDDLE_WARE}/${constants.API_NEXT_VERSION}/${cluster}/${constants.DIRECTORY_2}/${constants.CHANNEL}/${country_code}/INITIAL/CONFIG`;
        // FEATURE config api call
        const featureConfigPath = `${process.env.API_BASE_PATH}/${constants.MIDDLE_WARE}/${constants.API_NEXT_VERSION}/${cluster}/${constants.DIRECTORY_2}/${constants.CHANNEL}/${country_code}/FEATURE/CONFIG`;

        const { data: initialConfig, error: initialConfigError } = useSWR(initialConfigPath, getInitialConfigApi);
        const { data: featureConfig, error: featureConfigError } = useSWR(featureConfigPath, getFeatureConfigApi);
    
        if(initialConfig){
            commonData.initialConfig =  initialConfig
        }
        if(featureConfig){
            commonData.featureConfig =  featureConfig
        }

        return commonData;
    } catch (error) {
        throw error
    }
}

export const getInitialConfigApi = async (...args) => {
    try {
        let initialConfigData = await axios
        .get(...args, {
            headers: {
                security_token: localStorage.getItem('security_token'),
            },
        })
        .then((response) => response)
        .catch((error) => {
            throw error;
        });

        return initialConfigData.data;
    } catch (error) {
        throw error
    }
}

export const getFeatureConfigApi = async (...args) => {
    try {
        let featureConfigData = await axios
        .get(...args, {
            headers: {
                security_token: localStorage.getItem('security_token'),
            },
        })
        .then((response) => response)
        .catch((error) => {
            throw error;
        });

        return featureConfigData.data;
    } catch (error) {
        throw error
    }
}