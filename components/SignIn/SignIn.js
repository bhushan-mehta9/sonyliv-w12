import React, { useState, useEffect } from "react";
import style from "./SignIn.module.scss";
import LeftChevron from "../../../src/srcAssets/images/left-chevron.svg";
import Horizontalline from "../../../src/srcAssets/images/horiline.svg";
import SelectCountry from "../CountryModal/SelectCountry";
import SelectCountryCode from "../SelectCountryCode/selectCode";
import { useRouter } from "next/router";
import Image from "next/image";
import EmailAndSocialPopup from "../SignInEmailSocialPopup/EmailAndSocialPopup";
import LinkYourMobilePopup from "../LinkYourMobile/LinkYourMobilePopup";
import ArrowLeft from "../../../public/assets/arrow-left.svg";

function SignIn() {
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

  function onDropDown() {
    setIsModalOpen(!isModalOpen);
    console.log("isopen in drop sown", isModalOpen);
  }
  function handleModal() {
    setIsModalOpen(false);
  }
  function handleModalClose() {
    setSocialLoginModal(false);
  }
  function handleSocialLoginModal() {
    setSocialLoginModal(true);
  }
  function handleLinkModal() {
    setIsLinkModal(false);
  }
  function handleClick() {
    if (email) {
      setIsLinkModal(true);
    }
    const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (regex.test(phonenumber) === true) {
      seterror(false);
      setActive(true);
      router.push("/confirmotp");
      //pageHandler("confirmOtp");
      console.log("push");
    } else {
      seterror(true);
      setActive(false);
    }
  }
  function codehandler(e) {
    setcode(e.target.value);
  }
  function onNumberChange(e) {
    setphonenumber(e.target.value);
  }
  function emailHandler(e) {
    setemail(true);
    setSocialLoginModal(false);
  }
  function continueLinkEmail() {
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
  }

  return (
    <div className={style.main}>
      <div className={style.mainheader}>
        {
          mobile ? 
        <div className={style.header}>
          <div onClick={handleBackClick}>
            <Image src={LeftChevron} className={style.arrow} />
            <Image src={Horizontalline} className={style.dash} />
          </div>
          {/* <div className={style.sign}>Sign in to watch </div> */}
          {linkPage ? (
            <>
              <div className={style.sign}>Link  Mobile no. with Email ID</div>
            </>
          ) : (
            <>
              <div className={style.sign}>Sign in to watch </div>
            </>
          )}
          <div className={style.skip}>Skip </div>
        </div> : 
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
              <div className={style.signweb}>Link  Mobile no. with Email ID</div>
            </>
          ) : (
            <>
              <div className={style.signweb}>Sign in to watch </div>
            </>
          )}
        </div>
        }
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
              <div></div>
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
                  id="phone"
                  type="tel"
                  name="phone"
                  value={phonenumber}
                  onChange={onNumberChange}
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
          {mobile ? (
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
