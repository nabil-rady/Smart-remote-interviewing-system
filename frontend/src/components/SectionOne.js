import React from 'react';
import './css/section-one.css';
import background from './SVGs/undraw_Hiring_re_yk5n.svg';
function SectionOne() {
  return (
    <section className="section-1">
      <div className="section-1__content">
        <h1 className="section-1__content__title">Hire Me</h1>
        <p className="section-1__content__paragraph">
          Start Bootstrap can help you build better websites using the Bootstrap
          framework! Just download a theme and start customizing, no strings
          attached!
        </p>
      </div>
      <img src={background} className="section-1__image" alt="ques" />
    </section>
  );
}

export default SectionOne;
