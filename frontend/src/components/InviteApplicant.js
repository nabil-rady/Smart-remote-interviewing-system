import React, { useState, useContext } from 'react';
import Card from './Card';
//import ErrorModal from './ErrorModal'
import './scss/invite.scss';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { HRURL } from '../API/APIConstants';
import handleAPIError from '../utils/APIErrorHandling';
import ErrorModal from './ErrorModal';
// import { useFilePicker } from 'use-file-picker';
import { UserContext } from '../App';
import ReactFileReader from 'react-file-reader';

const InviteUser = (props) => {
  let usersLate = props.users;
  const authUser = useContext(UserContext).authUser;
  const globalId = useContext(UserContext).globalId;
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPhoneNo, setEnteredPhoneNo] = useState('');
  const [enteredPhoneCode, setEnteredPhoneCode] = useState('');
  const [error, setError] = useState();
  const save = (file) => {
    let names = [];
    let emails = [];
    let phoneNums = [];
    let phoneCodes = [];
    const initData = file.split('\r\n');
    for (let i = 0; i < initData.length; i++) {
      let appData = initData[i].split(',');
      names.push(appData[0]);
      emails.push(appData[1]);
      phoneCodes.push(appData[2]);
      phoneNums.push(appData[3]);
    }
    for (let i = 0; i < names.length - 1; i++) {
      props.onInviteUser(names[i], emails[i], phoneNums[i], phoneCodes[i]);
      usersLate.push({
        name: names[i],
        email: emails[i],
        phoneCode: phoneCodes[i],
        phoneNumber: phoneNums[i],
      });
    }

    console.log(usersLate);
  };
  let formattedvalue = '';
  const addUserHandler = (event) => {
    event.preventDefault();
    let statusCode;

    props.onInviteUser(
      enteredName,
      enteredEmail,
      enteredPhoneCode,
      enteredPhoneNo
    );
    usersLate.push({
      name: enteredName,
      email: enteredEmail,
      phoneCode: enteredPhoneCode,
      phoneNumber: enteredPhoneNo,
    });
    console.log(globalId, usersLate);
    fetch(`${HRURL}/job-listing/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authUser.token,
      },
      body: JSON.stringify({
        listingId: globalId,
        candidates: usersLate,
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
        } else handleAPIError(statusCode, data, setError);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    console.log(usersLate);
    setEnteredName('');
    setEnteredEmail('');
    setEnteredPhoneNo('');
  };
  // const openAndShow = async () => {
  //   await openFileSelector();
  //   save();
  // }
  const nameHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const emailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const Modify = () => {
    let tests = formattedvalue.split(' ');
    let num = '';
    for (let i = 1; i < tests.length; i++) {
      num += tests[i];
    }
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
  const handleFiles = (files) => {
    var reader = new FileReader();
    reader.onload = (e) => {
      save(reader.result);
    };
    reader.readAsText(files[0]);
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
        <form onSubmit={addUserHandler} className="inviteForm">
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
            value={enteredPhoneCode + enteredPhoneNo}
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
            <ReactFileReader
              multipleFiles={false}
              fileTypes={['.csv']}
              handleFiles={handleFiles}
            >
              <button className="file">Import from a file</button>
            </ReactFileReader>
          </div>
        </form>

        {/* <button className='file' onClick={save}>show</button> */}
      </Card>
    </div>
  );
};

export default InviteUser;
