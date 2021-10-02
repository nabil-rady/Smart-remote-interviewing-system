import React, { useState } from 'react';
import Nav from '../components/NavBar';
import image1 from './SVGs/undraw_My_answer_re_k4dv.svg';
import image2 from './SVGs/undraw_Questions_re_1fy7.svg';
import image3 from './SVGs/undraw_speed_test_wxl0.svg';
import './scss/image-slider.scss';

function Imageslider() {
  const images = [image1, image2, image3];
  const [count, setCount] = useState(0);
  const [btn, setBtn] = useState('Next');
  const clickHandler = () => {
    if (count < 2) {
      setCount(count + 1);
    }

    if (count === 1) {
      setBtn('Start Interview');
    }
  };
  return (
    <div>
      <Nav />
      <h1 className="title">Instructions</h1>
      <p className="txt">Instructions text</p>
      <img src={images[count]} className="slider" alt="backgrounds" />
      <button className="instructionsbtn" onClick={clickHandler}>
        {btn}
      </button>
    </div>
  );
}

export default Imageslider;
