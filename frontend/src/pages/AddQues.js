import React, { useState, useRef, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import QuestionCard from '../components/QuestionCard';
import './scss/Add.scss';
import PositionForm from '../components/position';
import { APIURL } from '../API/APIConstants';
import ErrorModal from '../components/ErrorModal';
import handleError from '../utils/errorHandling';
function AddQues() {
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
    fetch(`${APIURL}/job-listing/create`, {
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
      <NavBar
        handleToggleButtonClick={handleToggleButtonClick}
        burgerButton={true}
      />
      <SideMenu ref={sideMenu} />
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
