import React, { useState, useEffect, useRef } from 'react';
//import Lottie from 'lottie-react-web';
import './scss/interview.scss';
import Card from './Card';

const Interview = () => {
  const [cursorStyle, setcursorStyle] = useState('auto');
  const [displayColor, setColor] = useState('rgb(162, 172, 182)');
  const changeHandler = (e) => {
    if (e.target.value) {
      setcursorStyle('pointer');
      setColor('white');
    } else {
      setcursorStyle('auto');
      setColor('rgb(162, 172, 182)');
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Card className="cardemployee">
      <form onSubmit={submitHandler} id="employeeform">
        <input
          type="text"
          placeholder="Interview link"
          onChange={changeHandler}
          id="link"
        />
        <br />
        <p id="text">
          Enter the interview link thet the company sent you or click the
          interview link to start
        </p>
        <br />
        <button id="go" style={{ cursor: cursorStyle, color: displayColor }}>
          Go to Interview
        </button>
      </form>
    </Card>
  );
};

export default Interview;
