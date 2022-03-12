import React, { useState, useRef, useContext, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import Card from '../components/Card';
import { UserContext } from '../App';
import { HRURL } from '../API/APIConstants';
import './scss/changepass.scss';
import handleAPIError from '../utils/APIErrorHandling';
import ErrorModal from '../components/ErrorModal';
import { Toast } from 'react-bootstrap';
import messaging from '../utils/firebase';
import {
  setFirebaseMessageListenerEvent,
  getFirebaseToken,
} from '../utils/firebaseUtils';

const ChangePassword = () => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });
  // useEffect(() => {
  //   setFirebaseMessageListenerEvent(messaging)
  //     .then((message) => {
  //       console.log(message);
  //       setNotification(message.notification);
  //       setShow(true);
  //     })
  //     .catch((err) => console.log(err));
  //   getFirebaseToken(messaging)
  //     .then((token) => console.log(token))
  //     .catch((err) => console.log(err));
  // }, []);
  const authUser = useContext(UserContext).authUser;
  const [oldPass, setOldPass] = useState();
  const [newPass, setNewPass] = useState();
  const [error, setError] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const sideMenu = useRef();
  const setAuthUser = useContext(UserContext).setAuthUser;
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');

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
        } else {
          handleAPIError(statusCode, data, setError, () => setAuthUser(null));
        }
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
