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
  const ratings = useRef([]);
  const clickHandler = () => {
    console.log(ratings.current);
  };

  const changeHandler = (index) => (e) => {
    ratings.current[index] = e.target.value;
  };

  return (
    <>
      <div className="blue-gradient">
        <NavBar visible={true} />
      </div>
      {answers?.length !== 0 ? (
        <>
          <EvaluationCard
            answers={answers}
            ref={ratings}
            clickHandler={clickHandler}
            changeHandler={changeHandler}
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
