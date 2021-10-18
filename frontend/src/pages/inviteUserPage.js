import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import InviteUser from '../components/InviteApplicant';
import UsersList from '../components/InviteList';
import SideMenu from '../components/SideMenu';
function InvitationPage() {
  const [usersList, setUsersList] = useState([]);
  const sideMenu = useRef(null);
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
  const InviteUserHandler = (uName, uEmail, uPhone) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        {
          name: uName,
          email: uEmail,
          phone: uPhone,
          id: Math.random().toString(),
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
      <InviteUser onInviteUser={InviteUserHandler} />
      <UsersList users={usersList} />
    </>
  );
}

export default InvitationPage;
