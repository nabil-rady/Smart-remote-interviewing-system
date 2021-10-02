import React from 'react';
import NavBar from '../components/NavBar';
import SignUpForm from '../components/SignUpForm';
import '../components/scss/utility.scss';
import Lottie from 'lottie-react-web';
import './scss/signup.scss'

function SignUpPage() {
  return (
    <>
      <NavBar />
      {/* <div className="signupanimation">
        <Lottie
            options={{
            animationData: require('../components/lottie/41391-we-are-hiring-get-ready-to-work-job-recruitment-isometric-hiring-process.json'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            }}
        />
      </div> */}
      <SignUpForm />
    </>
  );
}

export default SignUpPage;
