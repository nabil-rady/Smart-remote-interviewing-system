import React, { useState } from 'react';
import './scss/NotificationCard.scss';
import { Toast } from 'react-bootstrap';

const NotificationCard = ({ notification, removeNotification }) => {
  if (!notification) return null;
  const { title: notificationTitle, body: notificationBody } = notification;
  return (
    <Toast
      show={true}
      onClose={removeNotification}
      delay={8000}
      autohide
      animation
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        minWidth: 200,
      }}
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="mr-auto">{notificationTitle}</strong>
        {/* <small>just now</small> */}
      </Toast.Header>
      <Toast.Body>{notificationBody}</Toast.Body>
    </Toast>
  );
};

export default NotificationCard;
