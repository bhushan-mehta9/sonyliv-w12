import React from "react";
import style from "./ProfileInfo.module.scss";
import mypic from "../../public/images/Avatar.png";
import mypic1 from "../../public/images/Avatar_1.png";
import mypic2 from "../../public/images/Avatar_2.png";
import checkNew from "../../public/images/check_1.png";
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

function ProfileInfo(props) {
  const [exitModal, setExitModal] = useState(false);
  const [avtaar, setAvtaar] = useState();
  const [kiduser, setkiduser] = useState(true);
  const [state, setState] = React.useState({
    mobileWidth: false,
    submitBtn: false,
    fieldDataArray: [],
  });
  // const [langData, setlangData] = useState([]);
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

      setFormData((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue,
      }));
    } else {
      let fieldValue = e.target.value;
     
      setFormData((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue,
      }));
    }
  };

  const handleSubmit = () => {
    handleBack("personalization")
  };
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

  const genderInfo = [
    { item: "Male", name: "genderData" },
    { item: "Female", name: "genderData" },
    { item: "Prefer not to say", name: "genderData" },
  ];

  const langrInfo = [
    { item: "English", name: "langData" },
    { item: "Hindi", name: "langData" },
    { item: "Tamil", name: "langData" },
    { item: "Telegu", name: "langData" },
    { item: "Malayalam", name: "langData" },
    { item: "Kannada", name: "langData" },
  ];

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 1599,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1598,
        settings: {
          slidesToShow: 3.0,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          // initialSlide: 2
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 340,
        settings: {
          slidesToShow: 2.299,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 299,
        settings: {
          slidesToShow: 2.4,
          slidesToScroll: 1,
        },
      },
    ],
  };
const dictionary = props.dictionary;
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
        <h1 className={style.page_title}>{dictionary?.profile_setup_title ? dictionary.profile_setup_title : ''}</h1>
      </div>
      <div className={style.avtaar_container} id="avtaar_container">
        <h3 className={style.title}>{dictionary?.profile_setup_choose_avatar_title ? dictionary.profile_setup_choose_avatar_title :""}</h3>
        <div
          className={style.avtaarSlider_container}
          id="profileAvtaarCarousel"
        >
          <Slider {...settings}>
            {mypicData.map((item, index) => {
              return (
                <div className={style.image_block} key={index}>
                  <div
                    className={`${avtaar == index ? style.active : `${index}`}`}
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
                      className={style.avtaar_img}
                      id="avtaar_img"
                    />
                    <Image
                      src={check}
                      alt="check_icon"
                      className={style.checkicon}
                      id="checkIcon"
                    />
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
              {dictionary?.profile_setup_name_placeholder? dictionary.profile_setup_name_placeholder : ''}
            </label>
          </div>
          <div className={style.kidFlexBox}>
            <label className={style.label}>{dictionary?.profile_setup_kids_mode_title? dictionary.profile_setup_kids_mode_title : ''}</label>
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
              value={formData.ageField}
              onChange={handleInput}
              required
            />
            <label for="dateLabel" className={style.label}>
              {dictionary.profile_setup_dob_placeholder}
            </label>
          </div>
          </div>
          <div className={style.flex_cont}>
          <div className={style.identityFieldBox}>
            <h3 className={style.title}>{dictionary?.profile_setup_select_gender_title ? dictionary.profile_setup_select_gender_title : ''}</h3>
            <div className={style.genderBtn_Flexbox}>
              {genderInfo &&
                genderInfo.map((data, index) => {
                  return (
                    <button
                      className={`${style.genderBtn} ${
                        formData.genderData == data.item ? style.active : ""
                      }`}
                      key={index}
                    >
                      <input
                        type="radio"
                        value={data.item}
                        name={data.name}
                        onChange={handleInput}
                      />
                      <span>{data.item}</span>
                    </button>
                  );
                })}
            </div>
          </div>
          <div className={style.contentLangFieldBox}>
            <h3 className={style.title}>
              Choose you preferred content language
            </h3>
            <div className={style.contentLangFlexbox}>
              {langrInfo &&
                langrInfo.map((data, index) => {
                  return (
                    <button
                      className={`${style.langBtn} ${
                        formData.langData.indexOf(data.item) !== -1
                          ? style.active
                          : ""
                      }`}
                      key={index}
                    >
                      <input
                        type="checkbox"
                        name={data.name}
                        value={data.item}
                        onChange={handleInput}
                      />
                      <Image
                        src={checkNew}
                        alt="check_icon"
                        className={style.check_icon}
                      />
                      {data.item}
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
          formData.checkedKids &&
          formData.ageField &&
          formData.genderData &&
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
              : true
          }
        >
          {dictionary?.profile_setup_create_cta ? dictionary.profile_setup_create_cta : ''}
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
