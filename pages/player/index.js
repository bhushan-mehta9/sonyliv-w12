import SignInModal from "@/components/Modal/CommonModal/SignInModal";
import React, { useState } from "react";
import style from "./playerSignin.module.scss";
import close from "../../public/images/close.png";
import Image from "next/image";

function Player() {
  const [showModal, setShowModal] = useState(false);

  const handleSignInModal = (modalState) => {
    setShowModal(modalState);
  };

  return (
    <>
      {showModal ? (
        ""
      ) : (
        <div className={style.signinmodal_container}>
          <div className={style.Signinmdal_box}>
            <div className={style.header}>
              <button className={style.closeBtn}>
                <Image src={close} width="12" height="12" alt="close_icon" />
              </button>
              <h1 className={style.title}>Sign in to watch</h1>
              <p className={style.info}>
                Register or sign in into your existing account to watch this
                video
              </p>
            </div>
            <div className={style.body}>
              <button
                className={style.signin_Btn}
                onClick={() => {
                  handleSignInModal(true);
                }}
              >
                Create Account or Sign In
              </button>
              <button className={style.keepbrowseBtn}>Keep Browsing</button>
            </div>
          </div>
        </div>
      )}
      {showModal ? <SignInModal handleSignInModal={handleSignInModal} /> : ""}
    </>
  );
}

export default Player;
