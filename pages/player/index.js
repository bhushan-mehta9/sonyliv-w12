import SignInModal from "@/components/Modal/CommonModal/SignInModal";
import React, { useState } from "react";
import style from "./playerSignin.module.scss";
import close from "../../public/images/close.png";
import Image from "next/image";
import { getCommonData } from "@/lib/app";
import Head from "next/head";

function Player(props) {
  const [showModal, setShowModal] = useState(false);
  console.log(">>>>>> commonData", props);
  const handleSignInModal = (modalState) => {
    setShowModal(modalState);
  };

  return (
    <>
      <Head>
        <title>Player Page</title>
        <meta charset="UTF-8" />
        <meta name="keywords" content="titla, meta, nextjs" />
        <meta name="author" content="Syamlal CM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content=" Player page"
        />
      </Head>
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
      {showModal ? (
        <SignInModal
          handleSignInModal={handleSignInModal}
          dictionary={props?.dictionary?.resultObj?.dictionary}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Player;

/**
 * Function for Calling Server API call
 * Creation Date : 13/02/2023
 */
export async function getServerSideProps(context) {
  const { params, req, res } = context;
  const { uld, dictionary, initialConfig, featureConfig } =
    await getCommonData();

  return {
    props: {
      uld: uld,
      dictionary: dictionary,
      initialConfig: initialConfig,
      featureConfig: featureConfig,
    },
  };
}
