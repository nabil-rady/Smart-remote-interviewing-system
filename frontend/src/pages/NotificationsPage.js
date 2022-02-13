import React, { useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import NotificationCard from '../components/NotificationCard';
import SideMenu from '../components/SideMenu';
import NoNotification from '../components/NoNotification';
import './scss/NotificationPage.scss';
function NotificationPage() {
  // const notifications = [
  //   'notification 1',
  //   'notification 2',
  //   'notification 3',
  //   'notification 4',
  //   'notification 2',
  //   'notification 3',
  //   'notification 4',
  //   'notification 2',
  //   'notification 3',
  //   'notification 4',
  // ];
  const notifications = false;
  return (
    <>
      {notifications && (
        <div className="notification-header">
          <p className="header-text">Notifications</p>
        </div>
      )}

      {notifications && (
        <div className="notifications">
          <NotificationCard notifications={notifications} />
        </div>
      )}
      {!notifications && (
        <div className="no_notifications">
          <NoNotification />
        </div>
      )}
    </>
  );
}

export default NotificationPage;
