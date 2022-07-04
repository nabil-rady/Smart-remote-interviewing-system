import React, { useState, useContext } from 'react';
import NavBar from '../components/NavBar';
import QuestionCard from '../components/QuestionCard';
import './scss/Add.scss';
import PositionForm from '../components/position';
import { HRURL } from '../API/APIConstants';
import ErrorModal from '../components/ErrorModal';
import handleAPIError from '../utils/APIErrorHandling';
import { UserContext } from '../App';
import SuccessfullModal from '../components/SuccessfullModal';
import { useHistory } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';

function AddQues() {
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser;
  const [error, setError] = useState();
  const [done, setDone] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
        return response.json();
      })
      .then((data) => {
        if (statusCode === 201) {
          setLoading(false);
          setDone(true);
        } else {
          setLoading(false);
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
  const closeWindow = () => {
    setDone(false);
    history.push('/dashboard');
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
      {done && (
        <SuccessfullModal
          title="Position Created Successfully"
          closeWindow={closeWindow}
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
      <div className="d-flex add-questions-button-container">
        <button className="add-question" onClick={addHandler}>
          Add Question
        </button>

        {!loading && (
          <button className="save-position" onClick={saveHandler}>
            Save
          </button>
        )}
        {loading && (
          <div
            style={{
              top: 'calc(40vh - 40px)',
              left: 'calc(10vw - 40px)',
              marginLeft: '20rem',
            }}
          >
            <TailSpin color="hsl(215deg, 79%, 42%)" height={60} width={60} />
          </div>
        )}
      </div>
    </>
  );
}

export default AddQues;
