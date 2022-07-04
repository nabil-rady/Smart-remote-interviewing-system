import React from 'react';
import NavBar from '../components/NavBar';
import Lottie from 'lottie-react-web';
import './scss/Interview.scss';
import { Link } from 'react-router-dom';
import './scss/Finish.scss';

function FinishPage() {
  return (
    <>
      <NavBar visible={false} />
      <div className="done_container">
        <div className="done_animation">
          <Lottie
            options={{
              animationData: require('./SVGs/done.json'),
              renderer: 'svg',
              loop: false,
              autoplay: true,
            }}
          />
        </div>
        <div className="finish_container">
          <p className="done_text">
            Thanks for taking interview with
            <span className="done_logo"> Vividly</span>
          </p>
          <button className="home_btn">
            <Link to={`/`}>Go To Home</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default FinishPage;
