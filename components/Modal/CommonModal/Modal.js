import React, { useState } from "react";
import style from "./Modal.module.scss";

import close from "../../../public/images/closeModal.svg";

import Image from "next/image";

function Modal({ isOpen, handleModal, children }) {
  function handleClose() {
    handleModal();
  }
  function handleOverLayClick(event) {
    console.log("event", event);
    if (event?.target?.classList[0]?.includes("myModal")) {
      handleModal();
    }
  }

  return (
    <div
      className={isOpen ? style.myModal : style.hideModal}
      onClick={(e) => handleOverLayClick(e)}
    >
      <div className={style.modal_content}>
        <div className={style.dash}></div>

        <Image src={close} className={style.close} onClick={handleClose} />

        {children}
      </div>
    </div>
  );
}

export default Modal;
