import React, { useState, useRef, useContext, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import EvaluationCard from '../components/EvaluationCard';
import './scss/evaluate.scss';
import { Button, Row, Col, Toast } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import { useParams } from 'react-router-dom';
import handleAPIError from '../utils/APIErrorHandling';
import { UserContext } from '../App';
import { HRURL } from '../API/APIConstants';
import { TailSpin } from 'react-loader-spinner';
import ErrorModal from '../components/ErrorModal';
import messaging from '../utils/firebase';
import {
  setFirebaseMessageListenerEvent,
  getFirebaseToken,
} from '../utils/firebaseUtils';
function EvaluationPage() {
  const authUser = useContext(UserContext).authUser;
  const [answers, setAnswers] = useState([]);
  const params = useParams();
  const applicantId = params.applicantId;
  const fetchPost = () => {
    return fetch(`${HRURL}/job-listing/answers/${applicantId}`, {
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
      console.log(data);
      setAnswers(data.questions);
    } else {
      handleAPIError(
        response.status,
        data,
        () => {},
        () => setAuthUser(null)
      );
    }
  }, []);
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
      {answers ? (
        <>
          <EvaluationCard answers={answers} ref={ratings} />
          <button onClick={clickHandler} className="save-rating">
            Save
          </button>
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            top: 'calc(50vh - 40px)',
            left: 'calc(50vw - 40px)',
          }}
        >
          <TailSpin color="hsl(215deg, 79%, 42%)" height={80} width={80} />
        </div>
      )}
    </>
  );
}

export default EvaluationPage;
