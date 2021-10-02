import React from 'react';
import NavBar from '../components/NavBar';
import Interview from '../components/Interview';
import '../components/scss/utility.scss';
import Lottie from 'lottie-react-web';
import './scss/Interview.scss';

function InterviewPage() {
  return (
    <>
      <NavBar />
      {/* <div className="Interviewanimation">
        <Lottie
          options={{
            animationData: require('../components/lottie/41391-we-are-hiring-get-ready-to-work-job-recruitment-isometric-hiring-process.json'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
          }}
        />
      </div> */}
      <Interview />
    </>
  );
}

export default InterviewPage;
