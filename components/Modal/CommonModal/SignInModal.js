// import SignIn from "@/components/SignIn/SignIn";
import React, { useState } from "react";
import style from "./SignInModal.module.scss";

import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
import SignIn from "@/components/SignIn/SignIn";
import ConfirmOtp from "@/components/ConfirmOtp/ConfirmOtp";

function Modal(props) {
  const [page, setPage] = useState("signin");

  /**
   * Show the prious page to user
   * Creation Date : 09/02/2023
   */
  const handleBack = () => {
    props.handleSignInModal(false);
  };

  /**
   * Load the page components on click of back and next button
   * Creation Date : 09/02/2023
   */
  const closeSignIn = (pageName) => {
    setPage(pageName);
  };

  return (
    <div className={style.signInModal}>
      {(() => {
        switch (page) {
          case "signin":
            return <SignIn/>;
          case "confirmotp":
            return null;
          case "profileinfo":
            return <ProfileInfo/>;
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default Modal;
