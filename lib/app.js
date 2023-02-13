import axios from "axios";
import * as constants from "@/constants/constant";

/**
 * Common API call function
 * Creation Date : 10/02/2023
 */
export async function getCommonData() {
    const cluster = (typeof window !== "undefined" && localStorage.getItem("cluster")) || constants.DIRECTORY_1;
    let commonData = {};

    //generate security_token api call
    const SecurityUrl = `${process.env.API_BASE_PATH}/${constants.MIDDLE_WARE}/${constants.VERSION}/${cluster}/${constants.DIRECTORY_2}/${constants.PLATFORM}/ALL/GETTOKEN `;
    let securityTokenData = await axios
        .get(SecurityUrl)
        .then((response) => {
            return response;   
        })
        .catch((error) => {
            throw error;
        });
        
    let security_token = securityTokenData.data.resultObj;

    //ULD api call
    const countryUrl = `${process.env.API_BASE_PATH}/${constants.MIDDLE_WARE}/${constants.VERSION}/${constants.DIRECTORY_1}/${constants.DIRECTORY_2}/${constants.CHANNEL}/ALL/USER/ULD`;
    let uldData = await axios
        .get(countryUrl, {
            headers: {
                security_token: security_token,
            },
        })
        .then((response) => {
            return response; 
        })
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
        .then((response) => {
            return response; 
        })
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
        .then((response) => {
            return response;    
        })
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
        .then((response) => {
            return response;    
        })
        .catch((error) => {
            throw error;
        });

    if(featureConfigData){
        commonData.featureConfig =  featureConfigData.data
    }

    return commonData
}
