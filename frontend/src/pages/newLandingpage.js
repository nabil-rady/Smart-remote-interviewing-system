import React, { useRef } from 'react';
import './scss/newLanding.scss';
import MainSection from '../LandingPagecomponents/MainSection';
import Footer from '../LandingPagecomponents/Sections/Footer';
import SectionOne from '../components/SectionOne';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';

function NewLanding() {
  const sideMenu = useRef();
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');

  return (
    <div className="app">
      <div className="blue-gradient">
        <NavBar
          handleToggleButtonClick={handleToggleButtonClick}
          burgerButton={true}
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
