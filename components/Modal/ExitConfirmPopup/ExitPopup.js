import React from "react";
import Modal from "../CommonModal/Modal";
import style from "./ExitPopup.module.scss";

/**
 * Component for exit confirmation popup
 */
const ExitPopup=({ isOpen, handleModal })=> {
  return (
    <>
      <Modal isOpen={isOpen} handleModal={handleModal}>
        <div className={style.header_section}>
          <div className={style.title}>Are you sure you want to exit?</div>
         
        </div>
        <div className={style.button_section}>
          <div className={style.button}>
            <button className={style.button1}>Yes</button>
          </div>
          <div className={style.button}>
            <button>No</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ExitPopup;
