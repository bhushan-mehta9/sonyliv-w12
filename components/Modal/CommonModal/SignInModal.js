// import SignIn from "@/components/SignIn/SignIn";
import React, { useState } from "react";
import style from "./SignInModal.module.scss";

import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
import SignIn from "@/components/SignIn/SignIn";
import ConfirmOtp from "@/components/ConfirmOtp/ConfirmOtp";
import LoginSuccess from "@/components/LoginSuccess/LoginSuccess";
import { isMobile } from "react-device-detect";
import Personalization from "@/components/Personalization/Personalization";
import SelectProfile from "@/components/SelectProfile/SelectProfile";

function Modal(props) {
  const [page, setPage] = useState("confirmotp");
  const [data, setData] = useState({});
  const [successScreenShown, setsuccessScreenShown] = useState(
    isMobile ? false : true
  );

  /**
   * Show the privious page to user
   * Creation Date : 09/02/2023
   */
  const handleBack = (value) => {
    setPage(value);
  };

  /**
   * Change page state to show proper page in signin full screen popup
   * Creation Date : 14/02/2023
   */
  const handlePageChange = (value, data) => {
    setPage(value);
    setData(data);
  };

  /**
   * Show Success screen modal in case of Mweb
   * Creation Date : 14/02/2023
   */
  const handlePageChangeForSucess = (value) => {
    if (isMobile) {
      setsuccessScreenShown(true);
    }
    setPage(value);
  };

  /**
   * Load the page components on click of back and next button
   * Creation Date : 09/02/2023
   */
  const closeSignIn = () => {
    props.handleSignInModal(false);
  };

  return (
    <div className={style.signInModal}>
      {(() => {
        switch (page) {
          case "signin":
            return (
              <SignIn
                handleBack={handleBack}
                handlePageChange={handlePageChange}
                closeSignIn={closeSignIn}
                dictionary={props.dictionary}
                featureConfig={props.featureConfig}
              />
            );
          case "confirmotp":
            return (
              <ConfirmOtp
                handleBack={handleBack}
                handlePageChange={handlePageChange}
                data={data}
                dictionary={props.dictionary}
                featureConfig={props.featureConfig}
              />
            );
          case "loginsuccess":
            return (
              <LoginSuccess
                handlePageChangeForSucess={handlePageChangeForSucess}
                data={data}
              />
            );
          case "profileinfo":
            return isMobile && !successScreenShown ? (
              <>
                <LoginSuccess
                  handlePageChangeForSucess={handlePageChangeForSucess}
                  data={data}
                />
                <ProfileInfo
                  dictionary={props.dictionary}
                  handleBack={handleBack}
                  data={data}
                />
              </>
            ) : (
              <ProfileInfo
                dictionary={props.dictionary}
                handleBack={handleBack}
                data={data}
              />
            );
          case "personalization":
            return (
              <Personalization
                dictionary={props.dictionary}
                handleBack={handleBack}
                closeSignIn={closeSignIn}
              />
            );
          case "selectprofile":
            return <SelectProfile handlePageChange={handlePageChange} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default Modal;
