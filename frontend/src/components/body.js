import React from 'react';
import './body.css';
import background from './undraw_Hiring_re_yk5n.svg';
function Body() {
  return (
    <div id="body1">
      <img src={background} id="background" alt="ques" />
      <div id="container">
        <h1 id="head">Hire Me</h1>
        <p>
          Start Bootstrap can help you build better websites using the Bootstrap
          framework! Just download a theme and start customizing, no strings
          attached!
        </p>
      </div>
    </div>
  );
}

export default Body;
