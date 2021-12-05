import React, { useState } from 'react';
import DashboardNavBar from '../components/DashboardNavBar';
import ListingPage from './Listingpage';
import ProfilePage from './Profile';

const Dashboard = () => {
  const [Listing, setListing] = useState(true);
  const [interviews, setInterviews] = useState(false);
  const [profile, setProfile] = useState(false);
  const listingHandler = () => {
    setListing(true);
    setInterviews(false);
    setProfile(false);
  };
  const interviewsHandler = () => {
    setListing(false);
    setInterviews(true);
    setProfile(false);
  };
  const profileHandler = () => {
    setListing(false);
    setInterviews(false);
    setProfile(true);
  };
  return (
    <>
      <DashboardNavBar
        interviewsHandler={interviewsHandler}
        listingHandler={listingHandler}
        profileHandler={profileHandler}
      />
      {Listing && <ListingPage />}
      {profile && <ProfilePage />}
    </>
  );
};

export default Dashboard;
