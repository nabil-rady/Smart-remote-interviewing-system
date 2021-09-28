import React from 'react';
import NavBar from '../components/NavBar';
import SectionOne from '../components/SectionOne';
import Employee from '../components/Employee';
import Employer from '../components/Employer';

function LandingPage() {
  return (
    <>
      <NavBar />
      <SectionOne />
      <Employee />
      <br />
      <Employer />
    </>
  );
}

export default LandingPage;
