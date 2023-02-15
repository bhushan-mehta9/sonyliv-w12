import React, { useState } from "react";
import style from "./selectCode.module.scss";

const SelectCode=(props)=> {
    const {isOpen, handleModal,codehandler} = props;
    const [isChecked, setIsChecked] = useState(false);

     /**
   * Click to habdle country code selected for web
   * Creation Date : 07/02/2023
   */
    const handleCheckBox=(e)=> {
        codehandler(e);
        console.log("e.target.value", e.target.value);
        setIsChecked(!isChecked);
       
    }
  const arr = [
    { name: "India", code: "+91" },
    { name: "United States", code: "+1" },
    { name: "Australia", code: "+33" },
    { name: "France", code: "+44" },
    { name: "Italy", code: "+15" },
    { name: "Afganistan", code: "+21" },
    { name: "Albania", code: "+04" },
  ];
  

  return (

    <div className={ isOpen ? style.isOpen : style.isClose}>
       <div id="myModal" className={style.modal} onClick={handleModal}>
            <div className={style.modalcontent}>
                <div className={style.selecttext}>
                    Select Country
                </div>
                <div className={style.container}>
                            {arr.map(({ code, name, checked }) => (
                                <div className={style.wrapper} key={code}>
                                <div className={style.country_code_container}>
                                    <span className={style.country_name}>{name + " "}</span>
                                    <span className={style.country_code}>({code})</span>
                                </div>
                                <div className={style.check}>
                                    <label id={code}>
                                    <input
                                        type="radio"
                                        value={code}
                                        id={code}
                                        name="myGroup"
                                        checked={checked}
                                        onChange={(e) => handleCheckBox(e)}
                                    />
                                    <span className={style.circleshape}></span>
                                    </label>

                                    <div className={style.customCheck}></div>
                                </div>
                                </div>
                            ))}
             </div>
            </div>
        </div>
    </div>
  );
}

export default SelectCode;
