import React, { useState } from 'react';
import DashboardNavBar from '../components/DashboardNavBar';
import ListingPage from './Listingpage';
import NotificationPage from './NotificationsPage';
import ProfilePage from './Profile';

const Dashboard = () => {
  const [Listing, setListing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [profile, setProfile] = useState(false);
  const listingHandler = () => {
    setListing(true);
    setNotifications(false);
    setProfile(false);
  };
  const notificationsHandler = () => {
    setListing(false);
    setNotifications(true);
    setProfile(false);
  };
  const profileHandler = () => {
    setListing(false);
    setNotifications(false);
    setProfile(true);
  };
  return (
    <>
      <DashboardNavBar
        notificationsHandler={notificationsHandler}
        listingHandler={listingHandler}
        profileHandler={profileHandler}
      />
      {Listing && <ListingPage />}
      {notifications && <NotificationPage />}
      {profile && <ProfilePage />}
    </>
  );
};

export default Dashboard;
