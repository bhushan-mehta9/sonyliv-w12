import React, { useState, useEffect } from "react";
import style from "./SelectCountry.module.scss";
import close from "../../../public/images/close.png";
import Image from "next/image";

/**
 * Component for selecting country code for mweb
 * Creation Date : 14/02/2023
 */
const SelectCountry = ({ isOpen, handleModal, codehandler }) => {
  const [isChecked, setIsChecked] = useState(false);

  /**
   * Handler for slecting the country code
   * Creation Date : 12/02/23
   */
  const handleCheckBox = (e) => {
    codehandler(e);
    setIsChecked(!isChecked);
    handleModal();
  };

  const arr = [
    { name: "India", code: "+91" },
    { name: "United States", code: "+1" },
    { name: "Australia", code: "+33" },
    { name: "France", code: "+44" },
    { name: "Italy", code: "+15" },
    { name: "Afganistan", code: "+21" },
    { name: "Albania", code: "+04" },
    { name: "Wakanda", code: "+0" },
  ];

  /***
   * Select Country Code Modal for Mweb
   * Closing Modal on Overlay click
   * Creation Date : 12/02/23
   */
  const handleOverLayClick = (event) => {
    if (event?.target?.classList[0]?.includes("myModal")) {
      handleModal();
    }
  };
  const handleClose = () => {
    handleModal();
  };

  return (
    <div
      className={isOpen ? style.myModal : style.hideModal}
      onClick={(e) => handleOverLayClick(e)}
    >
      <div className={style.modal_content}>
        <div className={style.dash}></div>
        <Image
          src={close}
          className={style.close}
          onClick={handleClose}
          alt="close"
        />
        <div className={style.title}>Select Country</div>
        <div className={style.containerr}>
          {arr.map(({ code, name, checked }) => (
            <div className={style.wrapperr} key={code}>
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
  );
};

export default SelectCountry;
