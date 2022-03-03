import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import EmailVerification from '../components/EmailVerification';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import Card from '../components/Card';
import './scss/applicantDetails.scss';
import { Button, Row, Col, Toast } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
function ApplicantDetails() {
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
  let applicant = {
    name: 'Mohamed Moussa',
    positionName: 'Software',
    email: 'mm191018101@gmail.com',
    phone: '01125894119',
    interviewDate: '2/13/2022 1:50 pm',
  };
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
      <p className="evaluate_label">Applicant Details</p>
      <Card className="detailscard">
        <div className="dataContainer">
          <p htmlFor="name" className="detailsLabel">
            Name:
          </p>
          <p name="name" className="info">
            {applicant.name}
          </p>
        </div>
        <div className="dataContainer">
          <p htmlFor="pname" className="detailsLabel">
            Position name:
          </p>
          <p name="pname" className="info">
            {applicant.positionName}
          </p>
        </div>
        <div className="dataContainer">
          <p htmlFor="email" className="detailsLabel">
            Email:
          </p>
          <p name="email" className="info">
            {applicant.email}
          </p>
        </div>
        <div className="dataContainer">
          <p htmlFor="phone" className="detailsLabel">
            Phone number:
          </p>
          <p name="phone" className="info">
            {applicant.phone}
          </p>
        </div>
        <div className="dataContainer">
          <p htmlFor="interviewdate" className="detailsLabel">
            Interview Date:
          </p>
          <p name="interviewdate" className="info">
            {applicant.interviewDate}
          </p>
        </div>
      </Card>
      <button className="answers">
        {' '}
        <Link to="/evaluate">See Answers</Link>
      </button>
    </>
  );
}

export default ApplicantDetails;
