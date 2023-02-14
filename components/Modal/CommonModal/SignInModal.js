// import SignIn from "@/components/SignIn/SignIn";
import React, { useState } from "react";
import style from "./SignInModal.module.scss";

import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
import SignIn from "@/components/SignIn/SignIn";
import ConfirmOtp from "@/components/ConfirmOtp/ConfirmOtp";
import LoginSuccess from "@/components/LoginSuccess/LoginSuccess";

function Modal(props) {
  const [page, setPage] = useState("signin");

  /**
   * Show the prious page to user
   * Creation Date : 09/02/2023
   */
  const handleBack = (value) => {
    setPage(value)
  };
  const handlePageChange = (value) => {
    setPage(value)
  }

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
            return <SignIn handleBack={handleBack} handlePageChange={handlePageChange}  closeSignIn={closeSignIn} />;
          case "confirmotp":
            return <ConfirmOtp handleBack={handleBack} handlePageChange={handlePageChange} />;
          case "loginsuccess":
            return <LoginSuccess handlePageChange={handlePageChange} />;
          case "profileinfo":
            return <ProfileInfo dictionary={props.dictionary} handleBack={handleBack} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default Modal;
