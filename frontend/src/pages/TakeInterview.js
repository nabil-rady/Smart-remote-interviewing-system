import React from 'react';
import NavBar from '../components/NavBar';
import Interview from '../components/Interview';
import '../components/scss/utility.scss';
import './scss/Interview.scss';

function TakeInterviewPage() {
  return (
    <>
      <NavBar visible={false} />
      <Interview />
    </>
  );
}

export default TakeInterviewPage;
