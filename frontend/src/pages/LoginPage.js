import React from 'react';
import '../components/scss/utility.scss';
import LoginForm from '../components/LoginForm';
import NavBar from '../components/NavBar';
import './scss/login.scss';

function LoginPage() {
  return (
    <>
      <NavBar />
      <LoginForm />
    </>
  );
}

export default LoginPage;
