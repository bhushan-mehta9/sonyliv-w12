import SignInModal from "@/components/Modal/CommonModal/SignInModal";
import React, { useState } from "react";

function Player() {
  
  const [showModal, setShowModal] = useState(false);

  const handleSignInModal = (modalState) => {
    setShowModal(modalState);
  }

  return(
    <>
    <meta name="description" content="This is home page"></meta>
    <title>This is home page</title>
        <span onClick={() => {handleSignInModal(true)}}>SignIn</span>
        {showModal ? <SignInModal handleSignInModal={handleSignInModal} /> : ""}
    </>
  );
}

export default Player;
