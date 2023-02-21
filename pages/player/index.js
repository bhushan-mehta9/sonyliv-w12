import SignInModal from "@/components/Modal/CommonModal/SignInModal";
import React, { useState } from "react";
import style from "./playerSignin.module.scss";
import close from "../../public/images/close.png";
import Image from "next/image";
import { getCommonData, generateToken } from "@/lib/app";
import Head from "next/head";

function Player(props) {
  console.log(">>>>>>>>>serverside data", props);
  const [showModal, setShowModal] = useState(false);

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("security_token")) {
      localStorage.setItem("security_token", props.security_token);
    }

    if (!localStorage.getItem("state_code")) {
      localStorage.setItem("state_code", props.uld.resultObj.state_code);
    }

    if (!localStorage.getItem("country_code")) {
      localStorage.setItem("country_code", props.uld.resultObj.country_code);
    }

    if (!localStorage.getItem("channelPartnerID")) {
      localStorage.setItem(
        "channelPartnerID",
        props.uld.resultObj.channelPartnerID
      );
    }
  }

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
        <meta name="description" content=" Player page" />
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
          featureConfig={props?.featureConfig?.resultObj?.config}
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
  const { security_token, uld, dictionary, initialConfig, featureConfig } =
    await getCommonData();

  return {
    props: {
      security_token: security_token,
      uld: uld,
      dictionary: dictionary,
      initialConfig: initialConfig,
      featureConfig: featureConfig,
    },
  };
}
