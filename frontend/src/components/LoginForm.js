import React, { useState, useContext } from 'react';
import Card from './Card';
import ErrorModal from './ErrorModal';
import { UserContext } from '../App';
import { APIURL } from '../API/APIConstants';
import handleAPIError from '../utils/APIErrorHandling';
import './scss/login.scss';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import { TailSpin } from 'react-loader-spinner';
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
  const [loading, setLoading] = useState(false);
  // const redirect = () => {
  //   history.push('/dashboard');
  // };
  const submitHandler = (e) => {
    e.preventDefault();
    // Send data to backend
    setLoading(true);
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
          setLoading(false);
          // redirect();
        } else {
          handleAPIError(statusCode, data, setError, () => setAuthUser(null));
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
          {!loading && <button className="login_btn">Login</button>}
          {loading && (
            <div
              style={{
                top: 'calc(50vh - 40px)',
                left: 'calc(50vw - 40px)',
                marginLeft: '2rem',
              }}
            >
              <TailSpin color="hsl(215deg, 79%, 42%)" height={50} width={50} />
            </div>
          )}
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
