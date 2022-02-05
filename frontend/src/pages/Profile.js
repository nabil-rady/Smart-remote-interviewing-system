import React, { useContext, useState } from 'react';
import '../components/scss/utility.scss';
import NavBar from '../components/NavBar';
import './scss/profile.scss';
import { UserContext } from '../App';
import Card from '../components/Card';

function ProfilePage() {
  const authUser = useContext(UserContext).authUser;
  const [newCompanyName, setCompanyName] = useState();
  const [newEmail, setEmail] = useState();
  const [newPhoneNo, setPhoneNo] = useState();
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const changePhoneNoHandler = (e) => {
    setPhoneNo(e.target.value);
  };
  return (
    <>
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
          <input
            id="PhoneNo"
            className="change-inputs"
            type="tel"
            placeholder="Phone No."
            value={authUser.PhoneNo}
            onChange={changePhoneNoHandler}
            required
          />
          <div className="flex">
            <button className="changepass">
              <a href="/changepass">Change Password</a>
            </button>
            <button className="save" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default ProfilePage;
