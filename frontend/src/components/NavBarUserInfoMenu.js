import React, { useContext, useState } from 'react';
import './scss/navbar-user-info-menu.scss';
import { Link } from 'react-router-dom';
import { APIURL } from '../API/APIConstants';
import { UserContext } from '../App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import handleError from '../utils/APIErrorHandling';

const NavBarUserInfoMenu = () => {
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser;
  const [registrationToken, setToken] = useState();
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
    })
    .catch((err) => console.log('failed: ', err));
  messaging
    .getToken()
    .then((token) => {
      setToken(token);
    })
    .catch((err) => {
      console.log(err);
    });
  const logoutHandler = () => {
    let statusCode;
    fetch(`${APIURL}/user/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authUser.token,
      },
      body: JSON.stringify({
        registrationToken,
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
          setAuthUser(null);
          localStorage.clear();
        } else {
          handleError(
            statusCode,
            data,
            () => {},
            () => setAuthUser(null)
          );
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <div className="user-info-menu">
      <nav className="user-info-menu__nav">
        <ul className="user-info-menu__nav__ul">
          <li className="user-info-menu__nav__ul__li">
            <Link to="/dashboard">Dashboard</Link>{' '}
          </li>
          <li className="user-info-menu__nav__ul__li">Edit Profile</li>
          <li className="user-info-menu__nav__ul__li" onClick={logoutHandler}>
            Logout
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBarUserInfoMenu;
