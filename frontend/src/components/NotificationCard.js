import React from 'react';
import './scss/NotificationCard.scss';
import { Toast } from 'react-bootstrap';

const NotificationCard = ({
  notification,
  removeNotification,
  showNotification,
}) => {
  if (!notification) return null;
  return (
    <Toast
      show={showNotification}
      onClose={removeNotification}
      delay={8000}
      autohide
      animation
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        minWidth: 200,
        zIndex: 1000,
      }}
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="mr-auto">{notification.title}</strong>
      </Toast.Header>
      <Toast.Body>{notification.body}</Toast.Body>
    </Toast>
  );
};

export default NotificationCard;
