import React, { useContext, useState, useEffect } from 'react';
import './scss/side-menu.scss';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import { HRURL } from '../API/APIConstants';
import { TailSpin } from 'react-loader-spinner';
import handleAPIError from '../utils/APIErrorHandling';
import NoNotification from './NoNotification';
const BurgerMenu = React.forwardRef((props, sideMenu) => {
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser;
  return (
    <div className="burger-wrapper">
      <div className="burger_container" ref={sideMenu}>
        <div className="navbar">
          <div className="nav_header">Notifications</div>

          {props.notifications ? (
            props.notifications.length > 0 ? (
              <ul className="nav_list">
                {props.notifications.map((notification) => (
                  <li className="nav_item">
                    <Link
                      to={`/applicant_details`}
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
          {/* {notifications ? (
            <ul className="nav_list">
              {notifications.map((notification) => {
                <li className="nav_item">
                  <a to="/" className="notification_nav_link">
                    {notifications[0].body}
                  </a>
                </li>;
              })}
            </ul>
          ) : (
            <div
              style={{
                position: 'relative',
                top: 'calc(30vh - 50px)',
                left: 'calc(70vw - 40px)',
              }}
            >
              <TailSpin color="hsl(215deg, 79%, 42%)" height={80} width={80} />
            </div>
          )} */}

          {/* {notifications.length !== 0 ? (
            <ul className="nav_list">
              {notifications.forEach((notification) => {
                <li className="nav_item">
                  <a to="/" className="nav_link">
                    {notification.body}
                  </a>
                </li>;
              })}
            </ul>
          ) : (
            <div
              style={{
                position: 'relative',
                top: 'calc(30vh - 50px)',
                left: 'calc(70vw - 40px)',
              }}
            >
              <TailSpin color="hsl(215deg, 79%, 42%)" height={80} width={80} />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
});

export default BurgerMenu;
