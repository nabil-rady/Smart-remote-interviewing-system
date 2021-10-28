import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import QuestionCard from '../components/QuestionCard';
import './scss/Add.scss';

function AddQues() {
  const [questions, setQuestions] = useState([
    {
      fullQuestion: '',
      timeToThink: '',
      timeToAnswer: '',
      keywords: '',
    },
  ]);
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
    setQuestions((oldQuestions) =>
      oldQuestions.map((oldQuestion, index) => {
        if (index + 1 !== id) return oldQuestion;
        return {
          ...oldQuestion,
          keywords: e.target.value,
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
        keywords: '',
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
  return (
    <>
      <NavBar
        handleToggleButtonClick={handleToggleButtonClick}
        burgerButton={true}
      />
      <SideMenu ref={sideMenu} />

      <div className="questions top-margin">{renderQuestions()}</div>
      <button className="add" onClick={addHandler}>
        Add Question
      </button>
    </>
  );
}

export default AddQues;
