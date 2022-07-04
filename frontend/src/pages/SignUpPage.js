import React from 'react';
import NavBar from '../components/NavBar';
import SignUpForm from '../components/SignUpForm';
import '../components/scss/utility.scss';
import './scss/signup.scss';

function SignUpPage() {
  return (
    <>
      <NavBar />
      <SignUpForm />
    </>
  );
}

export default SignUpPage;
