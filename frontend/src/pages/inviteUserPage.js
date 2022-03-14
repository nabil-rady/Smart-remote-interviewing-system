import React, { useState, useRef, useEffect } from 'react';
import NavBar from '../components/NavBar';
import InviteUser from '../components/InviteApplicant';
import UsersList from '../components/InviteList';
import { Toast } from 'react-bootstrap';
import messaging from '../utils/firebase';
import {
  setFirebaseMessageListenerEvent,
  getFirebaseToken,
} from '../utils/firebaseUtils';
function InvitationPage() {
  const [usersList, setUsersList] = useState([]);
  let InviteUserHandler = (uName, uEmail, uCode, uPhone) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        {
          name: uName,
          email: uEmail,
          phoneCode: uCode,
          phoneNumber: uPhone,
        },
      ];
    });
  };
  return (
    <>
      <div className="blue-gradient">
        <NavBar visible={true} />
      </div>
      <InviteUser onInviteUser={InviteUserHandler} users={usersList} />
      <UsersList users={usersList} />
    </>
  );
}

export default InvitationPage;
