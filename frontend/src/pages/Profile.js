import React, { useContext, useState } from 'react';
import '../components/scss/utility.scss';
import './scss/profile.scss';
import { UserContext } from '../App';
import Card from '../components/Card';
import PhoneInput from 'react-phone-input-2';
import { HRURL } from '../API/APIConstants';
import ErrorModal from '../components/ErrorModal';
import handleAPIError from '../utils/APIErrorHandling';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import SuccessfullModal from '../components/SuccessfullModal';

function ProfilePage() {
  let formattedValue = '';
  const authUser = useContext(UserContext).authUser;
  const [enteredPhoneNo, setEnteredPhoneNo] = useState('');
  const [error, setError] = useState();
  const [enteredPhoneCode, setEnteredPhoneCode] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const setAuthUser = useContext(UserContext).setAuthUser;
  const errorHandler = () => {
    setError(null);
  };
  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    let statusCode;
    fetch(`${HRURL}/user/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authUser.token,
      },
      body: JSON.stringify({
        phoneCode: enteredPhoneCode,
        phoneNumber: enteredPhoneNo,
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
          setLoading(false);
          setDone(true);
          setAuthUser((oldUser) => ({
            ...oldUser,
            ...data.user,
          }));
        } else {
          handleAPIError(statusCode, data, setError, () => setAuthUser(null));
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const Modify = (formattedValue) => {
    let tests = formattedValue.split(' ');
    console.log(tests);
    let num = '';
    for (let i = 1; i < tests.length; i++) {
      num += tests[i];
    }
    console.log(num);
    setEnteredPhoneCode(tests[0]);
    setEnteredPhoneNo(num);
  };
  const handleOnChange = (value, data, event, modifiedValue) => {
    formattedValue = modifiedValue;
    Modify(formattedValue);
  };
  const closeWindow = () => {
    setDone(false);
  };
  return (
    <>
      {done && (
        <SuccessfullModal
          title="Phone No. Edited Successfully"
          closeWindow={closeWindow}
        />
      )}
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <div className="blue-gradient">
        <NavBar visible={true} />
      </div>
      <Card className="profilecard top-margin">
        <h1 className="profile-label">Profile Information</h1>
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
            value={authUser.companyName}
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
              value={authUser.phoneCode + authUser.phoneNumber}
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
          <div className="flex">
            <button className="changepass">
              <Link to={'/changepass'}>Change Password</Link>
            </button>
            {loading ? (
              <div className="tailspin">
                <TailSpin
                  color="hsl(215deg, 79%, 42%)"
                  height={60}
                  width={60}
                />
              </div>
            ) : (
              <button className="save" type="submit">
                Save Changes
              </button>
            )}
          </div>
        </form>
      </Card>
    </>
  );
}

export default ProfilePage;
