import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Lottie from 'lottie-react-web';
import './scss/Interview.scss';
import Card from '../components/Card';
import { interviewLink } from '../components/Interview';
import { Link } from 'react-router-dom';
import Circle from '../LandingPagecomponents/Circle';
import './scss/Welcome.scss';
import { ApplicantURL } from '../API/APIConstants';
import handleAPIError from '../utils/APIErrorHandling';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
function WelcomePage() {
  const params = useParams();
  console.log(params);
  const interviewId = params.interviewId;
  const [appInfo, setAppInfo] = useState();
  const fetchPost = () => {
    return fetch(`${ApplicantURL}/candidate/join/${interviewId}`, {
      method: 'GET',
    });
  };

  useEffect(async () => {
    const response = await fetchPost();
    const data = await response.json();
    if (response.status === 200) {
      console.log(data);
      setAppInfo(data);
    } else {
      handleAPIError(
        response.status,
        data,
        () => {},
        () => setAuthUser(null)
      );
    }
  }, []);
  // const appInfo = {
  //   positionName: 'Software',
  //   email: 'mm9079381@gmail.com',
  //   name: 'Mohamed Moussa',
  //   phoneCode: '02',
  //   phoneNumber: '1125894119',
  //   questions: [
  //     {
  //       statement: 'How are you?',
  //       timeToThink: 8,
  //       timeToAnswer: 5,
  //     },
  //     {
  //       statement: 'How are you?',
  //       timeToThink: 3,
  //       timeToAnswer: 9,
  //     },
  //     {
  //       statement: 'How are you?',
  //       timeToThink: 4,
  //       timeToAnswer: 2,
  //     },
  //   ],
  // };
  return (
    <>
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
              <Link to="/intro" className="toIntro">
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
