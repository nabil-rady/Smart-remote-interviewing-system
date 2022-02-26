import React from 'react';
import NavBar from '../components/NavBar';
import Lottie from 'lottie-react-web';
import './scss/Interview.scss';
import Card from '../components/Card';
import { interviewLink } from '../components/Interview';
import { Link } from 'react-router-dom';
import Circle from '../LandingPagecomponents/Circle';
import './scss/Welcome.scss';
function WelcomePage() {
  const appInfo = {
    positionName: 'Software',
    email: 'mm9079381@gmail.com',
    name: 'Mohamed Moussa',
    phoneCode: '02',
    phoneNumber: '1125894119',
    questions: [
      {
        statement: 'How are you?',
        timeToThink: 8,
        timeToAnswer: 5,
      },
      {
        statement: 'How are you?',
        timeToThink: 3,
        timeToAnswer: 9,
      },
      {
        statement: 'How are you?',
        timeToThink: 4,
        timeToAnswer: 2,
      },
    ],
  };
  return (
    <>
      <NavBar />
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
    </>
  );
}

export default WelcomePage;
