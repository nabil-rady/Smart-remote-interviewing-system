import React, { useState } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
import './scss/newLanding.scss';
import Header from '../LandingPagecomponents/Sections/Header';
import MainSection from '../LandingPagecomponents/MainSection';
import Footer from '../LandingPagecomponents/Sections/Footer';
import { Loader } from 'react-loader-spinner';
import SectionOne from '../components/SectionOne';
function NewLanding() {
  const [state, setState] = useState(false);
  setTimeout(() => {
    setState(true);
  }, 4000);
  return (
    <div className="app">
      <SectionOne />
      <MainSection />
      <Footer />
    </div>
  );
}

export default NewLanding;
