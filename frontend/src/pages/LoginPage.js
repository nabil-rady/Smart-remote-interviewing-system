import React from 'react';
import '../components/scss/utility.scss';
import LoginForm from '../components/LoginForm';
import NavBar from '../components/NavBar';
import './scss/login.scss';
import Lottie from 'lottie-react-web';

function LoginPage() {
  return (
    <>
      <NavBar />
      <div className="loginanimation">
        <Lottie
          options={{
            animationData: require('../components/lottie/47386-we-are-hiring.json'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
          }}
        />
      </div>
      <LoginForm />
    </>
  );
}

export default LoginPage;
