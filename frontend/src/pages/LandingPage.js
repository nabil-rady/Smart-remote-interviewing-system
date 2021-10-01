import React from 'react';
import NavBar from '../components/NavBar';
import SectionOne from '../components/SectionOne';

import '../components/scss/utility.scss';

function LandingPage() {
  return (
    <>
      <div className="blue-gradient">
        <NavBar />
        <SectionOne />
      </div>
      {/* <Employee />
      <br />
      <Employer /> */}
    </>
  );
}

export default LandingPage;
