import React, { useState, useRef, useContext } from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import Card from '../components/Card';
import { UserContext } from '../App';
import { APIURL } from '../API/APIConstants';
import './scss/changepass.scss';
import EmailVerification from '../components/EmailVerification';
import handleError from '../utils/errorHandling';
import ErrorModal from '../components/ErrorModal';
const ChangePassword = () => {
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
    fetch(`${APIURL}/user/changepassword`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authUser.token,
      },
      body: JSON.stringify({
        oldPass,
        newPass,
        confirmPass,
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
            ...data.user,
            password: newPass,
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
