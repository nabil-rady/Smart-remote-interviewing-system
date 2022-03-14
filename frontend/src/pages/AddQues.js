import React, { useState, useRef, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
import QuestionCard from '../components/QuestionCard';
import './scss/Add.scss';
import PositionForm from '../components/position';
import { HRURL } from '../API/APIConstants';
import ErrorModal from '../components/ErrorModal';
import handleAPIError from '../utils/APIErrorHandling';
import { Toast } from 'react-bootstrap';
import 'firebase/compat/messaging';
import { UserContext } from '../App';
import messaging from '../utils/firebase';
import {
  setFirebaseMessageListenerEvent,
  getFirebaseToken,
} from '../utils/firebaseUtils';

function AddQues() {
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser;
  const [error, setError] = useState();
  const [questions, setQuestions] = useState([
    {
      statement: '',
      timeToThink: '',
      timeToAnswer: '',
      keywords: [],
    },
  ]);

  const [positionName, setPositionName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
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
          statement: e.target.value,
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
  const addHandler = () => {
    setQuestions((oldQuestions) => [
      ...oldQuestions,
      {
        statement: '',
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
    console.log(positionName, expiryDate, questions);
    fetch(`${HRURL}/job-listing/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authUser.token,
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
        } else {
          handleAPIError(statusCode, data, setError, () => setAuthUser(null));
        }
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
        <NavBar visible={true} />
      </div>
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
