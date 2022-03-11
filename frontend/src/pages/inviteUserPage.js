import React, { useState, useRef, useEffect } from 'react';
import NavBar from '../components/NavBar';
import InviteUser from '../components/InviteApplicant';
import UsersList from '../components/InviteList';
import SideMenu from '../components/SideMenu';
import { Toast } from 'react-bootstrap';
import messaging from '../utils/firebase';
import {
  setFirebaseMessageListenerEvent,
  getFirebaseToken,
} from '../utils/firebaseUtils';

function InvitationPage() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });

  // useEffect(() => {
  //   setFirebaseMessageListenerEvent(messaging)
  //     .then((message) => {
  //       console.log(message);
  //       setNotification(message.notification);
  //       setShow(true);
  //     })
  //     .catch((err) => console.log(err));
  //   getFirebaseToken(messaging)
  //     .then((token) => console.log(token))
  //     .catch((err) => console.log(err));
  // }, []);

  const [usersList, setUsersList] = useState([]);
  const sideMenu = useRef(null);
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
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
        <NavBar
          handleToggleButtonClick={handleToggleButtonClick}
          burgerButton={true}
        />
        <SideMenu ref={sideMenu} />
      </div>

      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={6000}
        autohide
        animation
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          minWidth: 200,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      <InviteUser onInviteUser={InviteUserHandler} users={usersList} />
      <UsersList users={usersList} />
    </>
  );
}

export default InvitationPage;
