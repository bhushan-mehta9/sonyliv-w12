import React from "react";
import styles from "./ConfirmOtp.module.scss";
import Image from "next/image";
import EditIcon from "../../public/images/editIcon.png";
import ArrowLeft from "../../public/images/arrowLeft.svg";
import { useState } from "react";
import { useEffect, useRef } from "react";
import ResendOtpPopup from "../Modal/ResendOtp/ResendOtpPopup";
import { isMobile } from "react-device-detect";
import { confirmOtp } from "../../lib/signin";
import * as constants from "@/constants/constant";
import { invokeGetProfile } from "@/lib/profile";

const ConfirmOtp = ({
  handleBack,
  handlePageChange,
  data,
  dictionary,
  featureConfig,
}) => {
  const textInput = useRef(null);
  const [inputFocus, setinputFocus] = useState(false);
  const [resendOtpPopup, setResendOtpModal] = useState(false);
  const [resendOtpText, setResendOtpText] = useState(false);
  const [email, setemail] = useState("");
  const [formData, setFormData] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  });
  console.log("featureConfig", featureConfig);
  /**
   * Show the signin page to user
   * Creation Date : 10/02/2023
   */
  const handleClick = () => {
    handleBack("signin");
  };

  /**
   * resendOtp page handeling
   * Creation Date : 10/02/2023
   */
  const handleResendOtp = () => {
    setResendOtpModal(false);
  };

  /**
   * Show the resendOtp page to user
   * Creation Date : 10/02/2023
   */
  const resendClick = () => {
    setResendOtpModal(true);
  };

  /**
   * Call profile Api to get user subscription for success screen
   * Creation Date : 16/02/2023
   */
  const callGetProfileApi = async (channelPartnerId, country_code) => {
    await invokeGetProfile(channelPartnerId, country_code)
      .then((res) => {
        localStorage.setItem("CPID", res.userProfile.resultObj.cpCustomerID);
        localStorage.setItem(
          "Hashed_CPID",
          res.userProfile.resultObj.cpCustomerIDHash
        );

        try {
          /*********** next page navigation with profile response **********/
          if (isMobile) {
            handlePageChange("profileinfo", res);
          } else {
            handlePageChange("loginsuccess", res);
          }
        } catch (error) {
          throw error;
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  /**
   * Call ConfirmOtp Api
   * Creation Date : 16/02/2023
   */
  const callConfirmOtpApi = (phonenumber, otp, country_code) => {
    confirmOtp(phonenumber, otp, country_code)
      .then((result) => {
        const { resultCode, resultObj } = result;

        if (resultCode === constants.SUCCESS_RESULT_CODE) {
          if (typeof localStorage !== "undefined") {
            localStorage.setItem("accessToken", resultObj.accessToken);
            localStorage.setItem("loginType", "mobile");
            localStorage.setItem("CPID", resultObj.cpCustomerID);
          }

          const channelPartnerId = localStorage.getItem("channelPartnerID");
          callGetProfileApi(channelPartnerId, country_code);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  /**
   * Click on next will show the profileinfo page to user
   * Creation Date : 10/02/2023
   */
  const handleNext = () => {
    let country_code = localStorage.getItem("country_code");
    let otp = `${formData.otp1}${formData.otp2}${formData.otp3}${formData.otp4}`;

    /*********** confirmOtp api call ***********/
    callConfirmOtpApi(data.phonenumber, otp, country_code);
  };
 
  /**
   * set otp value ,number validation
   * Creation Date : 10/02/2023
   */
  const handleOtp = (event) => {
    const otpLabel = event.target.name;
    const otpValue = event.target.value;
    if (!isNaN(otpValue)) {
      setFormData((prevState) => ({ ...prevState, [otpLabel]: otpValue }));
    }
    if (!isNaN(otpValue) && otpValue.length > 0) {
      if (otpLabel == "otp4") {
        setinputFocus(otpLabel);
      } else {
        const split = JSON.parse(otpLabel.split("otp")[1]);
        const splitNum = split + 1;
        setinputFocus(`otp${splitNum}`);
      }
    }
  };

  /**
   * after the otp interval the text will change
   * Creation Date : 10/02/2023
   */
  setTimeout(() => {
    setResendOtpText(true);
  }, 5000);

  /**
   * move focus from one otp field to another
   * Creation Date : 10/02/2023
   */
  useEffect(() => {
    textInput.current.focus();
  }, [inputFocus]);

  return (
    <>
      <div className={styles.otpContainer}>
        <div className={styles.sectionOne}>
          <div onClick={handleClick} className={styles.arrowLeftBlock}>
            <Image
              src={ArrowLeft}
              alt="check_icon"
              className={styles.arrowLeft}
            />
          </div>
          <div className={styles.textOne}> 
          {dictionary.OTP_VERIFY_YOU}
          </div>
        </div>
        <div className={styles.sectionTwo}>
        {email ? (
          <div className={styles.otpEmail}>{dictionary.ENTER_OTP_EMAIL}</div>
        ):
        (
          <div className={styles.otpEmail}>{dictionary.ENTER_OTP_MOBILE}</div>
        )}
          <div className={styles.displayFlex}>
            {/* <span className={styles.mobileNo}> +91 252xxxx242</span> */}
            <span onClick={handleClick} className={styles.editIcon}>
              <Image src={EditIcon} alt="edit-icon"></Image>
            </span>
          </div>
        </div>
        <div className={styles.sectionThree}>
          <div className={styles.otpNo}>
            <input
              maxlength="1"
              className={`${styles.otpNo1}  ${
                formData.otp1 ? styles.otpapplied : ""
              }`}
              type="tel"
              name="otp1"
              value={formData.otp1}
              onChange={handleOtp}
              ref={textInput}
              autocomplete="off"
            />
            <input
              maxlength="1"
              className={`${styles.otpNo1}  ${
                formData.otp2 ? styles.otpapplied : ""
              }`}
              type="tel"
              name="otp2"
              value={formData.otp2}
              onChange={handleOtp}
              autocomplete="off"
              ref={inputFocus == "otp2" ? textInput : null}
            />
            <input
              maxlength="1"
              className={`${styles.otpNo1}  ${
                formData.otp3 ? styles.otpapplied : ""
              }`}
              type="tel"
              name="otp3"
              value={formData.otp3}
              onChange={handleOtp}
              autocomplete="off"
              ref={inputFocus == "otp3" ? textInput : null}
            />
            <input
              maxlength="1"
              className={`${styles.otpNo1}  ${
                formData.otp4 ? styles.otpapplied : ""
              }`}
              type="tel"
              name="otp4"
              value={formData.otp4}
              onChange={handleOtp}
              autocomplete="off"
              ref={inputFocus == "otp4" ? textInput : null}
            />
          </div>
        </div>
        {resendOtpText ? (
          <div className={styles.sectionFour} style={{ cursor: "pointer" }}>
            <span className={styles.grayColor} onClick={resendClick}>{dictionary.DIDNT_RECIEVE_TEXT}</span>
            {/* <span style={{ textDecoration: "underline" }} >
              Try Again
            </span> */}
          </div>
        ) : (
          <div className={styles.sectionOtp}>
            {dictionary.receive_sms_shortly}
            <div>
             {dictionary.VALID_OTP_TEXT} <span className={styles.blueColor}> {dictionary.OTP_TIMER_VALUE}</span>
            </div>
          </div>
        )}
        <button
          onClick={handleNext}
          className={`${styles.button} ${
            formData.otp1 && formData.otp2 && formData.otp3 && formData.otp4
              ? styles.activeBtn
              : ""
          }`}
          disabled={
            formData.otp1 && formData.otp2 && formData.otp3 && formData.otp4
              ? false
              : true
          }
        >
          <div className={styles.buttonText}>Next</div>
        </button>
        <div className={styles.pagination}>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <ResendOtpPopup
          isOpen={resendOtpPopup}
          handleModal={handleResendOtp}
          dictionary={dictionary}
          featureConfig={featureConfig}
        />
      </div>
    </>
  );
};
export default ConfirmOtp;
