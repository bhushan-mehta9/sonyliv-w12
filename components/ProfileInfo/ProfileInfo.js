import React from "react";
import style from "./ProfileInfo.module.scss";
import LeftChevron from "../../../src/srcAssets/images/left-chevron.svg";
import { InputGroup, Form } from "react-bootstrap";
import mypic from '../../../public/assets/images/Avatar.png';
import mypic1 from '../../../public/assets/images/Avatar_1.png'
import mypic2 from '../../../public/assets/images/Avatar_2.png';
import checkNew from '../../../public/assets/images/check_1.png';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { useEffect } from "react";
import ExitConfirmPopup from "../ExitConfirmPopup/ExitPopup";

// import { lazy } from 'react';
import { useState } from 'react';
import check from '../../../public/assets/images/check.png'
import Image from 'next/image';
import { isMobile, isTablet, isMobileOnly, isDesktop } from 'react-device-detect';
import dynamic from 'next/dynamic';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

var $ = require("jquery");
if (typeof window !== "undefined") {
   window.$ = window.jQuery = require("jquery");
}
const OwlCarousel = dynamic(() => import ('@ntegral/react-owl-carousel'), {
  ssr: false,
});

function ProfileInfo() {
    const [exitModal, setExitModal] = useState(false);
    const [avtaar, setAvtaar] = useState();
    const [kiduser, setkiduser] = useState(true);
    const [state, setState] = React.useState({
       mobileWidth: false,
       submitBtn : false,
       fieldDataArray : []
    });
    // const [langData, setlangData] = useState([]);
    const [formData, setFormData] = useState({
      nameField: '',
      ageField: '',
      genderData: false,
      checkedKids : false,
      langData:[],
      
    });
    const [deviceDetect, setDeviceDetect] = useState(false);
    useEffect(() => {
        if(isTablet == true){
          setDeviceDetect(isTablet)
        }
        if(isMobileOnly == true){
          setState({
            mobileWidth:true
          })
          
        }
    }, [])
  const handleModal = () => {
    setExitModal(false)
  }

    const handleInput = (e) => {
      const fieldName = e.target.name; 
      if(fieldName == 'langData'){
        console.log('before--', formData.langData.length, e.target.value)
       if(formData.langData.length > 0){
       const langDataOld = formData.langData.filter((item) => {
          return item !== e.target.value
        })
        const langDataExist = formData.langData.filter((item) => {
          return item == e.target.value
        })
        console.log('langDataOld--', langDataOld, langDataExist)
        if(langDataOld.length > 0 && langDataExist.length > 0){
          setFormData((prevState) => ({
            ...prevState,
            [fieldName]:  [ ...langDataOld]
          })); 
        
        }
        else if(langDataOld.length > 0 && langDataOld.length == 0){
          setFormData((prevState) => ({
            ...prevState,
            [fieldName]:  [ ...langDataOld, e.target.value]
          })); 
         
        }
        else if(langDataOld.length == 0 && langDataExist.length > 0){
          setFormData((prevState) => ({
            ...prevState,
            [fieldName]:  []
          }));
         
        }
        else{
          setFormData((prevState) => ({
            ...prevState,
            [fieldName]:  [...prevState.langData ,e.target.value]
          }));
        
        }
       }else{
        setFormData((prevState) => ({
          ...prevState,
          [fieldName]:  [...prevState.langData ,e.target.value]
        }));
       
       }
        
      }
      else if(fieldName == 'checkedKids'){
       
        const fieldValue = !JSON.parse(e.target.value);
       
        setFormData((prevState) => ({
          ...prevState,
          [fieldName]: fieldValue
        }));
      
      }
      else{
         let fieldValue = e.target.value;
        console.log('handleInput--', fieldName, fieldValue);
        setFormData((prevState) => ({
          ...prevState,
          [fieldName]: fieldValue
        }));
       
      }  
    } 
  
    const handleSubmit = () => {
     
    }
      const handleProfile = (data) => {
              setAvtaar(data)
          }
      
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 7,
          slidesToSlide: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6,
          slidesToSlide: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 4,
          slidesToSlide: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 4,
          slidesToSlide: 1
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

const genderInfo = [{ item :"Male", name:'genderData'},
{item : "Female", name:"genderData"}, 
{item:'Prefer not to say', name:"genderData"} 
]

const langrInfo = [{ item :"English", name:'langData'},
{item : "Hindi", name:"langData"}, 
{item:'Tamil', name:"langData"}, 
{item:'Telegu', name:"langData"},
{item:'Malayalam', name:"langData"},
{item:'Kannada', name:"langData"}

]
const Responsive = {
  1500:{
    items : 5
    },
    1024:{
      items: 5
      },
    768:{
        items: 5
      },
      0:{
      items: 1.5
      },

}
console.log('render', avtaar, deviceDetect, state.mobileWidth, formData.checkedKids, formData.langData)
  return (
    <div className={`${style.registration_container} ${deviceDetect ? `${style.tablet_container}` : state.mobileWidth ? style.mobile_container : ''}`}>
    <div className={style.page_header} id="page_header">
      <h1 className={style.page_title}>Tell us about yourself</h1>
    </div>
    <div className={style.avtaar_container} id="avtaar_container">
      <h3 className={style.title}>Choose avatar</h3>
      {/* <Carousel 
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={false}
        autoPlay={ false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass={style.carousel_container}
        removeArrowOnDeviceType={["tablet", "mobile",]}
        itemClass="carousel-item"
       centerMode={true}
       >
        {mypicData.map((item, index) => {
          return  <div className={style.image_block} key={index} >
            <div className={`${avtaar == index ? style.active: `${index}`}`} onClick={() => handleProfile(index)}>
              <Image width="350px" height="300px" layout="responsive" src={item.path} alt={item.altData} className={style.avtaar_img} />
              <Image src={check} alt='check_icon' className={style.checkicon} />
            </div>
        </div>
        })}
    
      </Carousel> */}
    <div className={style.avtaarSlider_container}>
      <OwlCarousel
    className={`owl-theme avtaarSlider`}
    loop={false}
    margin={10}
    nav={true}
    center={true} 
    responsive={Responsive}
    dots={false}
>
{mypicData.map((item, index) => {
          return  <div className={style.image_block} key={index} >
            <div className={`${avtaar == index ? style.active: `${index}`}`} onClick={(e) => {
              e.preventDefault()
              handleProfile(index)}}>
              <Image width="350px" height="300px" layout="responsive" src={item.path} alt={item.altData} className={style.avtaar_img} id="avtaar_img" />
              <Image src={check} alt='check_icon' className={style.checkicon} id="checkIcon" />
            </div>
        </div>
        })}
</OwlCarousel>
</div>
    </div>
    <div className={style.form_container}>
    <form method="post" action="submit">
      <div className={`${style.nameFieldBox} ${formData.nameField ? style.activeField : ''}`}>
      <input type="text" className={style.nameField} id="nameLabel" name='nameField' value={formData.nameField} onChange={handleInput} required/>
      <label for="nameLabel" className={style.label}>Name</label>
      </div>
      <div className={style.kidFlexBox}>
          <label className={style.label}>Kid’s mode</label> 
          <div className={`${style.switchBox} ${formData.checkedKids ? style.active : ''}`}>
       <input type='checkbox' name="checkedKids" value={formData.checkedKids} onChange={handleInput}/>
          </div>
        </div> 
      <div className={`${style.ageFieldBox}  ${formData.ageField ? style.activeField : ''}`}>
      <input type="date" className={style.ageField} id="dateLabel" name='ageField' value={formData.ageField} onChange={handleInput} required/>
      <label for="dateLabel" className={style.label}>Date of birth</label>
      </div>
      <div className={`${style.identityFieldBox} ${kiduser ? style.kidsprobox : ''}`}>
       <div className={style.kidFlexBox}>
          <label className={style.label}>Kid’s mode</label> 
          <div className={`${style.switchBox} ${formData.checkedKids ? style.active : ''}`}>
          <input type='checkbox' name="checkedKids" value={formData.checkedKids} onChange={handleInput}/>
          </div>
        </div>
        <h3 className={style.title}>What do you identify as?</h3>
        <div className={style.genderBtn_Flexbox}>
          {
            genderInfo && genderInfo.map((data, index) => {
              return <button className={`${style.genderBtn} ${formData.genderData == data.item ? style.active : ''}`} key={index} ><input type="radio"  value={data.item} name={data.name} onChange={handleInput}/><span>{data.item}</span></button>
            })
          }

        </div>
      </div>
      <div className={style.contentLangFieldBox}>
        <h3 className={style.title}>Choose you preferred content language</h3>
        <div className={style.contentLangFlexbox}>
          {
            langrInfo && langrInfo.map((data,index) => {
             return  <button className={`${style.langBtn} ${formData.langData.indexOf(data.item) !== -1 ? style.active :''}`} key={index}><input type="checkbox" name={data.name} value={data.item} onChange={handleInput}/><Image src={checkNew} alt='check_icon' className={style.check_icon} />{data.item}</button>
        
            })
          }
     
        </div>
      </div>
    </form> 

    </div>
    <div className={`${style.next_btn} ${formData.nameField && formData.checkedKids && formData.ageField && formData.genderData  && formData.langData.length > 0 ? style.activeBtn : ''}`}>
        <button onClick={handleSubmit} disabled={formData.nameField && formData.checkedKids && formData.ageField && formData.genderData && formData.langData.length > 0 ? false : true}>Next</button>
      </div>
      <button
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
      </button>
    <div className={style.pagination}>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <ExitConfirmPopup isOpen={exitModal} handleModal={handleModal} />
    </div>
  );
}

export default ProfileInfo;
