import React, { useState } from 'react';
import verifyImg from './SVGs/invitation.png';
import EmailVerification from './EmailVerification';
import './scss/NotVerified.scss';
import { UserContext } from '../App';
const NotVerified = () => {
  const [show, setShow] = useState(false);
  const clickHandler = () => setShow(true);
  return (
    <>
      {show && <EmailVerification route={'/dashboard'} />}
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
