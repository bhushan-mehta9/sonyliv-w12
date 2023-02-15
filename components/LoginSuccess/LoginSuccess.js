import React, { useEffect, useState } from "react";
import styles from "./LoginSuccess.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import Shape from "@/public/loginsuccess/shape.png";
import Tick_round from "@/public/loginsuccess/tick_round.png";
import LoginSuccessModal from "./LoginSuccessModal";
import { isMobile, isMobileOnly } from "react-device-detect";

function LoginSuccess({ handlePageChangeForSucess }) {
  useEffect(() => {
    /**
     * after 5 sec this component will hide automatically
     * Creation Date : 10/02/2023
     */
    setTimeout(() => {
      handlePageChangeForSucess("profileinfo");
    }, 3000);
  }, []);

  const router = useRouter();
  return (
    <>
      {!isMobileOnly  ? (
        <div className={styles.SuccessLoginContainer}>
          <div className={styles.sectionOne}>
            <div className={styles.textOne}></div>
          </div>
          <div className={styles.sectionTwo}>
            <Image
              src={Tick_round}
              className={styles.SuccessClick}
              alt="Success Image"
            ></Image>
            <div className={styles.displayFlex}>
              <span className={styles.mobileNo}>
                {" "}
                You have successfully signed in with
              </span>
            </div>
            <div className={styles.LoggedMobile}>
              <span className={styles.mobileNoText}>+91 12318481913</span>
            </div>
            <div className={styles.button}>
              <Image
                src={Shape}
                className={styles.premium_icon_01}
                alt="premium icon"
              ></Image>
              <div className={styles.buttonText}>subscription active</div>
            </div>
          </div>
          <div className={styles.sectionThree}>
            <div>
              <span>LIV Premium - valid till 2&nbsp;Sep,&nbsp;2022</span>
            </div>
          </div>
        </div>
      ) : (
        <LoginSuccessModal />
      )}
    </>
  );
}

export default LoginSuccess;
