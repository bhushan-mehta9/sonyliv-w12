import React, { useEffect, useState } from "react";
import styles from "./LoginSuccess.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import Shape from "@/public/loginsuccess/shape.png";
import Tick_round from "@/public/loginsuccess/tick_round.png";
import LoginSuccessModal from "./LoginSuccessModal";
import { isMobile, isTablet } from "react-device-detect";

function LoginSuccess({ handlePageChangeForSucess, data, dictionary }) {
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
  /**
   * creating variables for getprofile check
   * Creation Date : 21/02/2023
   */
  let MobileNumber =
    data?.userProfile?.resultObj?.contactMessage[0]?.mobileNumber;
  let isSubscriptionActive =
    data?.userProfile?.resultObj?.contactMessage[0]?.subscription
      ?.accountServiceMessage?.length > 0;
  /**
   * creating functions for subscribe and non subscribe check
   * Creation Date : 21/02/2023
   */
  const renderSubscriptionActive = () => {
    return (
      <>
        <Image
          src={Shape}
          className={styles.premium_icon_01}
          alt="premium icon"
        ></Image>
        <div className={styles.buttonText}>
          {dictionary?.subscription_active_cta}
        </div>
      </>
    );
  };
  const renderSubscriptionNotActive = () => {
    return (
      <div className={styles.inactivebuttonText}>
        {dictionary?.no_active_subscription_cta}
      </div>
    );
  };
  let accountSubscription =
    data?.userProfile?.resultObj?.contactMessage[0]?.subscription
      ?.accountServiceMessage;
  let subscriptionPack = [];
  accountSubscription &&
    accountSubscription.map((accountServiceDetail) => {
      let subscriptionValidity = accountServiceDetail.validityTill;
      let date = new Date(subscriptionValidity);
      var accountDetail = {
        serviceName: accountServiceDetail.serviceName || "",
        month: date.getMonth(),
        day: date.getDate(),
        year: date.getFullYear(),
      };
      subscriptionPack.push(accountDetail);
    });
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <>
      {!isMobile ? (
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
                {dictionary?.successfull_signin_message}
              </span>
            </div>
            <div className={styles.LoggedMobile}>
              <span className={styles.mobileNoText}>{MobileNumber}</span>
            </div>
            <div className={styles.button}>
              {isSubscriptionActive
                ? renderSubscriptionActive()
                : renderSubscriptionNotActive()}
            </div>
          </div>
          <div className={styles.sectionThree}>
            {isSubscriptionActive
              ? subscriptionPack &&
                subscriptionPack.map((subItem) => (
                  <div>
                    <span>
                      {subItem.serviceName} -
                      {dictionary?.valid_till.replace(
                        "$$",
                        `${subItem?.day} ${months[subItem?.month]}, ${
                          subItem?.year
                        }`
                      )}
                    </span>
                  </div>
                ))
              : ""}
          </div>
        </div>
      ) : (
        <LoginSuccessModal data={data} dictionary={dictionary} />
      )}
    </>
  );
}

export default LoginSuccess;
