import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Lottie from 'lottie-react-web';
import './scss/Interview.scss';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import './scss/Welcome.scss';
import { ApplicantURL } from '../API/APIConstants';
import handleAPIError from '../utils/APIErrorHandling';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import ErrorModal from '../components/ErrorModal';

function WelcomePage() {
  const params = useParams();
  console.log(params);
  const interviewId = params.interviewId;
  const [appInfo, setAppInfo] = useState();
  const [error, setError] = useState();

  const fetchAppInfo = () => {
    return fetch(`${ApplicantURL}/candidate/join/${interviewId}`, {
      method: 'GET',
    });
  };

  useEffect(() => {
    const setFethedAppInfo = async () => {
      const response = await fetchAppInfo();
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        setAppInfo(data);
      } else {
        handleAPIError(response.status, data, setError);
      }
    };
    setFethedAppInfo();
  }, []);
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
      <NavBar />
      {appInfo ? (
        <div className="welcome_container">
          <div className="welcome_animation">
            <Lottie
              options={{
                animationData: require('./SVGs/welcome.json'),
                renderer: 'svg',
                loop: true,
                autoplay: true,
              }}
            />
          </div>
          <Card className="info_container">
            <p className="welcome_appName">
              Welcome {appInfo.name} in{' '}
              <span className="welcome_logo">Vividly</span>
            </p>
            <p className="start_interview">Let's start the interview!</p>
            <button className="startInterview_btn">
              <Link to={`/intro/${interviewId}`} className="toIntro">
                Start Interview
              </Link>
            </button>
          </Card>
        </div>
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

export default WelcomePage;
