import React, { useState, useContext, useEffect } from 'react';
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
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import SuccessfullModal from './SuccessfullModal';
const InviteUser = (props) => {
  const params = useParams();
  const listingId = params.listingId;
  let usersLate = props.users;
  const authUser = useContext(UserContext).authUser;
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPhoneNo, setEnteredPhoneNo] = useState('');
  const [enteredPhoneCode, setEnteredPhoneCode] = useState('');
  const setAuthUser = useContext(UserContext).setAuthUser;
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const fetchInvitations = () => {
    return fetch(`${HRURL}/job-listing/candidates/${listingId}`, {
      method: 'GET',
      headers: {
        Authorization: authUser.token,
      },
    });
  };

  useEffect(() => {
    const setFetchedInvitations = async () => {
      const response = await fetchInvitations();
      const data = await response.json();
      if (response.status === 200) {
        data.candidates.map((candidate) => {
          props.onInviteUser(
            candidate.name,
            candidate.email,
            candidate.phoneCode,
            candidate.phoneNumber
          );
        });
      } else {
        handleAPIError(
          response.status,
          data,
          () => {},
          () => setAuthUser(null)
        );
      }
    };
    setFetchedInvitations();
  }, []);
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
      props.onInviteUser(names[i], emails[i], phoneCodes[i], phoneNums[i]);
      usersLate.push({
        name: names[i],
        email: emails[i],
        phoneCode: phoneCodes[i],
        phoneNumber: phoneNums[i],
      });
      let statusCode;
      fetch(`${HRURL}/job-listing/invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authUser.token,
        },
        body: JSON.stringify({
          listingId: listingId,
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
            setDone(true);
            usersLate.length = 0;
          } else {
            handleAPIError(
              statusCode,
              data,
              () => {},
              () => setAuthUser(null)
            );
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    console.log(usersLate);
  };
  let formattedvalue = '';
  const addUserHandler = (event) => {
    event.preventDefault();
    let statusCode;
    setLoading(true);
    fetch(`${HRURL}/job-listing/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authUser.token,
      },
      body: JSON.stringify({
        listingId: listingId,
        candidates: [
          {
            name: enteredName,
            email: enteredEmail,
            phoneCode: enteredPhoneCode,
            phoneNumber: enteredPhoneNo,
          },
        ],
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
          props.onInviteUser(
            enteredName,
            enteredEmail,
            enteredPhoneCode,
            enteredPhoneNo
          );
          setLoading(false);
          setDone(true);
          usersLate.length = 0;
        } else {
          handleAPIError(statusCode, data, setError, () => setAuthUser(null));
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    console.log(usersLate);
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
  const closeWindow = () => {
    setDone(false);
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

      {done && (
        <SuccessfullModal
          title="Applicant Invited Successfully"
          closeWindow={closeWindow}
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
            {!loading && (
              <button className="invite-button" type="submit">
                Invite User
              </button>
            )}
            {loading && (
              <div
                style={{
                  top: 'calc(40vh - 40px)',
                  left: 'calc(10vw - 40px)',
                  marginRight: '2rem',
                }}
              >
                <TailSpin
                  color="hsl(215deg, 79%, 42%)"
                  height={60}
                  width={60}
                />
              </div>
            )}
            <ReactFileReader
              multipleFiles={false}
              fileTypes={['.csv']}
              handleFiles={handleFiles}
            >
              <p className="file">Import from a file</p>
            </ReactFileReader>
          </div>
        </form>

        {/* <button className='file' onClick={save}>show</button> */}
      </Card>
    </div>
  );
};

export default InviteUser;
