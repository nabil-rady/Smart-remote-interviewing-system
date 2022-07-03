import React, { useContext } from 'react';
import './scss/notifications.scss';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import NoNotification from './NoNotification';

const Notifications = React.forwardRef((props, notifications) => {
  return (
    <>
      <div className="notifications" ref={notifications}>
        {props.notifications ? (
          props.notifications.length > 0 ? (
            <ul className="notifications-list">
              {props.notifications.map((notification) => (
                <li className="notification">
                  <Link
                    to={`/applicant_details/${notification.interviewId}`}
                    className={`notification_nav_link ${
                      notification.read ? 'read' : ''
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
