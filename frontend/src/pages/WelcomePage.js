import React from 'react';
import NavBar from '../components/NavBar';
import Lottie from 'lottie-react-web';
import './scss/Interview.scss';
import Card from '../components/Card';
import './scss/Welcome.scss';
import { TailSpin } from 'react-loader-spinner';

function WelcomePage(props) {
  return (
    <>
      <div className="blue-gradient">
        <NavBar visible={false} />
      </div>
      {props.response ? (
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
              Welcome {props.response.name} in{' '}
              <span className="welcome_logo">Vividly</span>
            </p>
            <p className="start_interview">Let's start the interview!</p>
            <button
              className="startInterview_btn"
              onClick={props.welcomeHandler}
            >
              Start Interview
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
