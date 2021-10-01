import React from 'react';
import '../components/scss/utility.scss';
import LoginForm from '../components/LoginForm';
import NavBar from '../components/NavBar';

function LoginPage() {
  return (
    <>
      <NavBar />
      <LoginForm />
    </>
  );
}

export default LoginPage;
