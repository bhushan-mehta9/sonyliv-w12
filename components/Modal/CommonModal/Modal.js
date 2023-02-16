import React, { useState } from "react";
import style from "./Modal.module.scss";
import close from "../../../public/images/closeModal.svg";
import Image from "next/image";

/***
 * Component for common modal
 * Creation Date : 14/02/2023
 *
 */
const Modal = ({ isOpen, handleModal, children }) => {
  /**
   * Close the modal
   * Creation Date : 14/02/2023
   */
  const handleClose = () => {
    handleModal();
  };

  /**
   * Handle the Modal Close on overlay click
   * Creation Date : 14/02/2023
   */
  const handleOverLayClick = (event) => {
    if (event?.target?.classList[0]?.includes("myModal")) {
      handleModal();
    }
  };

  return (
    <div
      className={isOpen ? style.myModal : style.hideModal}
      onClick={(e) => handleOverLayClick(e)}
    >
      <div className={style.modal_content}>
        <div className={style.dash}></div>
        <Image
          src={close}
          className={style.close}
          onClick={handleClose}
          alt="close"
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
