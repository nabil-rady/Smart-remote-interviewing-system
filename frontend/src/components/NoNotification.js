import React from 'react';
import './scss/NoNotification.scss';
import Notificationimg from './SVGs/notification-bell.png';

const NoNotification = (props) => {
  return (
    <div className="noNotification">
      <img src={Notificationimg} alt="bell" className="bell" />
      <p className="notification-title">No notifications yet</p>
      <p className="notification-text">
        When you get notifications, they will show up here
      </p>
    </div>
  );
};

export default NoNotification;
