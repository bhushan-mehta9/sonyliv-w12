import React from "react";
import Modal from "../CommonModal/Modal";
import style from "./EmailAndSocialPopup.module.scss";
import Image from "next/image";
import Google from "../../../public/images/Google.png";
import Facebook from "../../../public/images/Facebook.png";

/**
 * Component for Social logins Popup
 * Creation Date : 14/02/2023
 */
const EmailAndSocialPopup = ({ isOpen, handleModal, emailHandler }) => {
  return (
    <Modal isOpen={isOpen} handleModal={handleModal}>
      <div className={style.header_section}>
        <div className={style.title}>Sign In via Email ID or Social Media </div>
        <div className={style.description}>How would you like to Sign In?</div>
      </div>
      <div className={style.button_section}>
        <button className={style.button} onClick={emailHandler}>
          Login with Email ID
        </button>

        <button className={style.button}>
          <Image
            src={Facebook}
            width={15.92}
            height={16}
            className={style.image}
            alt="Facebook Icon"
          />
          <span>Continue with Facebook</span>
        </button>

        <button className={style.button}>
          <Image
            src={Google}
            width={15.92}
            height={16}
            className={style.image}
            alt="Google Icon"
          />
          <span>Continue with Google</span>
        </button>
      </div>
    </Modal>
  );
};

export default EmailAndSocialPopup;
