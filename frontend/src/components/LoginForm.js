import React, { useState, useContext, useEffect } from 'react';
import Card from './Card';
import ErrorModal from './ErrorModal';
import { UserContext } from '../App';
import { APIURL } from '../API/APIConstants';
import handleAPIError from '../utils/APIErrorHandling';
import './scss/login.scss';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import 'firebase/compat/messaging';
import { TailSpin } from 'react-loader-spinner';
import { requestForToken } from '../utils/firebase';
const LoginForm = () => {
  const [registrationToken, setToken] = useState();
  useEffect(async () => {
    let token = await requestForToken();
    setToken(token);
    console.log(registrationToken);
  });
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const setAuthUser = useContext(UserContext).setAuthUser;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
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
          history.push('/dashboard');
          window.location.reload();
          // redirect();
        } else {
          setLoading(false);
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
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TailSpin color="hsl(215deg, 79%, 42%)" height={40} width={40} />
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
