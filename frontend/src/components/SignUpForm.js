import React, { useState } from 'react';
import './scss/employer.scss';
import Card from './Card';

const SignUpForm = () => {
  const submitHandler = (e) => e.preventDefault();
  return (
    <Card className="cardemployer">
      <form onSubmit={submitHandler} id="employerform">
        <input
          className="inputs"
          type="text"
          placeholder="Your Name"
          required
        />
        <input
          className="inputs"
          type="text"
          placeholder="Company Name"
          required
        />
        <input className="inputs" type="email" placeholder="E-mail" required />
        <input
          className="inputs"
          type="password"
          placeholder="Password"
          required
        />
        <input
          className="inputs"
          type="text"
          placeholder="Phone No."
          required
        />
        <button id="signup">Sign Up</button>
      </form>
      {/* <div id="havingacc">
            <h2 id="acc" style={{ display: visible }}>
            Have An Account?
            <span id="login">
                {' '}
                Login
            </span>
            </h2>
        </div> */}
    </Card>
  );
};

export default SignUpForm;
