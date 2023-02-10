import React from "react";
import Modal from "../CommonModal/Modal";
import style from "./EmailAndSocialPopup.module.scss";
import Image from "next/image";
import Google from "../../../public/images/Google.png"
import Facebook from "../../../public/images/Facebook.png";
import Apple from "../../../public/images/Apple.png";

function EmailAndSocialPopup({ isOpen, handleModal, emailHandler }) {
  return (
    <Modal isOpen={isOpen} handleModal={handleModal}>
      <div className={style.header_section}>
        <div className={style.title}>Sign In via Email ID or Social Media </div>
        <div className={style.description}>How would you like to Sign In?</div>
      </div>
      <div className={style.button_section}>
        <div className={style.button}>
          <button className={style.button1} onClick={emailHandler}>
            Login with Email ID
          </button>
        </div>

        <div className={style.button}>
          <button>
            <Image
              src={Facebook}
              width={15.92}
              height={16}
              className={style.image}
            />
            <span>Continue with Facebook</span>
          </button>
        </div>
        <div className={style.button}>
          <button>
            <Image
              src={Google}
              width={15.92}
              height={16}
              className={style.image}
            />
            <span>Continue with Google</span>
          </button>
        </div>
        <div className={style.button}>
          <button>
            <Image
              src={Apple}
              width={15.92}
              height={16}
              className={style.image}
            />
            <span>Continue with Apple</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EmailAndSocialPopup;