import React, { useState, useContext } from 'react';
import Card from './Card';
import ErrorModal from './ErrorModal';
import { UserContext } from '../App';
import { APIURL } from '../API/APIConstants';
import handleError from '../utils/errorHandling';
import './scss/login.scss';
import avatarURL from '../user.jpg';

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const setAuthUser = useContext(UserContext).setAuthUser;
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
            avatarURL, //avatarURL: avatarURL,
          });
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
      <Card className="cardemployer">
        <form onSubmit={submitHandler} id="employerform">
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
          <button id="signup">Login</button>
        </form>
      </Card>
    </>
  );
};

export default LoginForm;
