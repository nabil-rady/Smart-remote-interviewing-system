import React from 'react';
import './scss/section-one.scss';
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
      {/* <img src={background} className="section-1__image" alt="ques" /> */}
      <div className="wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
    </div>
    </section>
  );
}

export default SectionOne;
