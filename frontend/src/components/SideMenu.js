import React, { useContext, useState, useEffect } from 'react';
import './scss/side-menu.scss';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import { HRURL } from '../API/APIConstants';
import { TailSpin } from 'react-loader-spinner';
import handleAPIError from '../utils/APIErrorHandling';
import NoNotification from './NoNotification';
import closeImg from './SVGs/close.png';
const BurgerMenu = React.forwardRef((props, sideMenu) => {
  const authUser = useContext(UserContext).authUser;
  const isLoggedIn = !!authUser;
  return (
    <div className="burger-wrapper">
      <div className="burger_container" ref={sideMenu}>
        <div className="navbar">
          <div className="nav_header">
            <img
              src={closeImg}
              className={`notificationImgSidemenu ${
                isLoggedIn ? '' : 'hidden'
              }`}
              onClick={props.handleToggleButtonClick}
            />
            <span className="notification_header">Notifications</span>
          </div>

          {props.notifications ? (
            props.notifications.length > 0 ? (
              <ul className="nav_list">
                {props.notifications.map((notification) => (
                  <li className="nav_item">
                    <Link
                      to={`/applicant_details/${notification.interviewId}`}
                      className="notification_nav_link"
                    >
                      {notification.body}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <NoNotification />
              </>
            )
          ) : (
            <ul className="nav_list">
              <div
                style={{
                  position: 'relative',
                  top: 11,
                  right: 5,
                  zIndex: 5,
                }}
              >
                <TailSpin
                  color="hsl(215deg, 79%, 42%)"
                  height={80}
                  width={80}
                />
              </div>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
});

export default BurgerMenu;
