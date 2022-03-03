import React, { useState, useContext } from 'react';
import Card from './Card';
import ErrorModal from './ErrorModal';
import './scss/EmailVerification.scss';
import { userId } from './SignUpForm';
import { APIURL } from '../API/APIConstants';
import handleError from '../utils/errorHandling';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';
const EmailVerification = (props) => {
  const authUser = useContext(UserContext).authUser;
  const [message, setMessage] = useState('');
  const [verificationCode, setCode] = useState();
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
    console.log(verificationCode);
    console.log(userId);
    fetch(`${APIURL}/user/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: authUser.userId,
        verificationCode,
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
            value={verificationCode}
            required
          />
          <button
            className="ok"
            onClick={props.verificationHandler}
            type="submit"
            disabled={!authUser}
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
