import React from "react";
import Modal from "../CommonModal/Modal";
import style from "./LinkYourMobilePopup.module.scss";

/**
 * Component for Link mobile number popup
 * Creation Date : 14/02/2023
 */
const LinkYourMobilePopup = ({ isOpen, handleModal, continueClick }) => {
  return (
    <Modal isOpen={isOpen} handleModal={handleModal}>
      <div className={style.header_section}>
        <div className={style.title}>
          Link your mobile number to finish your account setup
        </div>
      </div>
      <div className={style.button_section}>
        <div className={style.button}>
          <button className={style.button1} onClick={() => continueClick()}>
            Continue
          </button>
        </div>
        <div className={style.button}>
          <button>Cancel account setup</button>
        </div>
      </div>
    </Modal>
  );
};

export default LinkYourMobilePopup;
