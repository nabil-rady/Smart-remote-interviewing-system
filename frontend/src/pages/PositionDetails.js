import React, { useEffect, useState, useRef } from 'react';
import Details from '../components/Details';
import SideMenu from '../components/SideMenu';
import EmailVerification from '../components/EmailVerification';
import NavBar from '../components/NavBar';
import { globalId } from '../components/positionCard';
import { APIURL } from '../API/APIConstants';
import { Button, Row, Col, Toast } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
const PositionDetails = () => {
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
  const sideMenu = useRef(null);
  const [position, setPosition] = useState();
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
  const [verificationCard, setVerificationCard] = useState(false);
  const [verified, setVerified] = useState(false);
  const navClickHandler = () => {
    setVerificationCard(true);
  };
  const cardClickHandler = () => {
    setVerified(true);
    setVerificationCard(false);
  };
  const fetchPost = () => {
    fetch(`${APIURL}/job-listing/${globalId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPosition(res);
      });
  };
  useEffect(() => {
    fetchPost();
  }, []);
  // let position = {
  //   positionName: 'Software',
  //   expiryDate: '2022-02-05T23:00:05.955Z',
  //   questions: [
  //     {
  //       statement:"How are you?",
  //       timeToThink: 5,
  //       timeToAnswer: 4,
  //       keywords: [
  //         'one',
  //         'two',
  //         'three',
  //         'four',
  //         'five'
  //       ],
  //     },
  //     {
  //       statement:"State your skills",

  //       timeToThink: 3,
  //       timeToAnswer: 2,
  //       keywords: [
  //         'one',
  //         'two',
  //         'three',
  //         'four',
  //         'five'
  //       ],
  //     },
  //     {
  //       statement:"What's your name?",
  //       timeToThink: 10,
  //       timeToAnswer: 7,
  //       keywords: [
  //         'one',
  //         'two',
  //         'three',
  //         'four',
  //         'five'
  //       ],
  //     },
  //   ],
  // };
  return (
    <>
      {verificationCard && (
        <EmailVerification verificationHandler={cardClickHandler} />
      )}
      <div className="blue-gradient">
        <NavBar
          handleToggleButtonClick={handleToggleButtonClick}
          burgerButton={true}
          clickHandler={navClickHandler}
          verified={verified}
        />
        <SideMenu ref={sideMenu} />
      </div>
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
      <Details position={position} />
    </>
  );
};
export default PositionDetails;
