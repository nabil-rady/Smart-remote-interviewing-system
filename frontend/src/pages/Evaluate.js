import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import EvaluationCard from '../components/EvaluationCard';
import './scss/evaluate.scss';
import vid1 from './videos/30 seconds whatsapp status nature videos. (1).mp4';
import vid2 from './videos/30 seconds whatsapp status nature videos. (1).mp4';
import vid3 from './videos/30 seconds whatsapp status nature videos. (1).mp4';
import { Button, Row, Col, Toast } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
const answers = [
  {
    ques: 'How are U ?',
    ans: vid1,
  },
  {
    ques: "What's your name ?",
    ans: vid2,
  },
  {
    ques: 'What do you like ?',
    ans: vid3,
  },
];

function EvaluationPage() {
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

  const ratings = useRef(null);
  const sideMenu = useRef(null);
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
  // const [ratings, setRatings] = useState([]);
  //   const ratingHandler = (e) => {
  //     setRatings([...ratings, e.target.value]
  //     );
  // };
  const clickHandler = () => {
    const ratingsArray = [];
    for (const rating of ratings.current.children) {
      console.log(rating);
    }
  };
  return (
    <>
      <div className="blue-gradient">
        <NavBar
          handleToggleButtonClick={handleToggleButtonClick}
          burgerButton={true}
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
      <EvaluationCard answers={answers} ref={ratings} />
      <button onClick={clickHandler} className="save-rating">
        Save
      </button>
    </>
  );
}

export default EvaluationPage;
