import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import Intro from '../components/Intro';
import EmailVerification from '../components/EmailVerification';
function IntroPage() {
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
        <NavBar burgerButton={true} />
      </div>
      <Intro />
    </>
  );
}

export default IntroPage;
