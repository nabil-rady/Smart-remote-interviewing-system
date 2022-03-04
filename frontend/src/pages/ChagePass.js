import React, { useState, useRef, useContext } from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import Card from '../components/Card';
import { UserContext } from '../App';
import { HRURL } from '../API/APIConstants';
import './scss/changepass.scss';
import EmailVerification from '../components/EmailVerification';
import handleError from '../utils/errorHandling';
import ErrorModal from '../components/ErrorModal';
import { Button, Row, Col, Toast } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
const ChangePassword = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDuqj0k4SCgC-KQjHnZhV4dLxMDI8NaiS8',
    authDomain: 'vividly-notification.firebaseapp.com',
    projectId: 'vividly-notification',
    storageBucket: 'vividly-notification.appspot.com',
    messagingSenderId: '964487453958',
    appId: '1:964487453958:web:93e6d088edf1bb5fe4d287',
    measurementId: 'G-G29W0NWEVB',
  };

  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  const [show, setShow] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });
  // getToken(setTokenFound);
  const onMessageListener = () =>
    new Promise((resolve) => {
      messaging.onMessage((payload) => {
        resolve(payload);
      });
    });
  onMessageListener()
    .then((message) => {
      console.log(message);
      setNotification(message.notification);
      setShow(true);
    })
    .catch((err) => console.log('failed: ', err));
  messaging
    .getToken()
    .then((token) => {
      console.log(token);
    })
    .catch((err) => {
      console.log(err);
    });
  const authUser = useContext(UserContext).authUser;
  const [oldPass, setOldPass] = useState();
  const [newPass, setNewPass] = useState();
  const [error, setError] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const sideMenu = useRef(null);
  const setAuthUser = useContext(UserContext).setAuthUser;
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
  const [verificationCard, setVerificationCard] = useState(false);
  const [verified, setVerified] = useState(false);
  const navClickHandler = () => {
    setVerificationCard(true);
  };
  const cardClickHandler = () => {
    setVerified(true);
    setVerificationCard(false);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let statusCode;
    fetch(`${HRURL}/user/changepassword`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authUser.token,
      },
      body: JSON.stringify({
        oldPassword: oldPass,
        newPassword: newPass,
        newConfirmPassword: confirmPass,
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
          setAuthUser({
            userId: authUser.userId,
            firstName: authUser.firstName,
            lastName: authUser.lastName,
            companyName: authUser.companyName,
            email: authUser.email,
            password: newPass,
            phoneCode: authUser.phoneCode,
            phoneNumber: authUser.phoneNumber,
            loggedIn: authUser.loggedIn,
            emailConfirmed: authUser.emailConfirmed,
            token: authUser.token,
          });
        } else handleError(statusCode, data, setError);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const oldPassHandler = (e) => {
    setOldPass(e.target.value);
  };
  const newPassHandler = (e) => {
    setNewPass(e.target.value);
  };
  const confirmPassHandler = (e) => {
    setConfirmPass(e.target.value);
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
      <div className="blue-gradient">
        <NavBar
          handleToggleButtonClick={handleToggleButtonClick}
          burgerButton={true}
          clickHandler={navClickHandler}
          verified={verified}
        />
        <SideMenu ref={sideMenu} />
      </div>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={6000}
        autohide
        animation
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          minWidth: 200,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      <Card className="password-card top-margin">
        <h1 className="changepass-label"> Change Password </h1>
        <form onSubmit={submitHandler} className="password-form">
          <input
            className="password-inputs"
            type="password"
            placeholder="Enter Old Password"
            required
            onChange={oldPassHandler}
          />
          <input
            className="password-inputs"
            type="password"
            placeholder="Enter New Password"
            onChange={newPassHandler}
            required
          />
          <input
            className="password-inputs"
            type="password"
            placeholder="Confirm Password"
            required
            onChange={confirmPassHandler}
          />
          <button className="change-pass">Confirm</button>
        </form>
      </Card>
    </>
  );
};

export default ChangePassword;
