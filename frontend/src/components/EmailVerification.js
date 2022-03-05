import React, { useState, useContext } from 'react';
import Card from './Card';
import ErrorModal from './ErrorModal';
import './scss/EmailVerification.scss';
import { userId } from './SignUpForm';
import { APIURL } from '../API/APIConstants';
import handleAPIError from '../utils/APIErrorHandling';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';
const EmailVerification = (props) => {
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser;
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
        Authorization: authUser.token,
      },
      body: JSON.stringify({
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
          console.log(message);
          setAuthUser((oldUser) => ({
            userId: oldUser.userId,
            firstName: oldUser.firstName,
            lastName: oldUser.lastName,
            companyName: oldUser.companyName,
            email: oldUser.email,
            password: oldUser.password,
            phoneCode: oldUser.phoneCode,
            phoneNumber: oldUser.phoneNumber,
            loggedIn: oldUser.loggedIn,
            emailConfirmed: true,
            token: oldUser.token,
          }));
          redirect();
        } else handleAPIError(statusCode, data, setError);
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
