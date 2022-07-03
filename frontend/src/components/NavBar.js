import React, { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import MobileBurgerButtons from './MobileBurgerButtons';
import NavBarSideMenu from './NavBarSideMenu';
import NavBarUserInfoMenu from './NavBarUserInfoMenu';
import './scss/utility.scss';
import './scss/navbar.scss';
import notificationImg from './SVGs/notification.png';
import Notifications from './Notifications';
import { HRURL } from '../API/APIConstants';
import handleAPIError from '../utils/APIErrorHandling';

const NavBar = (props) => {
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser; // Object or null
  const isLoggedIn = !!authUser;
  const [notifications, setNotifications] = useState();
  const notificationsRef = useRef();
  const clickNotificationHandler = (notification) => {
    let statusCode;
    console.log(notification);
    fetch(`${HRURL}/user/read-notification/${notification.notificationId}`, {
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
        if (statusCode === 200) {
          console.log(data);
        } else {
          handleAPIError(
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
  const handleClick = () => {
    const menu = document.querySelector('.navbar-sidemenu');
    const mobileBurgerButton = document.querySelector('.mobile-burger-button');
    menu.classList.toggle('clicked');
    mobileBurgerButton.classList.toggle('black');
  };

  const fetchNotifications = () => {
    return fetch(`${HRURL}/user/notifications`, {
      method: 'GET',
      headers: {
        Authorization: authUser.token,
      },
    });
  };
  const setFetchedAnswers = async () => {
    const response = await fetchNotifications();
    const data = await response.json();
    if (response.status === 200) {
      console.log(data);
      setNotifications(data.notifications);
    } else {
      handleAPIError(
        response.status,
        data,
        () => {},
        () => setAuthUser(null)
      );
    }
  };
  const handleToggleButtonClick = () => {
    notificationsRef.current.classList.toggle('d-block');
    if (notificationsRef.current.classList[1] === 'd-block') {
      setFetchedAnswers();
    }
  };

  return (
    <>
      <header className="Navheader">
        <MobileBurgerButtons handleClick={handleClick} />
        <NavBarSideMenu />
        <div className="header__logo">
          <Link
            to="/"
            className="Logo"
            style={{ fontFamily: 'Baskerville Old Face', fontSize: 'x-large' }}
          >
            Vividly
          </Link>
        </div>

        <nav className="header__navbar">
          {props.visible && (
            <div
              style={{
                position: 'relative',
                marginLeft: 'auto',
              }}
            >
              <img
                src={notificationImg}
                className={`notificationImg ${isLoggedIn ? '' : 'hidden'}`}
                onClick={handleToggleButtonClick}
              />
              <Notifications
                ref={notificationsRef}
                notifications={notifications}
                handleToggleButtonClick={handleToggleButtonClick}
                clickNotificationHandler={clickNotificationHandler}
              />
            </div>
          )}

          <ul
            tabIndex="-1"
            className={`header__navbar__ul user-info ${
              isLoggedIn ? '' : 'hidden'
            }`}
            style={{
              marginLeft: props.visible ? '' : 'auto',
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
            <li className="guest__ul__li__interview">
              <Link to="/interview">Take Interview</Link>
            </li>
            <li className="guest__ul__li__login">
              <Link to="/login">Login</Link>
            </li>
            <li className="guest__ul__li__signup">
              <Link to="/signup">SignUp</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
