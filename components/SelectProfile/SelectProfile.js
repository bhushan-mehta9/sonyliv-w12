import React from "react";
import styles from "./SelectProfile.module.scss";
import mypic from "../../public/images/Avatar.png";
import mypic1 from "../../public/images/Avatar_1.png";
import mypic2 from "../../public/images/Avatar_2.png";
import Image from "next/image";
import check from "../../public/images/check.png";
import { useState } from "react";
function SelectProfile() {
    const [avtaar, setAvtaar] = useState();
  const handleProfile = (data) => {
    setAvtaar(data);
  };
  const mypicData = [
    {
      path: mypic,
      altData: "avtaar",
    },
    {
      path: mypic1,
      altData: "avtaar1",
    },
    {
      path: mypic2,
      altData: "avtaar2",
    },
  ];
  return (
    <>
      <div className={styles.selectProfileContainer}>
        <div className={styles.page_title}>Select Profile</div>
        <div className={styles.avatar_container}>
          {mypicData.map((item, index) => {
            return (
              <div className={styles.image_block} key={index}>
                <div
                  className={`${avtaar == index ? styles.active : `${index}`}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleProfile(index);
                  }}
                >
                  <Image
                    width="350px"
                    height="300px"
                    layout="responsive"
                    src={item.path}
                    alt={item.altData}
                    className={styles.avtaar_img}
                    id="avtaar_img"
                  />
                  <Image
                    src={check}
                    alt="check_icon"
                    className={styles.checkicon}
                    id="checkIcon"
                  />
                  <div className={styles.imageText}>
                    Meera
                    </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.edit_Button}>
          <button>Edit Profile</button>
        </div>
      </div>
    </>
  );
}

export default SelectProfile;
