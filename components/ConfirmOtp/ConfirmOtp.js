import React from "react";
import styles from "./ConfirmOtp.module.scss";
import Image from "next/image";
import EditIcon from "../../../src/srcAssets/images/editIcon.png";
import { useRouter } from "next/router";
import ArrowLeft from "../../../public/assets/arrow-left.svg";
import { useState } from "react";
import ResendOtpPopup from "../ResendOtp/ResendOtpPopup";

const ConfirmOtp = () => {
  const [resendOtpPopup, setResendOtpModal] = useState(false);
  const [resendOtpText, setResendOtpText] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push("/signin");
  };
  function handleResendOtp() {
    setResendOtpModal(false);
  }
  function resendClick() {
    setResendOtpModal(true);
  }

  const handleNext = () => {
    router.push("/profileinfo");
  };
  const [formData, setFormData] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  });
  const handleOtp = (event) => {
    const otpLabel = event.target.name;
    const otpValue = event.target.value;
    if (!isNaN(otpValue)) {
      setFormData((prevState) => ({ ...prevState, [otpLabel]: otpValue }));
    }
  };

  // const fn = (event, to) => {
  //   const len = event.target.value;
  //   const max = event.target.maxlength;
  //   console.log("value is", event, event.target.name);
  //   if (len == max) {
  //     document.getElementById("#otp1").nextElementSibling;
  //   }
  // };

  setTimeout(() => {
    console.log("set timeout working");
    setResendOtpText(true);

  }, 2000);

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
            {/* <span className={styles.vectorOne}></span>
            <span className={styles.vectorTwo}></span> */}
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
              id="otp1"
              value={formData.otp1}
              onChange={handleOtp}
              onKeyUp={fn}
            />
            <input
              maxlength="1"
              className={`${styles.otpNo1}  ${
                formData.otp2 ? styles.otpapplied : ""
              }`}
              type="tel"
              name="otp2"
              id="otp2"
              value={formData.otp2}
              onChange={handleOtp}
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
            />
          </div>
        </div>
        {resendOtpText ? <div className={styles.sectionFour} onClick={resendClick}>Didn’t receive the code? Try Again</div> : <div className={styles.sectionFour} >
          You will be receiving an SMS shortly
          <div  style={{ cursor: "pointer" }}>
            Resend OTP in <span className={styles.blueColor}> 01:56</span>
          </div>
        </div>
}
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
