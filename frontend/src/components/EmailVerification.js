import React, { useState } from 'react';
import Card from './Card';
import './scss/EmailVerification.scss';

const EmailVerification = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const [code, setCode] = useState();
  const changeHandler = (e) => {
    setCode(e.target.value);
  };
  return (
    <>
      <div className="backdrop" />
      <Card className="VerificationModal">
        <h2 className="verification-header">Virify Your Account</h2>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            required
            placeholder="Enter The Virification Key Here"
            className="key"
            minLength="8"
            maxLength="8"
            onChange={changeHandler}
            value={code}
            required
          />
          <button
            className="ok"
            onClick={props.verificationHandler}
            type="submit"
          >
            OK
          </button>
          <button className="resend">Resend</button>
        </form>
      </Card>
    </>
  );
};

export default EmailVerification;
