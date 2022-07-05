import React, { useState } from 'react';
import './scss/interview.scss';
import Card from './Card';
import ErrorModal from './ErrorModal';
import { TailSpin } from 'react-loader-spinner';

const Interview = (props) => {
  const [error, setError] = useState();
  const changeHandler = (e) => {
    props.setLink(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
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
          <p className="text">
            Please Enter The Invitation Code That The Company Sent You
          </p>
          <br />

          {!props.loading && (
            <button
              className="goInterview"
              disabled={props.link.length < 8}
              onClick={props.clickHandler}
            >
              Go to Interview
            </button>
          )}
          {props.loading && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TailSpin color="hsl(215deg, 79%, 42%)" height={40} width={50} />
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};

export default Interview;
