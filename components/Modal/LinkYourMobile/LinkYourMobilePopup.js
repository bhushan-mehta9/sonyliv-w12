import React from "react";
import Modal from "../CommonModal/Modal";
import style from "./LinkYourMobilePopup.module.scss";

/**
 * Component for Link mobile number popup
 * Creation Date : 14/02/2023
 */
const LinkYourMobilePopup = ({
  isOpen,
  handleModal,
  continueClick,
  dictionary,
  featureConfig,
  cancelAccountSetup,
}) => {
  const cancelAccount = () => {
    cancelAccountSetup();
    handleModal();
  };
  return (
    <Modal isOpen={isOpen} handleModal={handleModal}>
      <div className={style.header_section}>
        <div className={style.title}>
          {dictionary.link_mobile_number_title}
        </div>
      </div>
      <div className={style.button_section}>
        <div className={style.button}>
          <button className={style.button1} onClick={() => continueClick()}>
            {dictionary.continue_cta}
          </button>
        </div>
        <div className={style.button}>
          <button>{dictionary.cancel_account_setup_cta}
            </button>
        </div>
      </div>
    </Modal>
  );
};

export default LinkYourMobilePopup;
