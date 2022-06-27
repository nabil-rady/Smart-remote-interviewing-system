import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import Intro from '../components/Intro';
import EmailVerification from '../components/EmailVerification';
function IntroPage(props) {
  return (
    <>
      <div className="blue-gradient">
        <NavBar visible={false} />
      </div>
      <Intro introHandler={props.introHandler} />
    </>
  );
}

export default IntroPage;
