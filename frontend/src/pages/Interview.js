import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
import WelcomePage from './WelcomePage';
import InterviewPage from './InterviewPage';
import { ApplicantURL } from '../API/APIConstants';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';
import handleAPIError from '../utils/APIErrorHandling';
import IntroPage from './IntroPage';
import TakeInterviewPage from './TakeInterview';
import ErrorModal from '../components/ErrorModal';
const Interview = () => {
  const [intro, setIntro] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [interview, setInterview] = useState(false);
  const [join, setJoin] = useState(true);
  const [interviewResponse, setResponse] = useState();
  const setAuthUser = useContext(UserContext).setAuthUser;
  const authUser = useContext(UserContext).authUser;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const params = useParams();
  // const interviewId = params.interviewId;
  const [link, setLink] = useState('');
  const welcomeHandler = () => {
    setIntro(true);
    setWelcome(false);
    setInterview(false);
  };
  const introHandler = () => {
    setIntro(false);
    setWelcome(false);
    setInterview(true);
  };
  const fetchInterviewResponse = () => {
    return fetch(`${ApplicantURL}/candidate/join/${link}`);
  };
  const clickHandler = async () => {
    setLoading(true);
    const response = await fetchInterviewResponse();
    const data = await response.json();
    if (response.status === 200) {
      console.log(data);
      setWelcome(true);
      setJoin(false);
      setLoading(false);
      setResponse(data);
    } else {
      setLoading(false);
      setWelcome(false);
      setJoin(true);
      handleAPIError(response.status, data, setError);
    }
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
      {join && (
        <TakeInterviewPage
          setLink={setLink}
          link={link}
          clickHandler={clickHandler}
          loading={loading}
        />
      )}
      {welcome && (
        <WelcomePage
          welcomeHandler={welcomeHandler}
          response={interviewResponse}
        />
      )}
      {intro && <IntroPage introHandler={introHandler} />}
      {interview && <InterviewPage response={interviewResponse} />}
    </>
  );
};

export default Interview;
