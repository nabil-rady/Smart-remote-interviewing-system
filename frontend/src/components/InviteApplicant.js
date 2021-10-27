import React, { useState } from 'react';
import Card from './Card';
//import ErrorModal from './ErrorModal'
import './scss/invite.scss';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
      <Card className="invite top-margin">
        <h1 className="invite_label">Invite Applicant</h1>
        <form onSubmit={addUserHandler}>
          <label htmlFor="fullname" className="invite-labels">
            Full name
          </label>
          <input
            id="fullname"
            type="text"
            value={enteredName}
            onChange={nameHandler}
            required
          />
          <label htmlFor="email" className="invite-labels">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={enteredEmail}
            onChange={emailHandler}
            required
          />
          <label htmlFor="phone" className="invite-labels">
            Phone no.
          </label>
          <PhoneInput
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true,
              disabled: false,
            }}
            className="phone"
            country={'eg'}
            value={enteredPhoneNo}
            onChange={(phone) => {
              console.log(enteredPhoneNo);
              setEnteredPhone(phone);
            }}
            enableSearch={true}
          />
          <div className="flex">
            <button className="invite-button" type="submit">
              Invite User
            </button>
            <button className="file" type="submit">
              Import from a file
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default InviteUser;
