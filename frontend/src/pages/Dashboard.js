import React, { useState, useEffect } from 'react';
import DashboardNavBar from '../components/DashboardNavBar';
import ListingPage from './Listingpage';
import NotificationPage from './NotificationsPage';
import ProfilePage from './Profile';
import NavBar from '../components/NavBar';
const Dashboard = () => {
  // const [show, setShow] = useState(false);
  // const [listing, setListing] = useState(true);
  // const [notifications, setNotifications] = useState(false);
  // const [profile, setProfile] = useState(false);
  // const listingHandler = () => {
  //   setListing(true);
  //   setNotifications(false);
  //   setProfile(false);
  // };
  // const notificationsHandler = () => {
  //   setListing(false);
  //   setNotifications(true);
  //   setProfile(false);
  // };
  // const profileHandler = () => {
  //   setListing(false);
  //   setNotifications(false);
  //   setProfile(true);
  // };
  return (
    <>
      {/* <DashboardNavBar
        notificationsHandler={notificationsHandler}
        listingHandler={listingHandler}
        profileHandler={profileHandler}
      /> */}
      <div className="blue-gradient">
        <NavBar visible={true} />
      </div>
      <h1 className="dashboard-label">Dashboard</h1>
      {/* <Notification /> */}
      <ListingPage />
      {/* {notifications && <NotificationPage />}
      {profile && <ProfilePage />} */}
    </>
  );
};

export default Dashboard;
