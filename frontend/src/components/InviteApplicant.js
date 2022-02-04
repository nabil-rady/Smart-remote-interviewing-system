import React, { useState } from 'react';
import Card from './Card';
//import ErrorModal from './ErrorModal'
import './scss/invite.scss';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { APIURL } from '../API/APIConstants';
import handleError from '../utils/errorHandling';
import ErrorModal from './ErrorModal';
const InviteUser = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPhoneNo, setEnteredPhoneNo] = useState('');
  const [enteredPhoneCode, setEnteredPhoneCode] = useState('');
  const [error, setError] = useState();
  //const [error, setError] = useState();
  let formattedvalue = '';
  const addUserHandler = (event) => {
    event.preventDefault();
    let statusCode;
    fetch(`${APIURL}/job-listing/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        enteredName,
        enteredEmail,
        enteredPhoneCode,
        enteredPhoneNo,
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
          console.log('successful');
        } else handleError(statusCode, data, setError);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    props.onInviteUser(
      enteredName,
      enteredEmail,
      enteredPhoneNo,
      enteredPhoneCode
    );
    console.log(props.users);
    setEnteredName('');
    setEnteredEmail('');
    setEnteredPhoneNo('');
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
  const Modify = () => {
    let tests = formattedvalue.split(' ');
    console.log(tests);
    let num = '';
    for (let i = 1; i < tests.length; i++) {
      num += tests[i];
    }
    console.log(num);
    setEnteredPhoneCode(tests[0]);
    setEnteredPhoneNo(num);
  };
  const handleOnChange = (value, data, event, formattedValue) => {
    formattedvalue = formattedValue;
    Modify();
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
            country={'eg'}
            onChange={handleOnChange}
            inputStyle={{
              display: 'block',
              border: 'none',
              borderBottom: '1px solid hsl(215deg, 79%, 42%)',
              borderRadius: '0px',
              height: '20px',
              width: '100%',
              outline: 'none',
            }}
            containerStyle={{
              marginBottom: '5%',
              marginTop: '3%',
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
