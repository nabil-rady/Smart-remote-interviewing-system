import React, { useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import NotificationCard from '../components/NotificationCard';
import SideMenu from '../components/SideMenu';
import NoNotification from '../components/NoNotification';
import './scss/NotificationPage.scss';
function NotificationPage() {
  const notifications = [
    'notification 1',
    'notification 2',
    'notification 3',
    'notification 4',
    'notification 2',
    'notification 3',
    'notification 4',
    'notification 2',
    'notification 3',
    'notification 4',
  ];
  const sideMenu = useRef(null);
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
  const [verificationCard, setVerificationCard] = useState(false);
  const [verified, setVerified] = useState(false);
  const navClickHandler = () => {
    setVerificationCard(true);
  };
  const cardClickHandler = () => {
    setVerified(true);
    setVerificationCard(false);
  };
  return (
    <>
      {/* {verificationCard && (
        <EmailVerification verificationHandler={cardClickHandler} />
      )} */}
      <NavBar
        handleToggleButtonClick={handleToggleButtonClick}
        burgerButton={true}
        clickHandler={navClickHandler}
        verified={verified}
      />
      <SideMenu ref={sideMenu} />
      <div className="notification-header">
        <p className="header-text">Notifications</p>
      </div>

      <div className="notifications">
        {notifications && <NotificationCard notifications={notifications} />}
        {!notifications && <NoNotification />}
      </div>
    </>
  );
}

export default NotificationPage;
