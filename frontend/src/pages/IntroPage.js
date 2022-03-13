import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import Intro from '../components/Intro';
import EmailVerification from '../components/EmailVerification';
function IntroPage() {
  return (
    <>
      <div className="blue-gradient">
        <NavBar visible={false} />
      </div>
      <Intro />
    </>
  );
}

export default IntroPage;
