import React, { useState } from 'react';
import Card from './Card';
//import ErrorModal from './ErrorModal'
import './scss/invite.scss';

const InviteUser = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPhoneNo, setEnteredPhone] = useState('');
  //const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    props.onInviteUser(enteredName, enteredEmail, enteredPhoneNo);
    setEnteredName('');
    setEnteredEmail('');
    setEnteredPhone('');
  };

  const nameHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const emailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const phoneHandler = (event) => {
    setEnteredPhone(event.target.value);
  };

  // const errorHandler = () => {
  //   setError(null);
  // };

  return (
    <div>
      {/* {error && (
          <ErrorModal
            title={error.title}
            message={error.message}
            onConfirm={errorHandler}
          />
        )} */}
      <Card className="input">
        <form onSubmit={addUserHandler}>
          <label htmlFor="fullname">Full name</label>
          <input
            id="fullname"
            type="text"
            value={enteredName}
            onChange={nameHandler}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={enteredEmail}
            onChange={emailHandler}
            required
          />
          <label htmlFor="phone">Phone no.</label>
          <input
            id="phone"
            type="tel"
            value={enteredPhoneNo}
            onChange={phoneHandler}
          />
          <button className="invite" type="submit">
            Add User
          </button>
        </form>
      </Card>
    </div>
  );
};

export default InviteUser;
