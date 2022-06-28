import React, { useState, useRef, useContext, useEffect } from 'react';
import NavBar from '../components/NavBar';
import EvaluationCard from '../components/EvaluationCard';
import './scss/evaluate.scss';
import { Toast } from 'react-bootstrap';
import 'firebase/compat/messaging';
import { useParams } from 'react-router-dom';
import handleAPIError from '../utils/APIErrorHandling';
import { UserContext } from '../App';
import { HRURL } from '../API/APIConstants';
import { TailSpin } from 'react-loader-spinner';
import ErrorModal from '../components/ErrorModal';
import SuccessfullModal from '../components/SuccessfullModal';
function EvaluationPage() {
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser;
  const [answers, setAnswers] = useState([]);
  const params = useParams();
  const applicantId = params.applicantId;
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
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
  const ratings = useRef([]);
  const clickHandler = () => {
    let evaluation = [];
    let statusCode;
    setLoading(true);
    for (let i = 0; i < answers.length; i++) {
      evaluation.push({
        questionId: answers[i].questionId,
        evaluation: Number(ratings.current[i]),
      });
    }
    console.log(evaluation);
    fetch(`${HRURL}/job-listing/evaluate/${applicantId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authUser.token,
      },
      body: JSON.stringify({
        evaluations: evaluation,
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
          setLoading(false);
          setDone(true);
        } else {
          handleAPIError(statusCode, data, setError, () => setAuthUser(null));
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const changeHandler = (index) => (e) => {
    ratings.current[index] = e.target.value;
  };
  const errorHandler = () => {
    setError(null);
  };
  const closeWindow = () => {
    setDone(false);
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
          title="Manual Evaluation submitted successfully"
          closeWindow={closeWindow}
        />
      )}
      <div className="blue-gradient">
        <NavBar visible={true} />
      </div>
      {answers?.length !== 0 ? (
        <>
          <EvaluationCard
            answers={answers}
            ref={ratings}
            changeHandler={changeHandler}
            clickHandler={clickHandler}
            loading={loading}
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
