import React, { useEffect, useState } from "react";
import styles from "./LoginSuccess.module.scss";
import Image from 'next/image';
import { useRouter } from "next/router";
import Shape  from "@/public/loginsuccess/shape.png";
import Tick_round from "@/public/loginsuccess/tick_round.png"
import LoginSuccessModal from "./LoginSuccessModal";



function LoginSuccess({handlePageChange}) {
const [Mobile,IsMobile]=useState(false);
  useEffect(() => {
    if((window.innerWidth <= 767))
    {
      IsMobile(true);
    }

    /**
   * after the otp interval the text will change
   * Creation Date : 10/02/2023
   */
  setTimeout(() => {
    handlePageChange("profileinfo")
  }, 5000);
  
  },[])  

  const router = useRouter();
  console.log("mobile ----",Mobile )
  return (
    <>
    
      <div className={styles.SuccessLoginContainer}>
      <div className={styles.sectionOne}>
        <div className={styles.textOne}>
        </div>
      </div>
      <div className={styles.sectionTwo}>
      <Image src={Tick_round} className={styles.SuccessClick} alt="Success Image"></Image>
        <div className={styles.displayFlex}>
          <span className={styles.mobileNo}> You have successfully signed in with</span>          
        </div>
        <div className={styles.LoggedMobile}>
          <span className={styles.mobileNoText}>+91 12318481913</span>         
        </div>
         <div className={styles.button}>
         <Image src={Shape} className={styles.premium_icon_01}></Image>
        <div className={styles.buttonText}>subscription active</div>
      </div>
      </div>
      <div className={styles.sectionThree}>
      <div><span>LIV Premium - valid till  2&nbsp;Sep,&nbsp;2022</span></div>
      </div>
    </div>
    </>
  );
}

export default LoginSuccess;