import React, { useState, useContext } from 'react';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import { UserContext } from '../App';
import { HRURL } from '../API/APIConstants';
import './scss/changepass.scss';
import handleAPIError from '../utils/APIErrorHandling';
import ErrorModal from '../components/ErrorModal';

const ChangePassword = (props) => {
  const authUser = useContext(UserContext).authUser;
  const [oldPass, setOldPass] = useState();
  const [newPass, setNewPass] = useState();
  const [error, setError] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const setAuthUser = useContext(UserContext).setAuthUser;
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
        return response.json();
      })
      .then((data) => {
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
        <NavBar visible={true} />
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
