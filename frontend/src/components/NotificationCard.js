import React from 'react';
import './scss/NotificationCard.scss';
const NotificationCard = (props) => {
  return (
    <div className="notificationCard">
      <ul className="notifications-list">
        {props.notifications.map((notification, index) => (
          <li key={index} className="notfication-item">
            <p className="notificationBody">{notification}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default NotificationCard;
