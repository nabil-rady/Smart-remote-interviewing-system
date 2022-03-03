import React, { useState, useRef, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import QuestionCard from '../components/QuestionCard';
import './scss/Add.scss';
import PositionForm from '../components/position';
import { HRURL } from '../API/APIConstants';
import ErrorModal from '../components/ErrorModal';
import handleError from '../utils/errorHandling';
import { Button, Row, Col, Toast } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
function AddQues() {
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
  const [error, setError] = useState();
  const [questions, setQuestions] = useState([
    {
      fullQuestion: '',
      timeToThink: '',
      timeToAnswer: '',
      keywords: [],
    },
  ]);

  const [positionName, setPositionName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [date, setDate] = useState('');
  let position;
  const expiryDateHandler = (e) => {
    setExpiryDate(e.target.value);
  };
  const positionNameHandler = (e) => {
    setPositionName(e.target.value);
  };
  const fullQuestionHandler = (e, id) => {
    setQuestions((oldQuestions) =>
      oldQuestions.map((oldQuestion, index) => {
        if (index + 1 !== id) return oldQuestion;
        return {
          ...oldQuestion,
          fullQuestion: e.target.value,
        };
      })
    );
  };
  const timeToThinkHandler = (e, id) => {
    setQuestions((oldQuestions) =>
      oldQuestions.map((oldQuestion, index) => {
        if (index + 1 !== id) return oldQuestion;
        return {
          ...oldQuestion,
          timeToThink: e.target.value,
        };
      })
    );
  };
  const timeToAnswerHandler = (e, id) => {
    setQuestions((oldQuestions) =>
      oldQuestions.map((oldQuestion, index) => {
        if (index + 1 !== id) return oldQuestion;
        return {
          ...oldQuestion,
          timeToAnswer: e.target.value,
        };
      })
    );
  };
  const keywordsHandler = (e, id) => {
    let kw = e.target.value.split(',');
    const keywords = [];
    for (let i = 0; i < kw.length; i++) {
      keywords.push(kw[i]);
    }
    setQuestions((oldQuestions) =>
      oldQuestions.map((oldQuestion, index) => {
        if (index + 1 !== id) return oldQuestion;
        return {
          ...oldQuestion,
          keywords: keywords,
        };
      })
    );
  };
  const sideMenu = useRef(null);
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');

  const addHandler = () => {
    setQuestions((oldQuestions) => [
      ...oldQuestions,
      {
        fullQuestion: '',
        timeToThink: '',
        timeToAnswer: '',
        keywords: [],
      },
    ]);

    console.log(questions);
  };

  const deleteHandler = (id) => {
    setQuestions((oldQuestions) =>
      oldQuestions.filter((question, index) => index + 1 !== id)
    );
  };

  const renderQuestions = () => {
    return questions.map((question, index) => (
      <QuestionCard
        deleteHandler={deleteHandler}
        fullQuestionHandler={fullQuestionHandler}
        timeToThinkHandler={timeToThinkHandler}
        timeToAnswerHandler={timeToAnswerHandler}
        keywordsHandler={keywordsHandler}
        key={index}
        number={index + 1}
        numberOfQuestions={questions.length}
        {...question}
      />
    ));
  };
  const saveHandler = () => {
    let statusCode;
    fetch(`${HRURL}/job-listing/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        positionName,
        expiryDate,
        questions,
      }),
    })
      .then((response) => {
        statusCode = response.status;
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (statusCode === 200) {
          console.log('successful');
        } else handleError(statusCode, data, setError);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
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
      <PositionForm
        positionName={positionName}
        expiryDate={expiryDate}
        positionNameHandler={positionNameHandler}
        expiryDateHandler={expiryDateHandler}
      />
      <div className="questions top-margin">{renderQuestions()}</div>
      <button className="add" onClick={addHandler}>
        Add Question
      </button>
      <button className="save-position" onClick={saveHandler}>
        Save
      </button>
    </>
  );
}

export default AddQues;
