import React, { useState, useRef, useContext, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import EmailVerification from '../components/EmailVerification';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import Card from '../components/Card';
import './scss/viewApplicants.scss';
import { Button, Row, Col, Toast } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import { useParams } from 'react-router-dom';
import handleError from '../utils/APIErrorHandling';
import { HRURL } from '../API/APIConstants';
function ViewApplicants() {
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser;
  const params = useParams();
  console.log(params);
  const positionNameAndId = params.positionNameAndId;
  const [positionName, positionId] = positionNameAndId.split('$');
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
  const [interviews, setInterviews] = useState([]);
  const navClickHandler = () => {
    setVerificationCard(true);
  };
  const cardClickHandler = () => {
    setVerified(true);
    setVerificationCard(false);
  };
  const fetchPost = () => {
    return fetch(`${HRURL}/job-listing/${positionId}`, {
      method: 'GET',
      headers: {
        Authorization: authUser.token,
      },
    });
  };

  useEffect(async () => {
    const response = await fetchPost();
    const data = await response.json();
    if (response.status === 200) {
      setInterviews(data.interviews);
    } else {
      handleAPIError(
        response.status,
        data,
        () => {},
        () => setAuthUser(null)
      );
    }
  }, []);
  // let applicants = [
  //   {
  //     name: 'Mohamed Moussa',
  //     interviewDate: '2/13/2022 1:50 pm',
  //   },
  //   {
  //     name: 'Mohamed Nabil',
  //     interviewDate: '2/13/2022 1:40 pm',
  //   },
  //   {
  //     name: 'Mohamed Medhat',
  //     interviewDate: '2/13/2022 1:30 pm',
  //   },
  // ];
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
      <p className="evaluate_label">Evaluate Applicants</p>
      <ul className="applicants_list">
        {interviews.map((applicant, index) => (
          <Card key={index} className="applicantcard">
            <Link
              to={`/applicant_details/${positionName}$${applicant.interviewId}`}
              className="app_name"
              title={applicant.name}
            >
              {applicant.name}
            </Link>
            <p htmlFor="interviewdate" className="labels">
              Interview Date:
            </p>
            <p name="interviewdate" className="app_interviewdate">
              {applicant.submitedAt}
            </p>
          </Card>
        ))}
      </ul>
    </>
  );
}

export default ViewApplicants;
