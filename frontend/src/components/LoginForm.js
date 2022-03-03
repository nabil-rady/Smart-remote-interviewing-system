import React, { useState, useContext } from 'react';
import Card from './Card';
import ErrorModal from './ErrorModal';
import { UserContext } from '../App';
import { APIURL } from '../API/APIConstants';
import handleError from '../utils/errorHandling';
import './scss/login.scss';
import avatarURL from '../user.jpg';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
const LoginForm = () => {
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
  const [error, setError] = useState();
  const setAuthUser = useContext(UserContext).setAuthUser;
  const history = useHistory();
  const redirect = () => {
    history.push('/dashboard');
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // Send data to backend
    let statusCode;
    fetch(`${APIURL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        registrationToken,
      }),
    })
      .then((response) => {
        statusCode = response.status;
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (statusCode === 200) {
          setAuthUser({
            ...data.user,
            token: data.token,
          });
          redirect();
        } else handleError(statusCode, data, setError);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // Reference
    // fetch(`${APIURL}/user/login`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': token => when login is required only
    //   },
    //   body: JSON.stringify({ => with POST request only
    //     email: Email,
    //     password: Password
    //   }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   setToken(data.token)
    //   console.log('Success:', data);
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // });
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}

      <Card className="cardemployer top-margin">
        <p className="login_header">
          Login to <span className="login_logo">Vividly</span>
        </p>
        <form onSubmit={submitHandler} id="Loginform">
          <input
            className="inputs"
            type="email"
            placeholder="E-mail"
            required
            onChange={emailHandler}
          />
          <input
            className="inputs"
            type="password"
            placeholder="Password"
            onChange={passwordHandler}
            required
          />
          <button className="login_btn">Login</button>
          <p className="toSignup">
            Don't have an account?{' '}
            <Link to="/signup" className="signupLink">
              Sign up
            </Link>
          </p>
        </form>
      </Card>
    </>
  );
};

export default LoginForm;
