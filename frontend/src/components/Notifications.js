import React, { useContext } from 'react';
import './scss/notifications.scss';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import NoNotification from './NoNotification';
import { HRURL } from '../API/APIConstants';
import handleAPIError from '../utils/APIErrorHandling';

const Notifications = React.forwardRef((props, notifications) => {
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser; // Object or null

  return (
    <>
      <div className="notifications" ref={notifications}>
        {props.notifications ? (
          props.notifications.length > 0 ? (
            <ul className="notifications-list">
              {props.notifications.map((notification, index) => (
                <li
                  className="notification"
                  key={index}
                  onClick={() => props.clickNotificationHandler(notification)}
                >
                  <Link
                    to={`/applicant_details/${notification.interviewId}`}
                    className={`notification_nav_link ${
                      notification.manualRead ? 'read' : ''
                    }`}
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
                display: 'flex',
                justifyContent: 'center',
                marginTop: '5%',
                alignItems: 'center',
              }}
            >
              <TailSpin color="hsl(215deg, 79%, 42%)" height={60} width={60} />
            </div>
          </ul>
        )}
      </div>
    </>
  );
});

export default Notifications;
