import React, { useEffect, useState } from 'react';
import intro1 from './SVGs/1.png';
import intro2 from './SVGs/2.png';
import intro3 from './SVGs/3.png';
import './scss/intro.scss';
import { Link } from 'react-router-dom';
const Intro = () => {
  let introImages = [intro1, intro2, intro3];
  let introText = [
    "Welcome to Vividly, Let's start interview!",
    'We help people connenct with companies arrount the world.',
    'Questions will apear to you one by one. \n You have limited time to think about the question and then video recording will start.\n There is limited time to answer each question.',
  ];
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const startHandler = () => {
    setCount((count) => count + 1);
    console.log(count);
    if (count === 1) setStart(true);
  };
  return (
    <>
      <div>
        <p className="introText">{introText[count]}</p>
        <img src={introImages[count]} className="introImages" />
        <div className="dotsContainer">
          <span className={count === 0 ? 'active' : 'dot'}></span>
          <span className={count === 1 ? 'active' : 'dot'}></span>
          <span className={count === 2 ? 'active' : 'dot'}></span>
        </div>
        {!start && (
          <button className="continueButton" onClick={startHandler}>
            Continue
          </button>
        )}
        {start && (
          <button className="goButton">
            <Link to="/video">Go to Interview</Link>
          </button>
        )}
      </div>
    </>
  );
};
export default Intro;
