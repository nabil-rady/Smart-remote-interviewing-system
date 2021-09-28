import React from 'react';
import Nav from '../components/navBar';
import Body from '../components/body';
import Employee from '../components/Employee';
import Employer from '../components/Employer';

function Landingpage() {
  return (
    <div>
      <Nav />
      <Body />
      <Employee />
      <br />
      <Employer />
    </div>
  );
}

export default Landingpage;
