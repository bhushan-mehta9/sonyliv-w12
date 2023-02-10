import React from "react";
import styles from "./ConfirmOtp.module.scss";
import Image from "next/image";
import EditIcon from "../../public/images/editIcon.png";
import { useRouter } from "next/router";
import ArrowLeft from "../../public/images/arrowLeft.svg";
import { useState } from "react";
import { useEffect, useRef } from "react";
import ResendOtpPopup from "../Modal/ResendOtp/ResendOtpPopup";

const ConfirmOtp = (handleBack) => {
  const router = useRouter();
  const textInput = useRef(null);
  const [inputFocus, setinputFocus] = useState(false);
  const [resendOtpPopup, setResendOtpModal] = useState(false);
  const [resendOtpText, setResendOtpText] = useState(false);
  const [formData, setFormData] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  });

  /**
   * Show the signin page to user
   * Creation Date : 10/02/2023
   */
  const handleClick = () => {
    handleBack("/signin");
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
   * Click on next will show the profileinfo page to user
   * Creation Date : 10/02/2023
   */
  const handleNext = () => {
    router.push("/profileinfo");
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
        console.log("otp--", split, splitNum);
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
    <meta name="description" content="Confirm Otp Page"></meta>
    <title>Confirm Otp Page</title>
      <div className={styles.otpContainer}>
        <div className={styles.sectionOne}>
          <div onClick={handleClick} className={styles.arrowLeftBlock}>
            <Image
              src={ArrowLeft}
              alt="check_icon"
              className={styles.arrowLeft}
            />
          </div>
          <div className={styles.textOne}> Please verify its you</div>
        </div>
        <div className={styles.sectionTwo}>
          <div className={styles.otpEmail}>Enter the OTP sent to:</div>
          <div className={styles.displayFlex}>
            <span className={styles.mobileNo}> +91 252xxxx242</span>
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
              ref={inputFocus == "otp4" ? textInput : null}
            />
          </div>
        </div>
        {resendOtpText ? (
          <div className={styles.sectionFour} onClick={resendClick}>
            Didn’t receive the code? Try Again
          </div>
        ) : (
          <div className={styles.sectionFour}>
            You will be receiving an SMS shortly
            <div style={{ cursor: "pointer" }}>
              Resend OTP in <span className={styles.blueColor}> 01:56</span>
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
        <ResendOtpPopup isOpen={resendOtpPopup} handleModal={handleResendOtp} />
      </div>
    </>
  );
};

export default ConfirmOtp;
