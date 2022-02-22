import React, { useState, useRef } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
import './scss/newLanding.scss';
import Header from '../LandingPagecomponents/Sections/Header';
import MainSection from '../LandingPagecomponents/MainSection';
import Footer from '../LandingPagecomponents/Sections/Footer';
import { Loader } from 'react-loader-spinner';
import SectionOne from '../components/SectionOne';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
function NewLanding() {
  const [state, setState] = useState(false);
  setTimeout(() => {
    setState(true);
  }, 4000);
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
    <div className="app">
      <div className="blue-gradient">
        <NavBar
          handleToggleButtonClick={handleToggleButtonClick}
          burgerButton={true}
          clickHandler={navClickHandler}
          verified={verified}
        />
        <SideMenu ref={sideMenu} />
      </div>
      <SectionOne />
      <MainSection />
      <Footer />
    </div>
  );
}

export default NewLanding;
