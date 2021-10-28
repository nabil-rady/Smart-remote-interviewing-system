import React, { useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import SectionOne from '../components/SectionOne';
import SideMenu from '../components/SideMenu';
import '../components/scss/utility.scss';
import EmailVerification from '../components/EmailVerification';
function LandingPage() {
  const sideMenu = useRef(null);
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
  const [verificationCard, setVerificationCard] = useState(false);
  const [verified, setVerified] = useState(false);
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
        <SectionOne />
      </div>
      {/* <Employee />
      <br />
      <Employer /> */}
    </>
  );
}

export default LandingPage;
