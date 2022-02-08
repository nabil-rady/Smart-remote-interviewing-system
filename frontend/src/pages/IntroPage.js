import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import Intro from '../components/Intro';
import SideMenu from '../components/SideMenu';
import EmailVerification from '../components/EmailVerification';
function IntroPage() {
  const sideMenu = useRef(null);
  const [verificationCard, setVerificationCard] = useState(false);
  const [verified, setVerified] = useState(false);
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
  const navClickHandler = () => {
    setVerificationCard(true);
  };
  const cardClickHandler = () => {
    setVerified(true);
    setVerificationCard(false);
  };
  return (
    <>
      {verificationCard && (
        <EmailVerification verificationHandler={cardClickHandler} />
      )}
      <div className="blue-gradient">
        <NavBar
          handleToggleButtonClick={handleToggleButtonClick}
          burgerButton={true}
          clickHandler={navClickHandler}
          verified={verified}
        />
        <SideMenu ref={sideMenu} />
      </div>
      <Intro />
    </>
  );
}

export default IntroPage;
