import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import Card from '../components/Card';
import './scss/changepass.scss';
const ChangePassword = () => {
  const [oldPass, setOldPass] = useState();
  const [NewPass, setNewPass] = useState();
  const sideMenu = useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const oldPassHandler = (e) => {
    setOldPass(e.target.value);
  };
  const newPassHandler = (e) => {
    setNewPass(e.target.value);
  };

  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');

  return (
    <>
      <NavBar
        handleToggleButtonClick={handleToggleButtonClick}
        burgerButton={true}
      />
      <SideMenu ref={sideMenu} />
      <Card className="password-card top-margin">
        <h1 className="changepass-label"> Change Password </h1>
        <form onSubmit={submitHandler} className="password-form">
          <input
            className="password-inputs"
            type="password"
            placeholder="Enter Old Password"
            required
            onChange={oldPassHandler}
          />
          <input
            className="password-inputs"
            type="password"
            placeholder="Enter New Password"
            onChange={newPassHandler}
            required
          />
          <button className="change-pass">Confirm</button>
        </form>
      </Card>
    </>
  );
};

export default ChangePassword;
