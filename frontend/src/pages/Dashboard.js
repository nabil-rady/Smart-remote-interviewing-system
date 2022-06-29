import React from 'react';
import ListingPage from './Listingpage';
import NavBar from '../components/NavBar';

const Dashboard = () => {
  return (
    <>
      <div className="blue-gradient">
        <NavBar visible={true} />
      </div>
      <ListingPage />
    </>
  );
};

export default Dashboard;
