import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./Personalization.module.scss";
import check from "@/public/images/Vector.png";
import checkMweb from "@/public/images/Vector_mble.png";
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
  const handleSubmit = ()=> {
    closeSignIn();
  }

  const [avtaar, setAvtaar] = useState();
  const [Mobile, IsMobile] = useState();
  const [formdata, setFormData] = useState({
    PersonalizedData: [],
  });
  useEffect(() => {
    if (window.innerWidth <= 767) {
      IsMobile(true);
    }
  }, []);
  const handleProfile = (data) => {
    setAvtaar(data);
  };

  const handleBackBtn = () => {
    handleBack("profileinfo")
  }
  const handleClickChange = (data) => {
    if (formdata.PersonalizedData.length > 0) {
      const formdataNotExist = formdata.PersonalizedData.filter((item) => {
        return item !== data;
      });
      const formdataExist = formdata.PersonalizedData.filter((item) => {
        return item == data;
      });
      if (formdataNotExist.length > 0 && formdataExist.length > 0) {
        setFormData((prevState) => ({
          ...prevState,
          PersonalizedData: [...formdataNotExist],
        }));
      } else if (formdataNotExist.length > 0 && formdataExist.length == 0) {
        setFormData((prevState) => ({
          ...prevState,
          PersonalizedData: [...formdataNotExist, data],
        }));
      } else if (formdataNotExist.length == 0 && formdataExist.length > 0) {
        setFormData((prevState) => ({
          PersonalizedData: [],
        }));
      }
    } else {
      setFormData(() => ({
        PersonalizedData: [data],
      }));
    }
  };
  const router = useRouter();

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
          {Mobile ? (
            <span className={styles.page_title}>
              What are you interested in ?
            </span>
          ) : (
            ""
          )}
          <div className={styles.sectionOne1}>
            <div className={styles.arrowLeftBlock1}>Skip</div>
          </div>
        </div>
        <div className={styles.sectionTwo}>
          <div className={styles.page_header}>
            <h1 className={styles.page_title}>
              {Mobile ? "" : "Personalize your experience"}
            </h1>
            <div className={styles.avtaar_container} id="avtaar_container">
              <h3 className={styles.title}>
                {Mobile
                  ? ""
                  : "Help us Personalize experience with suggestion,curated collection and more"}
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
                    formdata.PersonalizedData.indexOf(item.altData) !== -1
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
                        src={Mobile ? checkMweb : check}
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
            formdata.PersonalizedData.length > 0
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

      {/* <ExitPopup /> */}
    </>
  );
}

export default Personalization;
