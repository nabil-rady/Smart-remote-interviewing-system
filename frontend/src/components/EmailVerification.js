import React, { useState } from 'react';
import Card from './Card';
import ErrorModal from './ErrorModal';
import './scss/EmailVerification.scss';
import { userId } from './SignUpForm';
import { APIURL } from '../API/APIConstants';
import handleError from '../utils/errorHandling';
import { useHistory } from 'react-router-dom';
const EmailVerification = (props) => {
  const [message, setMessage] = useState('');
  const [code, setCode] = useState();
  const [error, setError] = useState();
  const history = useHistory();
  const redirect = () => {
    history.push(props.route);
  };
  const changeHandler = (e) => {
    setCode(e.target.value);
  };
  const errorHandler = () => {
    setError(null);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let statusCode;
    fetch(`${APIURL}/user/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        code,
      }),
    })
      .then((response) => {
        statusCode = response.status;
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (statusCode === 200) {
          setMessage(data.message);
          redirect();
        } else handleError(statusCode, data, setError);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
