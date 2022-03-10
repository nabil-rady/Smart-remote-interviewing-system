import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import MobileBurgerButtons from './MobileBurgerButtons';
import NavBarSideMenu from './NavBarSideMenu';
import NavBarUserInfoMenu from './NavBarUserInfoMenu';
import './scss/dashboard-navbar.scss';
import { APIURL } from '../API/APIConstants';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import handleError from '../utils/APIErrorHandling';
const DashboardNavBar = (props) => {
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser; // Object or null
  const isLoggedIn = !!authUser;
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
      setToken(token);
    })
    .catch((err) => {
      console.log(err);
    });
  const handleClick = () => {
    const menu = document.querySelector('.navbar-sidemenu');
    const mobileBurgerButton = document.querySelector('.mobile-burger-button');
    menu.classList.toggle('clicked');
    mobileBurgerButton.classList.toggle('black');
  };

  return (
    <header className="Navheader">
      <MobileBurgerButtons handleClick={handleClick} />
      <NavBarSideMenu />
      <div className="header__logo">
        <Link to="/" className="header__logo">
          Vividly
        </Link>
      </div>
      <nav className="header__navbar">
        <ul className={`header__navbar__ul dashboard-menu`}>
          <li className={`dashboard-menu__li`} onClick={props.listingHandler}>
            Listings
          </li>

          <li
            className={`dashboard-menu__li`}
            onClick={props.notificationsHandler}
          >
            Notifications
          </li>
          <li className={`dashboard-menu__li`} onClick={props.profileHandler}>
            Edit Profile
          </li>
        </ul>
        <ul
          tabIndex="-1"
          className={`header__navbar__ul user-info ${
            isLoggedIn ? '' : 'hidden'
          }`}
          style={{
            position: 'relative',
            top: '2px',
          }}
        >
          <NavBarUserInfoMenu />
          <svg
            className="user-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M20.822 18.096c-3.439-.794-6.641-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.732-13.678-5.081 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-2.979.688-3.178 2.143-3.178 4.663l.005 1.241h10.483l.704-3h1.615l.704 3h10.483l.005-1.241c.001-2.52-.198-3.975-3.177-4.663zm-8.231 1.904h-1.164l-.91-2h2.994l-.92 2z" />
          </svg>
          <li className="header__navbar__ul__li username">
            {authUser?.firstName}
          </li>
          <svg
            className="arrow-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
          </svg>
        </ul>

        <ul className={`guest__ul ${!isLoggedIn ? '' : 'hidden'}`}>
          <li className="guest__ul__li__interview">Take Interview</li>
          <li className="guest__ul__li__login">Login</li>
          <li className="guest__ul__li__signup">Sign Up</li>
        </ul>
      </nav>
    </header>
  );
};

export default DashboardNavBar;
