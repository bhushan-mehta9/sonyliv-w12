import React from "react";
import styles from "./SelectProfile.module.scss";
import mypic from "../../public/ProfileSelection/Avatar.svg";
import mypic1 from "../../public/ProfileSelection/Avatar_1.svg";
import mypic2 from "../../public/ProfileSelection/Avatar_2.svg";
import Image from "next/image";
import check from "../../public/images/check.png";
import plusIcon from "../../public/images/plusIcon.svg";
import { useState } from "react";
function SelectProfile() {
  const [avtaar, setAvtaar] = useState();
  const handleProfile = (data) => {
    setAvtaar(data);
  };

 /**
   * for showing avtaar images
   * Creation Date : 16/02/2023
   */
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
    {
      path: mypic,
      altData: "avtaar",
    },
    {
      path: plusIcon,
      altData: "Add Profile",
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
                    { item.altData == 'Add Profile' ? <div  className={styles.addBlock}>
                    <Image
                    width="350px"
                    height="300px"
                    layout="responsive"
                    src={item.path}
                    alt={item.altData}
                    className={styles.plusIcon}
                    id="avtaar_img"
                  />
                 
                    </div> : <>
                    <Image
                    width="350px"
                    height="300px"
                    layout="responsive"
                    src={item.path}
                    alt={item.altData}
                    className={`${item.altData == 'Add Profile' ? styles.plusIcon : styles.avtaar_img}`}
                    id="avtaar_img"
                  />
                  <Image
                    src={check}
                    alt="check_icon"
                    className={styles.checkicon}
                    id="checkIcon"
                  /></>
                    }
                  
                  <div className={styles.imageText}>Meera</div>
                  <div className={styles.kidsUser}></div>
                </div>
              </div>
            );
          })}
        </div>
        <button className={styles.edit_Button}>
          <div>Edit Profile</div>
        </button>
      </div>
    </>
  );
}

export default SelectProfile;
