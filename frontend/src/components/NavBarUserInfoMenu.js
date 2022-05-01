import React, { useContext, useState } from 'react';
import './scss/navbar-user-info-menu.scss';
import { Link } from 'react-router-dom';
import { APIURL } from '../API/APIConstants';
import { UserContext } from '../App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import handleError from '../utils/APIErrorHandling';
import firebaseConfig from '../utils/firebaseConfig';
const NavBarUserInfoMenu = () => {
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser;
  const [registrationToken, setToken] = useState();
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
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
