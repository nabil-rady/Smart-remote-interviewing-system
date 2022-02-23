import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import InviteUser from '../components/InviteApplicant';
import UsersList from '../components/InviteList';
import SideMenu from '../components/SideMenu';
import NotVerified from '../components/NotVerifiedModel';
function InvitationPage() {
  const [usersList, setUsersList] = useState([]);
  const sideMenu = useRef(null);
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
  let InviteUserHandler = (uName, uEmail, uPhone, uCode) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        {
          name: uName,
          email: uEmail,
          phoneCode: uCode,
          phone: uPhone,
        },
      ];
    });
  };
  return (
    <>
      <NavBar
        handleToggleButtonClick={handleToggleButtonClick}
        burgerButton={true}
      />
      <SideMenu ref={sideMenu} />
      <InviteUser onInviteUser={InviteUserHandler} users={usersList} />
      <UsersList users={usersList} />
    </>
  );
}

export default InvitationPage;
