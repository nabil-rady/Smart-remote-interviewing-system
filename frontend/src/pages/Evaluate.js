import React, { useState, useRef, useContext, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import EvaluationCard from '../components/EvaluationCard';
import './scss/evaluate.scss';
import { Toast } from 'react-bootstrap';
import 'firebase/compat/messaging';
import { useParams } from 'react-router-dom';
import handleAPIError from '../utils/APIErrorHandling';
import { UserContext } from '../App';
import { HRURL } from '../API/APIConstants';
import { TailSpin } from 'react-loader-spinner';
import messaging from '../utils/firebase';
import {
  setFirebaseMessageListenerEvent,
  getFirebaseToken,
} from '../utils/firebaseUtils';

function EvaluationPage() {
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser;
  const [answers, setAnswers] = useState([]);
  const params = useParams();
  const applicantId = params.applicantId;

  const fetchAnswers = () => {
    return fetch(`${HRURL}/job-listing/answers/${applicantId}`, {
      method: 'GET',
      headers: {
        Authorization: authUser.token,
      },
    });
  };

  useEffect(() => {
    const setFetchedAnswers = async () => {
      const response = await fetchAnswers();
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
    };
    setFetchedAnswers();
  }, []);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });
  // useEffect(() => {
  //   setFirebaseMessageListenerEvent(messaging)
  //     .then((message) => {
  //       console.log(message);
  //       setNotification(message.notification);
  //       setShow(true);
  //     })
  //     .catch((err) => console.log(err));
  //   getFirebaseToken(messaging)
  //     .then((token) => console.log(token))
  //     .catch((err) => console.log(err));
  // }, []);

  const ratings = useRef(null);
  const sideMenu = useRef();
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
  // const [ratings, setRatings] = useState([]);
  //   const ratingHandler = (e) => {
  //     setRatings([...ratings, e.target.value]
  //     );
  // };
  const clickHandler = () => {
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
          <EvaluationCard
            answers={answers}
            ref={ratings}
            clickHandler={clickHandler}
          />
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
