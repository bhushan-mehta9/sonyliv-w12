import React, { useState, useEffect } from "react";
import style from "./SignIn.module.scss";
import SelectCountry from "../../components/Modal/CountryModal/SelectCountry";
import SelectCountryCode from "../../components/Modal/SelectCountryCode/selectCode";
import { useRouter } from "next/router";
import Image from "next/image";
import EmailAndSocialPopup from "../../components/Modal/SignInEmailSocialPopup/EmailAndSocialPopup";
import LinkYourMobilePopup from "../../components/Modal/LinkYourMobile/LinkYourMobilePopup";
import ArrowLeft from "../../public/images/arrowLeft.svg";
import ArrowDown from "../../public/images/arrow_down_Vector.png";
import {
  isMobile,
  isTablet,
  isMobileOnly,
  isDesktop,
} from "react-device-detect";
import { createOtp } from "../../lib/signin";
import * as constants from "@/constants/constant";
import ExitPopup from "../Modal/ExitConfirmPopup/ExitPopup";

const SignIn = ({
  handleBack,
  handlePageChange,
  closeSignIn,
  dictionary,
  featureConfig,
}) => {
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [isLinkModal, setIsLinkModal] = useState(false);
  const [socialLoginModal, setSocialLoginModal] = useState(false);
  const [linkPage, setLinkPage] = useState(false);
  const [mobile, setmobile] = useState(false);
  const [active, setActive] = useState(false);
  const [code, setcode] = useState("+91");
  const [phonenumber, setphonenumber] = useState("");
  const [email, setemail] = useState("");
  const [error, seterror] = useState();
  const [emailInput, setemailInput] = useState("");

  /**
   * open country code dropdown
   * Creation Date :10/02/23
   */

  const onDropDown = () => {
    setIsCountryModalOpen(!isCountryModalOpen);
  };

  /**
   * Close country code dropdown
   * Creation Date: 20/02/23
   */
  const closeDropdown = () => {
    if (isCountryModalOpen) {
      setIsCountryModalOpen(false);
    }
  };
  /**
   * close country code dropdown
   * Creation Date :10/02/23
   */
  const handleCountryModal = () => {
    setIsCountryModalOpen(false);
  };
  /**
   * Open social Login popup
   * Creation Date :10/02/23
   */
  const handleSocialModalClose = () => {
    setSocialLoginModal(false);
  };
  /**
   * Close social login popup
   * Creation Date :10/02/23
   */
  const handleSocialLoginModal = () => {
    setActive(false);
    setSocialLoginModal(true);
  };
  /**
   * Close Mobile number link popup
   * Creation Date :10/02/23
   */
  const handleLinkModal = () => {
    setIsLinkModal(false);
  };
  /**
   * Handle country code dropdown for web
   * Creation Date :10/02/23
   */
  const handleClick = () => {
    if (email) {
      active ? setIsLinkModal(true) : setIsLinkModal(false);
    }
    const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (regex.test(phonenumber) === true) {
      seterror(false);
      setActive(true);

      /*********** createOtp api call ***********/
      let country_code = localStorage.getItem("country_code");
      createOtp(phonenumber, country_code)
        .then((result) => {
          const { resultCode, resultObj } = result;
          if (resultCode === constants.SUCCESS_RESULT_CODE) {
            handlePageChange("confirmotp", { phonenumber: phonenumber });
          }
        })
        .catch((error) => {
          throw error;
        });
    } else {
      seterror(true);
      setActive(false);
    }
  };
  const codehandler = (e) => {
    setcode(e.target.value);
  };
  /**
   * To handle next button from mobile sigin screen
   * Creation Date : 10/02/2023
   */
  const onNumberChange = (e) => {
    const mobileNo = e.target.value;
    if (isNaN(mobileNo)) {
      return "";
    } else {
      setphonenumber(e.target.value);
      if (mobileNo.length >= 10) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
  };

  /**
   * To handle Log in with Email ID modal
   * Creation Date : 06/02/2023
   */
  const emailHandler = (e) => {
    setemail(true);
    setSocialLoginModal(false);
  };
  const handleCancelAccountSetup = () => {
    setemail(false);
    setSocialLoginModal(false);
  };
  const emailChangehandler = (e) => {
    const valueEmail = e.target.value;
    setemailInput(valueEmail);
    const regexmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regexmail.test(valueEmail) === true) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  /**
   * To handle continue Link  Mobile no. with Email ID
   * Creation Date : 10/02/2023
   */
  const continueLinkEmail = () => {
    setLinkPage(true);
    setemail(false);
    setIsLinkModal(false);
  };
  /**
   * Click to handle back event for sigin pages
   * Creation Date : 09/02/2023
   */
  const handleBackClick = () => {
    setphonenumber("");
    setemailInput("");
    setActive(false);
    if (email) {
      setemail("");
    } else if (linkPage) {
      setLinkPage("");
    } else {
      closeSignIn();
    }
  };

  return (
    <div onClick={closeDropdown}>
      <div className={style.mainheader}>
        <div className={style.headerweb}>
          <div className={style.imgdiv} onClick={handleBackClick}>
            <Image
              src={ArrowLeft}
              alt="check_icon"
              className={style.arrowLeft}
            />
          </div>
          {linkPage ? (
            <>
              <div className={style.signweb}>
                {dictionary.link_mobile_no}
              </div>
            </>
          ) : (
            <>
              <div className={style.signweb}>
                {dictionary.signin_title}
                </div>
            </>
          )}
        </div>
        <div className={style.new}>
          {email ? (
            <div className={style.containeremail}>
              <input
                className={style.email}
                type="email"
                name="email"
                value={emailInput}
                onChange={emailChangehandler}
                autocomplete="off"
              />
              <label className={style.labelemail} for="phone_number">
                Enter your email address
              </label>
              <div className={style.note}>
                {dictionary.otp_to_linked_mobileno}
              </div>
            </div>
          ) : (
            <>
              <div className={style.containerphone}>
                <span className={style.defaultcode}>{code}</span>
                <span className={style.country} onClick={onDropDown}>
                  <Image
                    src={ArrowDown}
                    width={10}
                    height={5}
                    alt="arrow_down"
                  />
                </span>
                <input
                  className={style.number}
                  type="text"
                  max="10"
                  value={phonenumber}
                  onChange={onNumberChange}
                  autocomplete="off"
                  id="phone_number"
                />
                <label className={style.labelphone} for="phone_number">
                  {dictionary.mobileno_input}
                </label>
              </div>
            </>
          )}

          <div className={style.btndiv}>
            <button
              className={active ? style.active : style.nextbtn}
              onClick={handleClick}
            >
              {dictionary.next_cta}
            </button>
          </div>
          <div className={style.proceed}>
            {dictionary.term_condition_disclaimer}
            {/* By proceeding you confirm that you are of 18 years or above and
            accept the <span className={style.tnc}> Terms of Use</span> &{" "}
            <span className={style.pp}>Privacy Policy</span> */}
          </div>
          {email || linkPage ? (
            ""
          ) : (
            <>
              <div className={style.alreadyaccount}>
                {dictionary.email_social_login_title}
              </div>
              <div
                className={style.viaemail}
                onClick={() => handleSocialLoginModal()}
              >
                {dictionary.email_social_login_options}
              </div>
            </>
          )}
        </div>
        <div className={style.pagination}>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      {isMobile && !isTablet ? (
        <SelectCountry
          isOpen={isCountryModalOpen}
          handleModal={handleCountryModal}
          codehandler={codehandler}
          title="Select Country"
        />
      ) : (
        <SelectCountryCode
          isOpen={isCountryModalOpen}
          handleModal={handleCountryModal}
          codehandler={codehandler}
          title="Select Country"
        />
      )}
      <EmailAndSocialPopup
       dictionary={dictionary}
        isOpen={socialLoginModal}
        handleModal={handleSocialModalClose}
        emailHandler={emailHandler}
        featureConfig={featureConfig}
      />
      <LinkYourMobilePopup
        dictionary={dictionary}
        featureConfig={featureConfig}
        isOpen={isLinkModal}
        handleModal={handleLinkModal}
        continueClick={continueLinkEmail}
        cancelAccountSetup={handleCancelAccountSetup}
      />
    </div>
  );
};

export default SignIn;
