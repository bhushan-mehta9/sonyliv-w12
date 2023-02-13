import React, { useState, useEffect } from "react";
import style from "./SignIn.module.scss";
import LeftChevron from "../../public/images/left-chevron.svg";
//import Horizontalline from "../../../src/srcAssets/images/horiline.svg";
import SelectCountry from "../../components/Modal/CountryModal/SelectCountry";
import SelectCountryCode from "../../components/Modal/SelectCountryCode/selectCode";
import { useRouter } from "next/router";
import Image from "next/image";
import EmailAndSocialPopup from "../../components/Modal/SignInEmailSocialPopup/EmailAndSocialPopup";
import LinkYourMobilePopup from "../../components/Modal/LinkYourMobile/LinkYourMobilePopup";
import ArrowLeft from "../../public/images/arrowLeft.svg";
import {
  isMobile,
  isTablet,
  isMobileOnly,
  isDesktop,
} from "react-device-detect";


const SignIn=({handleBack,handlePageChange,closeSignIn}) =>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLinkModal, setIsLinkModal] = useState(false);
  const [socialLoginModal, setSocialLoginModal] = useState(false);
  const [linkPage, setLinkPage] = useState(false);
  const [mobile, setmobile] = useState(false);
  const [active, setActive] = useState(false);
  const [code, setcode] = useState("+91");
  const [phonenumber, setphonenumber] = useState();
  const [email, setemail] = useState("");
  const [error, seterror] = useState();
  const [width, setWidth] = useState("");

  const router = useRouter();

  useEffect(() => {
    setWidth(window.innerWidth);
  });
  const handleModals = (modal) => {
    switch (modal) {
      case "country":
        return setIsModalOpen(!isModalOpen)
      case "socialLogin":
        return setSocialLoginModal(true)
      case "linkMobil":
        return setIsLinkModal(true)
      default:
        return null;
    }
  }

  const onDropDown=()=> {
    setIsModalOpen(!isModalOpen);
    console.log("isopen in drop sown", isModalOpen);
  }
  const  handleModal=()=> {
    setIsModalOpen(false);
  }
  const handleModalClose=()=> {
    setSocialLoginModal(false);
  }
  const handleSocialLoginModal=() =>{
    setSocialLoginModal(true);
  }
  const handleLinkModal=()=> {
    setIsLinkModal(false);
  }
  const handleClick=() =>{
    if (email) {
      setIsLinkModal(true);
    }
    const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (regex.test(phonenumber) === true) {
      seterror(false);
      setActive(true);
     // router.push("/confirmotp");
      handlePageChange("confirmotp");
    } else {
      seterror(true);
      setActive(false);
    }
  }
  const codehandler=(e)=> {
    setcode(e.target.value);
  }
  const onNumberChange=(e)=> {
    setphonenumber(e.target.value);
  }
  const phoneno=(e)=> {

  }

  const emailHandler=(e)=> {
    setemail(true);
    setSocialLoginModal(false);
  }
  const continueLinkEmail=()=> {
    setLinkPage(true);
    setemail(false);
    setIsLinkModal(false);
  }
  const handleBackClick = () => {
    if (email) {
      setemail("")
    } else if (linkPage) {
      setLinkPage("")
    }
    else{
      closeSignIn();    
    }
  }

  return (
    <div>
      <div className={style.mainheader}>
        {/* {
          isMobileOnly ? 
        <div className={style.header}>
          <div onClick={handleBackClick}>
          <Image
              src={ArrowLeft}
              alt="check_icon"
              className={style.arrow}
            />
          </div>
          {/* <div className={style.sign}>Sign in to watchs </div> */}
          {/* {linkPage ? (
            <>
              <div className={style.sign}>Link  Mobile no. with Email ID</div>
            </>
          ) : (
            <>
              <div className={style.sign}>Sign in to watch </div>
            </>
          )}
          <div className={style.skip}>Skip </div>
        //</div> :  */} 
        <div className={style.headerweb}>
        <div className={style.imgdiv} onClick={handleBackClick}>
        <Image
              src={ArrowLeft}
              // alt="check_icon"
              className={style.arrowLeft}
            />
          </div>
            {linkPage ? (
            <>
              <div className={style.signweb}>Link  Mobile no. with Email ID</div>
            </>
          ) : (
            <>
              <div className={style.signweb}>Sign in to watch </div>
            </>
          )}
        </div>
       {/* } */}
        <div className={style.new}>
          {email ? (
            <div className={style.containeremail}>
              {/* <div className={style.email}>Enter your Email ID</div> */}
              <input
                className={style.email}
                type="email"
                name="email"
                // value={email}
                // onChange={emailChangehandler}
                placeholder="Enter your email address"
              />
              <div className={style.note}>
                Note: OTP will be sent to your mobile number linked with this
                email id
              </div>
            </div>
          ) : (
            <>
              <div className={style.containerphone}>
                <span className={style.defaultcode}>{code}</span>
                <select
                  name="country"
                  id="radio"
                  className={style.country}
                  onClick={onDropDown}
                >
                  {" "}
                  {code}
                </select> 
                <input
                  className={style.number}
                  max="10"
                  value={phonenumber}
                  onChange={onNumberChange}
                  onkeypress={phoneno}
                  placeholder="Enter your phone number"
                />
              </div>
            </>
          )}
          {/* {error ? (
            <div className={style.invaliderror}>Invalid Number</div>
          ) : (
            ""
          )} */}
          {isMobileOnly ? (
            <div className={style.refcode}>
              Have a referral code ?{" "}
              <span className={style.apply}> Click to apply</span>
            </div>
          ) : (
            ""
          )}
          <div className={style.btndiv}>
            <button
              className={active ? style.active : style.nextbtn}
              onClick={handleClick}
            >
              Next
            </button>
          </div>
          <div className={style.proceed}>
            By proceeding you confirm that you are of 18 years or above and
            accept the <span className={style.tnc}> Terms of Use</span> &{" "}
            <span className={style.pp}>Privacy Policy</span>
          </div>
          {email || linkPage ? (
            ""
          ) : (
            <>
              <div className={style.alreadyaccount}>
                Already have an account?
              </div>
              <div
                className={style.viaemail}
                onClick={() => handleSocialLoginModal()}
              >
                Sign In via Email ID or Social Media
              </div>
            </>
          )}
        </div>
      </div>
      {width < 768 ? (
        <SelectCountry
          isOpen={isModalOpen}
          handleModal={handleModal}
          codehandler={codehandler}
          title="Select Country"
        />
      ) : (
        <SelectCountryCode
          isOpen={isModalOpen}
          handleModal={handleModal}
          codehandler={codehandler}
          title="Select Country"
        />
      )}
      <EmailAndSocialPopup
        isOpen={socialLoginModal}
        handleModal={handleModalClose}
        emailHandler={emailHandler}
      />
      <LinkYourMobilePopup
        isOpen={isLinkModal}
        handleModal={handleLinkModal}
        continueClick={continueLinkEmail}
      />
      {/* <LinkYourMobilePopup
        isOpen={socialLoginModal}
        handleModal={handleModalClose}
      /> */}
    </div>
  );
}

export default SignIn;
