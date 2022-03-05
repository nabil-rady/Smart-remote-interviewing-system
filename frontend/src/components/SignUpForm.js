import React, { useState, useContext } from 'react';
import './scss/signup.scss';
import Card from './Card';
import ErrorModal from './ErrorModal';
import { APIURL } from '../API/APIConstants';
import { UserContext } from '../App';
import handleAPIError from '../utils/APIErrorHandling';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import EmailVerification from './EmailVerification';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
let userId;
const SignUpForm = () => {
  const [registrationToken, setToken] = useState();
  const firebaseConfig = {
    apiKey: 'AIzaSyDuqj0k4SCgC-KQjHnZhV4dLxMDI8NaiS8',
    authDomain: 'vividly-notification.firebaseapp.com',
    projectId: 'vividly-notification',
    storageBucket: 'vividly-notification.appspot.com',
    messagingSenderId: '964487453958',
    appId: '1:964487453958:web:93e6d088edf1bb5fe4d287',
    measurementId: 'G-G29W0NWEVB',
  };

  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  const [show, setShow] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });
  // getToken(setTokenFound);
  const onMessageListener = () =>
    new Promise((resolve) => {
      messaging.onMessage((payload) => {
        resolve(payload);
      });
    });
  onMessageListener()
    .then((message) => {
      console.log(message);
      setNotification(message.notification);
      setShow(true);
    })
    .catch((err) => console.log('failed: ', err));
  messaging
    .getToken()
    .then((token) => {
      setToken(token);
    })
    .catch((err) => {
      console.log(err);
    });
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [companyName, setCompanyName] = useState();
  const [phone, setNum] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();
  const [phoneCode, setCode] = useState();
  const [verificationCard, setVerificationCard] = useState(false);
  let formattedvalue = '';
  const setAuthUser = useContext(UserContext).setAuthUser;
  const authUser = useContext(UserContext).authUser;
  const submitHandler = (e) => {
    e.preventDefault();
    // Send data to backend
    let statusCode;

    fetch(`${APIURL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        companyName,
        email,
        password,
        confirmPassword,
        phoneCode,
        phoneNumber: phone,
      }),
    })
      .then((response) => {
        statusCode = response.status;
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (statusCode === 201) {
          console.log('Success');
        } else handleAPIError(statusCode, data, setError);
        console.log(registrationToken);
        return fetch(`${APIURL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            registrationToken,
          }),
        });
      })
      .then((loginResponse) => {
        statusCode = loginResponse.status;
        return loginResponse.json();
      })
      .then((response) => {
        console.log(response);
        if (statusCode === 200) {
          console.log('Success');
          console.log(response);
          setAuthUser({ ...response.user, token: response.token });
          // console.log(authUser);
          setVerificationCard(true);
          return fetch(`${APIURL}/user/confirm-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: response.token,
            },
          });
        } else handleAPIError(statusCode, response.data, setError);
      })
      .then((confirmResponse) => {
        return confirmResponse.json();
      })
      .then((response) => {
        console.log(response);
        if (statusCode === 200) {
          console.log('Success');
          setVerificationCard(true);
        } else handleAPIError(statusCode, response.data, setError);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const EmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const PasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const ConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };
  const CompanyNameHandler = (e) => {
    setCompanyName(e.target.value);
  };
  const FirstNameHandler = (e) => {
    setFirstName(e.target.value);
  };
  const LastNameHandler = (e) => {
    setLastName(e.target.value);
  };
  // const PhoneHandler = (e) => {
  //   setNum(e.target.value);
  // };
  const errorHandler = () => {
    setError(null);
  };
  const Modify = () => {
    let tests = formattedvalue.split(' ');
    console.log(tests);
    let num = '';
    for (let i = 1; i < tests.length; i++) {
      num += tests[i];
    }
    console.log(num);
    setCode(tests[0]);
    setNum(num);
  };
  const handleOnChange = (value, data, event, formattedValue) => {
    formattedvalue = formattedValue;
    Modify();
  };

  const verificationHandler = () => {
    if (authUser.emailConfirmed) setVerificationCard(false);
    else setVerificationCard(true);
  };
  return (
    <>
      {verificationCard && <EmailVerification route={'/dashboard'} />}
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className="cardsignup top-margin">
        <p className="signup_header">
          Sign up to <span className="signup_logo">Vividly</span>
        </p>
        <form onSubmit={submitHandler} id="employerform">
          <input
            className="inputs"
            type="text"
            placeholder="Your First Name"
            onChange={FirstNameHandler}
            required
          />
          <input
            className="inputs"
            type="text"
            placeholder="Your Last Name"
            onChange={LastNameHandler}
            required
          />
          <input
            className="inputs"
            type="text"
            placeholder="Company Name"
            onChange={CompanyNameHandler}
            required
          />
          <input
            className="inputs"
            type="email"
            placeholder="E-mail"
            onChange={EmailHandler}
            required
          />
          <input
            className="inputs"
            type="password"
            placeholder="Password"
            onChange={PasswordHandler}
            required
          />
          <input
            className="inputs"
            type="password"
            placeholder="Confirm Password"
            onChange={ConfirmPasswordHandler}
            required
          />
          <PhoneInput
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true,
              disabled: false,
            }}
            country={'eg'}
            onChange={handleOnChange}
            enableSearch={true}
            inputStyle={{
              display: 'block',
              border: 'none',
              borderBottom: '1px solid hsl(215deg, 79%, 42%)',
              borderRadius: '0px',
              height: '20px',
              width: '80%',
              outline: 'none',
            }}
            containerStyle={{
              marginLeft: '10%',
              marginBottom: '8%',
              marginTop: '8%',
            }}
          />
          <button className="signup">Sign Up</button>
        </form>
        <p className="toLogin">
          Have an account?{' '}
          <Link to="/login" className="loginLink">
            Login
          </Link>
        </p>
      </Card>
    </>
  );
};
export default SignUpForm;
export { userId };
