import React, { useEffect, useState, useRef, useContext } from 'react';
import Details from '../components/Details';
import SideMenu from '../components/SideMenu';
import EmailVerification from '../components/EmailVerification';
import NavBar from '../components/NavBar';
import { HRURL } from '../API/APIConstants';
import { Button, Row, Col, Toast } from 'react-bootstrap';
import { UserContext } from '../App';
import { useParams } from 'react-router-dom';
import handleAPIError from '../utils/APIErrorHandling';
import ErrorModal from '../components/ErrorModal';
import messaging from '../utils/firebase';
import {
  setFirebaseMessageListenerEvent,
  getFirebaseToken,
} from '../utils/firebaseUtils';
const PositionDetails = () => {
  const params = useParams();
  const positionNameAndId = params.positionNameAndId;
  const [positionName, positionId] = positionNameAndId.split('$');
  const { authUser, setAuthUser } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });
  useEffect(async () => {
    setFirebaseMessageListenerEvent(messaging)
      .then((message) => {
        console.log(message);
        setNotification(message.notification);
        setShow(true);
      })
      .catch((err) => console.log(err));
    try {
      const token = await getFirebaseToken(messaging);
      console.log(token);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const sideMenu = useRef(null);
  const [position, setPosition] = useState();
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
  const [verificationCard, setVerificationCard] = useState(false);
  const [verified, setVerified] = useState(false);
  const navClickHandler = () => {
    setVerificationCard(true);
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
      setPosition(data);
    } else {
      handleAPIError(
        response.status,
        data,
        () => {},
        () => setAuthUser(null)
      );
    }
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
