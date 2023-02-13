import React from "react";
import Modal from "../Modal/CommonModal/Modal";
import style from "./LoginSuccessModal.module.scss";
import Image from "next/image";
import Shape  from "@/public/loginsuccess/shape.png";
import Tick_round from "@/public/loginsuccess/tick_round.png"

function LoginSuccessModal() {
  return (
    <Modal>
      <div className={style.header_section}>
        <div className={style.sectionTwo}>
        <Image src={Tick_round} className={style.SuccessClick}></Image>
        <div className={style.displayFlex}>
            <span className={style.mobileNo}> You have successfully signed in with</span>          
          </div>  
          <div className={style.LoggedMobile}>
            <span className={style.mobileNoText}>+91 12318481913</span>         
          </div>
           <div className={style.button}>
           <Image src={Shape} className={style.premium_icon_01}></Image>
          <div className={style.buttonText}>subscription active</div>
        </div>
        
        </div>
        <div className={style.sectionThree}>
        <div><span>LIV Premium - valid till  2&nbsp;Sep,&nbsp;2022</span></div>
        </div>
     
      </div>
    </Modal>
  );
}

export default LoginSuccessModal;
