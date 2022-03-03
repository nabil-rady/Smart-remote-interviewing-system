import React, { useContext, useState } from 'react';
import '../components/scss/utility.scss';
import NavBar from '../components/NavBar';
import './scss/profile.scss';
import { UserContext } from '../App';
import Card from '../components/Card';
import PhoneInput from 'react-phone-input-2';
import { HRURL } from '../API/APIConstants';
import ErrorModal from '../components/ErrorModal';
import handleError from '../utils/errorHandling';
function ProfilePage() {
  let formattedvalue = '';
  const authUser = useContext(UserContext).authUser;
  const [enteredPhoneNo, setEnteredPhoneNo] = useState('');
  const [error, setError] = useState();
  const [enteredPhoneCode, setEnteredPhoneCode] = useState('');

  const setAuthUser = useContext(UserContext).setAuthUser;
  const errorHandler = () => {
    setError(null);
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };

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
  const handleSave = () => {
    let statusCode;
    fetch(`${HRURL}/user/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authUser.token,
      },
      body: JSON.stringify({
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
          setAuthUser({
            ...data.user,
          });
        } else handleError(statusCode, data, setError);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
      <Card className="profilecard top-margin">
        <h1 className="profile-label">Profile Info</h1>
        <form onSubmit={submitHandler} className="profile-form">
          <label htmlFor="firstName" className="change-label">
            First Name
          </label>
          <input
            id="firstName"
            className="disabled-inputs"
            type="text"
            placeholder="Your First Name"
            value={authUser.firstName}
            disabled
          />
          <label htmlFor="lastName" className="change-label">
            Last Name
          </label>
          <input
            id="lastName"
            className="disabled-inputs"
            type="text"
            placeholder="Your Last Name"
            value={authUser.lastName}
            disabled
          />
          <label htmlFor="CompanyName" className="change-label">
            Company Name
          </label>
          <input
            id="CompanyName"
            className="change-inputs"
            type="text"
            placeholder="Company Name"
            value={authUser.CompanyName}
            disabled
          />
          <label htmlFor="Email" className="change-label">
            Email
          </label>
          <input
            id="Email"
            className="change-inputs"
            type="email"
            placeholder="E-mail"
            value={authUser.email}
            disabled
          />
          <label htmlFor="PhoneNo" className="change-label">
            Phone Number
          </label>
          <div className="phoneInput">
            <PhoneInput
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true,
                disabled: false,
              }}
              value={authUser.PhoneNo}
              country={'eg'}
              onChange={handleOnChange}
              inputStyle={{
                display: 'block',
                borderTop: 'none',
                borderRight: 'none',
                borderBottom: '1px solid rgb(22, 93, 192)',
                borderLeft: 'none',
                borderImage: 'initial',
                borderRadius: '0px',
                height: '20px',
                width: '92%',
                outline: 'none',
              }}
              containerStyle={{
                marginBottom: '5%',
                marginTop: '3%',
              }}
              enableSearch={true}
            />
          </div>

          {/* <input
            id="PhoneNo"
            className="change-inputs"
            type="tel"
            placeholder="Phone No."
            value={newPhoneNo}
            onChange={changePhoneNoHandler}
            required
          /> */}
          <div className="flex">
            <button className="changepass">
              <a href="/changepass">Change Password</a>
            </button>
            <button className="save" type="submit" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default ProfilePage;
