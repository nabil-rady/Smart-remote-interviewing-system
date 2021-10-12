import React, { useState } from 'react';
import './scss/signup.scss';
import Card from './Card';
import ErrorModal from './ErrorModal';
import { APIURL } from '../API/APIConstants';
import handleError from '../utils/errorHandling';

const SignUpForm = () => {
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [CompanyName, setCompanyName] = useState();
  const [Phone, setNum] = useState();
  const [firstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [ConfirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();
  const [ID, setID] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    // Send data to backend
    let statusCode;
    fetch(`${APIURL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: LastName,
        companyName: CompanyName,
        email: Email,
        password: Password,
        confirmPassword: ConfirmPassword,
      }),
    })
      .then((response) => {
        statusCode = response.status;
        return response.json();
      })
      .then((data) => {
        if (statusCode === 201) setID(data.userId);
        else handleError(statusCode, data, setError);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const EmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const PasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const ConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };
  const CompanyNameHandler = (e) => {
    setCompanyName(e.target.value);
  };
  const FirstNameHandler = (e) => {
    setFirstName(e.target.value);
  };
  const LastNameHandler = (e) => {
    setLastName(e.target.value);
  };
  const PhoneHandler = (e) => {
    setNum(e.target.value);
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className="cardsignup">
        <form onSubmit={submitHandler} id="employerform">
          <input
            className="inputs"
            type="text"
            placeholder="Your First Name"
            onChange={FirstNameHandler}
            required
          />
          <input
            className="inputs"
            type="text"
            placeholder="Your Last Name"
            onChange={LastNameHandler}
            required
          />
          <input
            className="inputs"
            type="text"
            placeholder="Company Name"
            onChange={CompanyNameHandler}
            required
          />
          <input
            className="inputs"
            type="email"
            placeholder="E-mail"
            onChange={EmailHandler}
            required
          />
          <input
            className="inputs"
            type="password"
            placeholder="Password"
            onChange={PasswordHandler}
            required
          />
          <input
            className="inputs"
            type="password"
            placeholder="Confirm Password"
            onChange={ConfirmPasswordHandler}
            required
          />
          <input
            className="inputs"
            type="text"
            placeholder="Phone No."
            onChange={PhoneHandler}
            required
          />
          <button className="signup">Sign Up</button>
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
    </>
  );
};

export default SignUpForm;
