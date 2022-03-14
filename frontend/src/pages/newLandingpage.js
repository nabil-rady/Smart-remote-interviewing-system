import React, { useContext, useRef, useState } from 'react';
import './scss/newLanding.scss';
import MainSection from '../LandingPagecomponents/MainSection';
import Footer from '../LandingPagecomponents/Sections/Footer';
import SectionOne from '../components/SectionOne';
import NavBar from '../components/NavBar';
import { HRURL } from '../API/APIConstants';
import { UserContext } from '../App';
function NewLanding() {
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser;
  return (
    <div className="app">
      <div className="blue-gradient">
        <NavBar visible={false} />
      </div>
      <SectionOne />
      <MainSection />
      <Footer />
    </div>
  );
}

export default NewLanding;
