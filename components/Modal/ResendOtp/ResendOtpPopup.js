import React from "react";
import Modal from "../CommonModal/Modal";
import style from "./ResendOtpPopup.module.scss";
import Apple from "../../../public/images/Apple.png";
import Whatsapp from "../../../public/images/whatsapp.png";
import Image from "next/image";

const ResendOtpPopup=({ isOpen, handleModal })=> {
  return (
    <Modal isOpen={isOpen} handleModal={handleModal}>
      <div className={style.header_section}>
        <div className={style.title}>Resend OTP</div>
        <div className={style.description}>
          How would you like to receive your one-time-password
        </div>
      </div>
      <div className={style.button_section}>
        <div className={style.button}>
          <button className={style.button1}>Send Sms</button>
        </div>
        <div className={style.button}>
          <button>
            <span>Call me</span>
          </button>
        </div>
        <div className={style.button}>
          <button>
            <Image
              src={Whatsapp}
              width={15.92}
              height={16}
              className={style.image}
            />
            <span>Send via Whatsapp</span>
          </button>
        </div>
        {/* <div className={style.button}>
          <button>
            <Image
              src={Apple}
              width={15.92}
              height={16}
              className={style.image}
            />
            <span>Continue with Apple</span>
          </button>
        </div> */}
      </div>
    </Modal>
  );
}

export default ResendOtpPopup;
