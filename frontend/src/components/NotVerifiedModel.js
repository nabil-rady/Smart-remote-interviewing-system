import React, { useState, useContext } from 'react';
import verifyImg from './SVGs/invitation.png';
import EmailVerification from './EmailVerification';
import './scss/NotVerified.scss';
import { UserContext } from '../App';
import { APIURL } from '../API/APIConstants';
import handleAPIError from '../utils/APIErrorHandling';
import ErrorModal from './ErrorModal';
const NotVerified = () => {
  const [show, setShow] = useState(false);
  const authUser = useContext(UserContext).authUser;
  const [error, setError] = useState();
  const errorHandler = () => {
    setError(null);
  };
  const clickHandler = () => {
    let statusCode;

    fetch(`${APIURL}/user/confirm-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authUser.token,
      },
    })
      .then((response) => {
        statusCode = response.status;
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (statusCode === 200) {
          console.log('successful');
          setShow(true);
        } else handleAPIError(statusCode, data, setError);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <>
      {show && <EmailVerification route={'/dashboard'} />}
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <img src={verifyImg} className="verifyImg" />
      <h1 className="verifyHeader"> Thanks for joinging Vividly! </h1>
      <p className="verifyTxtOne">Please confirm your email address</p>
      <p className="verifyTxtTwo">
        To finish signing up, Please confirm your email address. This ensures we
        have the right email in case we need to contact you
      </p>
      <button className="confirm_email" onClick={clickHandler}>
        Confirm email
      </button>
    </>
  );
};
export default NotVerified;
