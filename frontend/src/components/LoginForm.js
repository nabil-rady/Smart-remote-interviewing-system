import React, { useState } from 'react';
import './scss/employer.scss';
import Card from './Card';

const LoginForm = () => {
  const submitHandler = (e) => e.preventDefault();
  return (
    <Card className="cardemployer">
      <form onSubmit={submitHandler} id="employerform">
        <input className="inputs" type="email" placeholder="E-mail" required />
        <input
          className="inputs"
          type="password"
          placeholder="Password"
          required
        />
        <button id="signup">Login</button>
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

export default LoginForm;
