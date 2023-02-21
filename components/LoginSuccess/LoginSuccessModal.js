import React, { useState } from "react";
import Modal from "../Modal/CommonModal/Modal";
import style from "./LoginSuccessModal.module.scss";
import Image from "next/image";
import Shape from "@/public/loginsuccess/shape.png";
import Tick_round from "@/public/loginsuccess/tick_round.png";

function LoginSuccessModal(data) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  /**
   * Hide success modal in case of Mweb
   * Creation Date : 14/02/2023
   */
  const handleModal = () => {
    setIsModalOpen(false);
  };
  /**
   * getprofile check condition variable added
   * Creation Date : 21/02/2023
   */
  let MobileNumber =
    data?.data?.userProfile?.resultObj?.contactMessage[0]?.mobileNumber;
  let isSubscriptionActive =
    data?.data?.userProfile?.resultObj?.contactMessage[0]?.subscription
      ?.accountServiceMessage?.length > 0;
      /**
   * function added for subscribe and non subscribe condition
   * Creation Date : 21/02/2023
   */
  const renderSubscriptionActive = () => {
    return (
      <>
        <Image
          src={Shape}
          className={style.premium_icon_01}
          alt="premium icon"
        ></Image>
        <div className={style.buttonText}>
          {data?.dictionary?.subscription_active_cta}
        </div>
      </>
    );
  };
  const renderSubscriptionNotActive = () => {
    return (
      <div className={style.inactivebuttonText}>
        {data?.dictionary?.no_active_subscription_cta}
      </div>
    );
  };
  let accountSubscription =
    data?.data?.userProfile?.resultObj?.contactMessage[0]?.subscription
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
      <Modal isOpen={isModalOpen} handleModal={handleModal}>
        <div className={style.header_section}>
          <div className={style.sectionTwo}>
            <Image
              src={Tick_round}
              className={style.SuccessClick}
              alt="Success Image"
            ></Image>
            <div className={style.displayFlex}>
              <span className={style.mobileNo}>
                {" "}
                {data?.dictionary?.successfull_signin_message}
              </span>
            </div>
            <div className={style.LoggedMobile}>
              <span className={style.mobileNoText}>{MobileNumber}</span>
            </div>
            <div className={style.button}>
              {isSubscriptionActive
                ? renderSubscriptionActive()
                : renderSubscriptionNotActive()}
            </div>
          </div>
          <div className={style.sectionThree}>
            {isSubscriptionActive
              ? subscriptionPack &&
                subscriptionPack.map((subItem) => (
                  <div>
                    <span>
                      {subItem.serviceName} -
                      {data?.dictionary?.valid_till.replace(
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
      </Modal>
    </>
  );
}

export default LoginSuccessModal;
