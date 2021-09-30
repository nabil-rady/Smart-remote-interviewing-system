import React, { useState } from 'react';
import './scss/employer.scss';
import Card from './Card';

const Employer = () => {
  const [visible, setvisible] = useState('block');
  const [Btntxt, setBtntxt] = useState('Sign Up');
  const clickHandler = () => {
    setvisible('none');
    setBtntxt('Log In');
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div id="employer">
      <Card className="cardemployer">
        <form onSubmit={submitHandler} id="employerform">
          <input
            className="inputs"
            type="text"
            placeholder="Your Name"
            required
            style={{ display: visible }}
          />
          <input
            className="inputs"
            type="text"
            placeholder="Company Name"
            required
            style={{ display: visible }}
          />
          <input
            className="inputs"
            type="email"
            placeholder="E-mail"
            required
          />
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
            style={{ display: visible }}
          />
          <button id="signup">{Btntxt}</button>
        </form>
        <div id="havingacc">
          <h2 id="acc" style={{ display: visible }}>
            Have An Account?
            <span id="login" onClick={clickHandler}>
              {' '}
              Login
            </span>
          </h2>
        </div>
      </Card>
    </div>
  );
};

export default Employer;
