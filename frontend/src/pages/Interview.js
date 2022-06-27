import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
import WelcomePage from './WelcomePage';
import InterviewPage from './InterviewPage';
import { ApplicantURL } from '../API/APIConstants';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';
import handleAPIError from '../utils/APIErrorHandling';
import IntroPage from './IntroPage';
const Interview = () => {
  const [intro, setIntro] = useState(false);
  const [welcome, setWelcome] = useState(true);
  const [interview, setInterview] = useState(false);
  const [interviewResponse, setResponse] = useState();
  const setAuthUser = useContext(UserContext).setAuthUser;
  const authUser = useContext(UserContext).authUser;
  const params = useParams();
  const interviewId = params.interviewId;
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
    return fetch(`${ApplicantURL}/candidate/join/${interviewId}`);
  };

  useEffect(() => {
    const setFetchedQuestions = async () => {
      const response = await fetchInterviewResponse();
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        setResponse(data);
      } else {
        handleAPIError(response.status, data);
      }
    };
    setFetchedQuestions();
  }, []);
  return (
    <>
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
