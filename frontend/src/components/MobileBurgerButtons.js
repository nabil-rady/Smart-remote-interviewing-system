import React from 'react';
import './scss/mobile-burger-buttons.scss';

const MobileBurgerButtons = (props) => {
  return (
    <div className="mobile-burger-buttons" onClick={props.handleClick}>
      <div className="mobile-burger-button"></div>
    </div>
  );
};

export default MobileBurgerButtons;
