import React from 'react';
import NavBar from '../components/NavBar';
import Intro from '../components/Intro';

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
