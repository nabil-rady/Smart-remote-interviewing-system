import React, { useState } from 'react';
import DashboardNavBar from '../components/DashboardNavBar';
import ListingPage from './Listingpage';
import NotificationPage from './NotificationsPage';
import ProfilePage from './Profile';
import { Button, Row, Col, Toast } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
const Dashboard = () => {
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
      console.log(token);
    })
    .catch((err) => {
      console.log(err);
    });

  const [Listing, setListing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [profile, setProfile] = useState(false);
  const listingHandler = () => {
    setListing(true);
    setNotifications(false);
    setProfile(false);
  };
  const notificationsHandler = () => {
    setListing(false);
    setNotifications(true);
    setProfile(false);
  };
  const profileHandler = () => {
    setListing(false);
    setNotifications(false);
    setProfile(true);
  };
  return (
    <>
      <DashboardNavBar
        notificationsHandler={notificationsHandler}
        listingHandler={listingHandler}
        profileHandler={profileHandler}
      />
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={6000}
        autohide
        animation
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          minWidth: 200,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      {Listing && <ListingPage />}
      {notifications && <NotificationPage />}
      {profile && <ProfilePage />}
    </>
  );
};

export default Dashboard;
