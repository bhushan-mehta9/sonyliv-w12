import React from "react";
import Modal from "../CommonModal/Modal";
import style from "./ResendOtpPopup.module.scss";
import Whatsapp from "../../../public/images/whatsapp.png";
import Image from "next/image";
/**
 * Component for Resend otp popup
 * Creation Date : 14/02/2023
 */
const ResendOtpPopup = ({ isOpen, handleModal, dictionary, featureConfig }) => {
  console.log("featureConfig", featureConfig);
  return (
    <Modal isOpen={isOpen} handleModal={handleModal}>
      <div className={style.header_section}>
        <div className={style.title}>Resend OTP</div>
        <div className={style.description}>
          How would you like to receive your one-time-password
        </div>
      </div>
      <div className={style.button_section}>
        {featureConfig?.confirm_otp?.resend_otp_options?.map(
          (item , index) =>
            item.isEnable && (
              <div className={style.button} key={index}>
                <button className={style.button}>
                  <Image
                    src={Whatsapp}
                    width={15.92}
                    height={16}
                    className={style.image}
                    alt="Whatsapp Icon"
                  />
                  <span>{item.title}</span>
                </button>
              </div>
            )
        )}

        {/* <div className={style.button}>
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
              alt="Whatsapp Icon"
            />
            <span>Send via Whatsapp</span>
          </button>
        </div> */}
      </div>
    </Modal>
  );
};

export default ResendOtpPopup;
