import React from 'react';
import './scss/newLanding.scss';
import MainSection from '../LandingPagecomponents/MainSection';
import Footer from '../LandingPagecomponents/Sections/Footer';
import SectionOne from '../components/SectionOne';
import NavBar from '../components/NavBar';

function NewLanding() {
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
