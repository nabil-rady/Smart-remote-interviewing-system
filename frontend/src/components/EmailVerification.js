import React from 'react';
import Card from './Card';
import './scss/EmailVerification.scss';

const ErrorModal = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="backdrop" />
      <Card className="modal">
        <h2 className="verification-header">Virify Your Account</h2>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            required
            placeholder="Enter The Virification Key Here"
            className="key"
            minLength="8"
            maxLength="8"
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
    </div>
  );
};

export default ErrorModal;
