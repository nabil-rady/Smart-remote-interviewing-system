import React, { useState, useEffect, useRef } from 'react';
//import Lottie from 'lottie-react-web';
import './scss/interview.scss';
import Card from './Card';
import ErrorModal from './ErrorModal';
import { Link } from 'react-router-dom';
const Interview = () => {
  const [cursorStyle, setcursorStyle] = useState('auto');
  const [displayColor, setColor] = useState('rgb(162, 172, 182)');
  const [error, setError] = useState();
  const [link, setLink] = useState();
  const changeHandler = (e) => {
    if (e.target.value) {
      setcursorStyle('pointer');
      setColor('white');
      setLink(e.target.value);
    } else {
      setcursorStyle('auto');
      setColor('rgb(162, 172, 182)');
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // if (link !== 'app.interview') {
    //   setError({
    //     title: 'Invalid Link',
    //     message: 'The Link You Entered Is Invalid, Please Try Again',
    //   });
    //   return;
    // } else interviewLink = link;
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className="cardemployee top-margin">
        <form onSubmit={submitHandler} id="employeeform">
          <input
            type="text"
            placeholder="Interview link"
            onChange={changeHandler}
            id="link"
          />
          <br />
          <p id="text">
            Enter the interview link thet the company sent you or click the
            interview link to start
          </p>
          <br />
          <Link
            className="goInterview"
            style={{ cursor: cursorStyle, color: displayColor }}
            to={`/welcome/${link}`}
          >
            Go to Interview
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default Interview;
