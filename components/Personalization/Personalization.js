import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import styles from "./Personalization.module.scss";
import check from "@/public/images/Vector.png";
import checkMweb from "@/public/images/Vector_mble.png";
import checkIpad from "@/public/images/vector_ipad.png";
import ArrowLeft from "@/public/images/arrow-left.svg";
import pic1 from "@/public/personalization/image1.png";
import pic2 from "@/public/personalization/image2.png";
import pic3 from "@/public/personalization/image3.png";
import pic4 from "@/public/personalization/image4.png";
import pic5 from "@/public/personalization/image5.png";
import pic6 from "@/public/personalization/image6.png";
import pic7 from "@/public/personalization/image7.png";
import pic8 from "@/public/personalization/image8.png";
import pic9 from "@/public/personalization/image9.png";
import pic10 from "@/public/personalization/image10.png";
import pic11 from "@/public/personalization/image11.png";
import pic12 from "@/public/personalization/image12.png";
import pic13 from "@/public/personalization/image5.png";
import { isMobile,isMobileOnly, isTablet } from "react-device-detect";
function Personalization({handleBack,closeSignIn}) {
  /**
   * Array Manipulation for image rendering
   * Creation Date : 14/02/2023
   */
  const PicImgdata = [
    {
      path: pic1,
      altData: "Action",
    },
    {
      path: pic2,
      altData: "Comedy",
    },
    {
      path: pic3,
      altData: "Thriller",
    },
    {
      path: pic4,
      altData: "Drama",
    },
    {
      path: pic5,
      altData: "Fight",
    },
    {
      path: pic9,
      altData: "episode",
    },
    {
      path: pic7,
      altData: "Sport",
    },
    {
      path: pic6,
      altData: "Emotion",
    },
    {
      path: pic10,
      altData: "serials",
    },
    {
      path: pic11,
      altData: "tvshows",
    },
    {
      path: pic8,
      altData: "Shows",
    },
    {
      path: pic12,
      altData: "originals",
    },
    {
      path: pic12,
      altData: "premium",
    },
    {
      path: pic13,
      altData: "avtaar",
    },
  ];
  /**
   * Show the signin page to user
   * Creation Date : 14/02/2023
   */
  const handleSubmit = ()=> {
    closeSignIn();
  }
  const [personalisation, setPersonalisationData] = useState({
    PersonalizedData: [],
  });
   /**
   * Show the profile create page to user
   * Creation Date : 14/02/2023
   */
  const handleBackBtn = () => {
    handleBack("profileinfo")
  }
   /**
   * Handle Image check and uncheck event push
   * Creation Date : 14/02/2023
   */
  const handleClickChange = (data) => {
    if (personalisation.PersonalizedData.length > 0) {
      const personalisationdataNotExist = personalisation.PersonalizedData.filter((item) => {
        return item !== data;
      });
      const personalisationdataExist = personalisation.PersonalizedData.filter((item) => {
        return item == data;
      });
      if (personalisationdataNotExist.length > 0 && personalisationdataExist.length > 0) {
        setPersonalisationData((prevState) => ({
          ...prevState,
          PersonalizedData: [...personalisationdataNotExist],
        }));
      } else if (personalisationdataNotExist.length > 0 && personalisationdataExist.length == 0) {
        setPersonalisationData((prevState) => ({
          ...prevState,
          PersonalizedData: [...personalisationdataNotExist, data],
        }));
      } else if (personalisationdataNotExist.length == 0 && personalisationdataExist.length > 0) {
        setPersonalisationData((prevState) => ({
          PersonalizedData: [],
        }));
      }
    } else {
      setPersonalisationData(() => ({
        PersonalizedData: [data],
      }));
    }
  };
  return (
    <>
      <div className={styles.personalizedContainer}>
        <div className={styles.sectionOne}>
          <div className={styles.arrowLeftBlock}>
            <Image
              src={ArrowLeft}
              alt="back_icon"
              className={styles.arrowLeft}
              onClick={handleBackBtn}
            />
          </div>
          <span className={styles.page_title_mweb}>
              What type of content are you interested in?
            </span>
          <div className={styles.skipContainer}>
            <div className={styles.skipstyle}>Skip</div>
          </div>
        </div>
        
        <div className={styles.sectionTwo}>
          <div className={styles.page_header}>
            <h1 className={styles.page_title}>
               What type of content are you interested in?
            </h1>
            <div className={styles.avtaar_container} id="avtaar_container">
              <h3 className={styles.title}>
                 Help us Personalize experience with suggestion,curated collection and more
              </h3>
            </div>
          </div>
        </div>
        <div className={styles.sectionThree} id="boardslist">
          {PicImgdata.map((item, index) => {
            return (
              <div className={styles.row} key={index}>
                <div
                  className={`${
                    personalisation.PersonalizedData.indexOf(item.altData) !== -1
                      ? styles.active
                      : `${index}`
                  }`}
                >
                  <div className={styles.img_block}>
                    <Image
                      layout="responsive"
                      src={item.path}
                      alt={item.altData}
                      className={styles.avtaar_img}
                    />
                    <input
                      type="checkbox"
                      id="myCheckbox1"
                      onChange={() => handleClickChange(item.altData)}
                    />
                    <label for="myCheckbox1" className={styles.checkicon}>
                      <Image
                        src={isMobileOnly ? checkMweb : isTablet ? checkIpad : check}
                        alt="check_icon"
                      />
                    </label>
                  </div>
                  <div class={styles.Figure}>{item.altData}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={
            personalisation.PersonalizedData.length > 0
              ? styles.enable_next_btn
              : styles.next_btn
          }
        >
        <button onClick={handleSubmit}> I'm done</button>
        </div>
        <div className={styles.pagination}>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Personalization;
