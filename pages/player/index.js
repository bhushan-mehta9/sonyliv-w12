import SignInModal from "@/components/Modal/CommonModal/SignInModal";
import React, { useState } from "react";

function Player() {
  
  const [showModal, setShowModal] = useState(false);

  const handleSignInModal = (modalState) => {
    setShowModal(modalState);
  }

  return(
    <>
    {
      showModal ? "" : 
        <span onClick={() => {handleSignInModal(true)}}>SignIn</span>
    }
        {showModal ? <SignInModal handleSignInModal={handleSignInModal} /> : ""}
    </>
  );
}

export default Player;
