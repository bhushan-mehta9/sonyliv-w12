import React from "react";
import style from "./ProfileInfo.module.scss";
import mypic from "../../public/images/Avatar.png";
import mypic1 from "../../public/images/Avatar_1.png";
import mypic2 from "../../public/images/Avatar_2.png";
import checkNew from "../../public/images/check_1.png";
import Cross from "../../public/images/Cross.png";
import Slider from "react-slick";
import { useEffect } from "react";
import { useState } from "react";
import check from "../../public/images/check.png";
import Image from "next/image";
import {
  isMobile,
  isTablet,
  isMobileOnly,
  isDesktop,
} from "react-device-detect";
import dynamic from "next/dynamic";
import { useRef } from "react";
import * as constants from "@/constants/constant";

function ProfileInfo({ dictionary, handleBack, config }) {
  const [exitModal, setExitModal] = useState(false);
  const [avtaar, setAvtaar] = useState();
  const [kiduser, setkiduser] = useState(true);
  const [state, setState] = React.useState({
    mobileWidth: false,
    submitBtn: false,
    fieldDataArray: [],
    typeDate: [],
    typeMonth: [],
    typeYear: [],
    ageGroup: false,
  });

  const [formData, setFormData] = useState({
    nameField: "",
    ageField: "",
    genderData: false,
    checkedKids: false,
    langData: [],
  });
  const [deviceDetect, setDeviceDetect] = useState(false);
  useEffect(() => {
    if (isTablet == true) {
      setDeviceDetect(isTablet);
    }
    if (isMobileOnly == true) {
      setState({
        mobileWidth: true,
      });
    }
  }, []);
  const handleModal = () => {
    setExitModal(false);
  };

  const handleInput = (e) => {
    const fieldName = e.target.name;
    if (fieldName == "langData") {
      if (formData.langData.length > 0) {
        const langDataOld = formData.langData.filter((item) => {
          return item !== e.target.value;
        });
        const langDataExist = formData.langData.filter((item) => {
          return item == e.target.value;
        });

        if (langDataOld.length > 0 && langDataExist.length > 0) {
          setFormData((prevState) => ({
            ...prevState,
            [fieldName]: [...langDataOld],
          }));
        } else if (langDataOld.length > 0 && langDataOld.length == 0) {
          setFormData((prevState) => ({
            ...prevState,
            [fieldName]: [...langDataOld, e.target.value],
          }));
        } else if (langDataOld.length == 0 && langDataExist.length > 0) {
          setFormData((prevState) => ({
            ...prevState,
            [fieldName]: [],
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            [fieldName]: [...prevState.langData, e.target.value],
          }));
        }
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [fieldName]: [...prevState.langData, e.target.value],
        }));
      }
    } else if (fieldName == "checkedKids") {
      const fieldValue = !JSON.parse(e.target.value);
      if (formData.ageField !== "") {
        setFormData((prevState) => ({
          ...prevState,
          ageField: "",
          [fieldName]: fieldValue,
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [fieldName]: fieldValue,
        }));
      }
    } else {
      let fieldValue = e.target.value;

      setFormData((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue,
      }));
    }
  };

  const handleSubmit = () => {
    handleBack("personalization");
  };
  const handleProfile = (data) => {
    setAvtaar(data);
  };


  const handleageGroup = (e) => {
    setState({
      ageGroup: e.target.value,
    });
  };

  const handleCross = (e) => {
    if (e == "nameField") {
      setFormData((prevState) => ({
        ...prevState,
        nameField: "",
      }));
    } else if (e == "ageField") {
      setFormData((prevState) => ({
        ...prevState,
        ageField: "",
      }));
    }
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
  ];


  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 5,
    speed: 200,
    accessibility: true,
    easing: "linear",
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 4.0,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1599,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3.79,
          slidesToScroll: 1,
          
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3.79,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 499,
        settings: {
          slidesToShow: 3.8,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 438,
        settings: {
          slidesToShow: 3.1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 423,
        settings: {
          slidesToShow: 3.1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 399,
        settings: {
          slidesToShow: 3.1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 359,
        settings: {
          slidesToShow: 2.47,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const {profile_setup_feature} = config;
  const langText = profile_setup_feature && 
  profile_setup_feature.content_languages && 
  profile_setup_feature.content_languages.display_text &&
  profile_setup_feature.content_languages.display_text.split(',') ;
  const langCode = profile_setup_feature && 
  profile_setup_feature.content_languages && 
  profile_setup_feature.content_languages.code.length > 0 && 
  profile_setup_feature.content_languages.code;
  let contentLangData = [];

  if(langText.length > 0 && langCode.length > 0){
    langCode.map((item, index) => {
      contentLangData.push({ code :langCode[index],
        displayText : langText[index]});
    })
  }

  return (
    <div
      className={`${style.registration_container} ${
        deviceDetect
          ? `${style.tablet_container}`
          : state.mobileWidth
          ? style.mobile_container
          : ""
      }`}
    >
      <div className={style.page_header} id="page_header">
        <h1 className={style.page_title}>
          {dictionary?.profile_setup_title
            ? dictionary.profile_setup_title
            : constants.profile_setup_title}
        </h1>
      </div>
      <div className={style.avtaar_container} id="avtaar_container">
        <h3 className={style.title}>
          {dictionary?.profile_setup_choose_avatar_title
            ? dictionary.profile_setup_choose_avatar_title
            : constants.profile_setup_choose_avatar_title}
        </h3>
        <div
          className={style.avtaarSlider_container}
          id="profileAvtaarCarousel"
        >
          <Slider {...settings}>
            {mypicData.map((item, index) => {
              return (
                <div className={style.image_block} key={index} id="image_block">
                  <div
                    className={`${avtaar == index ? style.active : `${index}`}`}
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   handleProfile(index);
                    // }}
                  >
                    <Image
                      width="350px"
                      height="300px"
                      layout="responsive"
                      src={item.path}
                      alt={item.altData}
                      className={style.avtaar_img}
                      id="avtaar_img"
                    />
                    {/* <Image
                      src={check}
                      alt="check_icon"
                      className={style.checkicon}
                      id="checkIcon"
                    /> */}
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className={style.form_container}>
        <form method="post" action="submit">
          <div className={style.flex_cont}>
            <div
              className={`${style.nameFieldBox} ${
                formData.nameField ? style.activeField : ""
              }`}
            >
              <input
                type="text"
                className={style.nameField}
                id="nameLabel"
                name="nameField"
                value={formData.nameField}
                onChange={handleInput}
                required
              />
              <label for="nameLabel" className={style.label}>
                {dictionary?.profile_setup_name_placeholder
                  ? dictionary.profile_setup_name_placeholder
                  : constants.profile_setup_name_placeholder}
              </label>
              {formData.nameField ? (
                <span
                  className={style.cross_icon}
                  onClick={() => handleCross("nameField")}
                >
                  <Image src={Cross} width={16} height={16} alt="cross icon" />
                </span>
              ) : (
                ""
              )}
            </div>
            <div className={style.kidFlexBox}>
              <label className={style.label}>
                {dictionary?.profile_setup_kids_mode_title
                  ? dictionary.profile_setup_kids_mode_title
                  : constants.profile_setup_kids_mode_title}
              </label>
              <div
                className={`${style.switchBox} ${
                  formData.checkedKids ? style.active : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="checkedKids"
                  value={formData.checkedKids}
                  onChange={handleInput}
                />
              </div>
            </div>
            {formData.checkedKids ? (
              <div className={style.kidsAgeGroup}>
                <label className={style.label}>Age Group</label>
                <div className={style.ageGroup}>
                  {profile_setup_feature && profile_setup_feature.kids_age_group &&
                  profile_setup_feature.kids_age_group.length > 0 && 
                  profile_setup_feature.kids_age_group.map((item, index) => {
                      return (
                        <button
                          key={index}
                          className={
                            item.sub_type == state.ageGroup ? style.active : ""
                          }
                        >
                          {item.sub_type}
                          <input
                            type="radio"
                            name="age"
                            value={item.sub_type}
                            onChange={handleageGroup}
                          />
                        </button>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div
                className={`${style.ageFieldBox}  ${
                  formData.ageField ? style.activeField : ""
                }`}
              >
                <input
                  type="date"
                  className={style.ageField}
                  id="dateLabel"
                  name="ageField"
                  placeholder="DD/MM/YYYY"
                  data-date-format="DD/MM/YYYY"
                  value={formData.ageField}
                  onChange={handleInput}
                  required
                />
            

                <label for="dateLabel" className={style.label}>
                  {dictionary?.profile_setup_dob_placeholder
                    ? dictionary.profile_setup_dob_placeholder
                    : constants.profile_setup_dob_placeholder}
                </label>
                {formData.ageField ? (
                  <span
                    className={style.cross_icon}
                    onClick={() => handleCross("ageField")}
                  >
                    <Image
                      src={Cross}
                      width={16}
                      height={16}
                      alt="cross icon"
                    />
                  </span>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
          <div className={style.flex_cont}>
            <div className={style.identityFieldBox}>
              <h3 className={style.title}>
                {dictionary?.profile_setup_select_gender_title
                  ? dictionary.profile_setup_select_gender_title
                  : constants.profile_setup_select_gender_title}
              </h3>
              <div className={style.genderBtn_Flexbox}>
                {profile_setup_feature && profile_setup_feature.gender_options &&
                profile_setup_feature.gender_options.length > 0 && 
                  profile_setup_feature.gender_options.map((data, index) => {
                    return (
                      <button
                        className={`${style.genderBtn} ${
                          formData.genderData == data.option ? style.active : ""
                        }`}
                        key={index}
                      >
                        <input
                          type="radio"
                          value={data.option}
                          name="genderData"
                          onChange={handleInput}
                        />
                        <span>{data.option}</span>
                      </button>
                    );
                  })}
              </div>
            </div>
            <div className={style.contentLangFieldBox}>
              <h3 className={style.title}>
                {dictionary?.profile_setup_select_languages_title
                  ? dictionary.profile_setup_select_languages_title
                  : constants.profile_setup_select_languages_title}
              </h3>
              <div className={style.contentLangFlexbox}>
                {contentLangData &&
                contentLangData.length > 0 &&
                contentLangData.map((data, index) => {
                    return (
                      <button
                        className={`${style.langBtn} ${
                          formData.langData &&
                          formData.langData.indexOf(data.displayText) !== -1
                            ? style.active
                            : ""
                        }`}
                        key={index}
                      >
                        <input
                          type="checkbox"
                          name="langData"
                          value={data.displayText}
                          onChange={handleInput}
                        />
                        <Image
                          src={checkNew}
                          alt="check_icon"
                          className={style.check_icon}
                        />
                        {data.displayText}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div
        className={`${style.next_btn} ${
          formData.nameField &&
          formData.ageField &&
          formData.genderData &&
          formData.langData.length > 0
            ? style.activeBtn
            : formData.nameField &&
              formData.checkedKids &&
              formData.genderData &&
              state.ageGroup &&
              formData.langData.length > 0
            ? style.activeBtn
            : ""
        }`}
      >
        <button
          onClick={handleSubmit}
          disabled={
            formData.nameField &&
            formData.ageField &&
            formData.genderData &&
            formData.langData.length > 0
              ? false
              : formData.nameField &&
                formData.checkedKids &&
                formData.genderData &&
                state.ageGroup &&
                formData.langData.length
              ? false
              : true
          }
        >
          {dictionary?.profile_setup_create_cta
            ? dictionary.profile_setup_create_cta
            : constants.profile_setup_create_cta}
        </button>
      </div>
      {/* <button
        onClick={() => setExitModal(true)}
        style={{
          backgroundColor: "black",
          color: "white",
          cursor: "pointer",
          marginBottom: "10px",
          display: "inline-block",
        }}
      >
        Exit
      </button> */}
      <div className={style.pagination}>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      {/* <ExitConfirmPopup isOpen={exitModal} handleModal={handleModal} /> */}
    </div>
  );
}

export default ProfileInfo;
