import React, { useRef, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import PositionCard from '../components/positionCard';
import SideMenu from '../components/SideMenu';
import NoNotification from '../components/NoNotification';
import './scss/listingpage.scss';
import { HRURL } from '../API/APIConstants';
import { UserContext } from '../App';
import im1 from '../solidBG/1.jpg';
import im2 from '../solidBG/2.jpg';
import im3 from '../solidBG/3.jpg';
import im4 from '../solidBG/4.jpg';
import im5 from '../solidBG/5.jpg';
import im6 from '../solidBG/6.jpg';
import im7 from '../solidBG/7.jpg';
import im8 from '../solidBG/8.jpg';
import im9 from '../solidBG/9.jpg';
import im10 from '../solidBG/10.jpg';
import im11 from '../solidBG/11.jpg';
import im12 from '../solidBG/12.jpg';
import im13 from '../solidBG/13.jpg';
import im14 from '../solidBG/14.jpg';
import im15 from '../solidBG/15.jpg';
import im16 from '../solidBG/16.jpg';
import im17 from '../solidBG/17.jpg';
import im18 from '../solidBG/18.jpg';
import im19 from '../solidBG/19.jpg';
import im20 from '../solidBG/20.jpg';
import im21 from '../solidBG/21.jpg';
import im22 from '../solidBG/22.jpg';
import im23 from '../solidBG/23.jpg';
import im24 from '../solidBG/24.jpg';
import im25 from '../solidBG/25.jpg';
import im26 from '../solidBG/26.jpg';

import NotVerified from '../components/NotVerifiedModel';
function ListingPage() {
  const [positions, getPositions] = useState([]);
  const authUser = useContext(UserContext).authUser;
  console.log(authUser);
  let backgrounds = [
    im1,
    im2,
    im3,
    im4,
    im5,
    im6,
    im7,
    im8,
    im9,
    im10,
    im11,
    im12,
    im13,
    im14,
    im15,
    im16,
    im17,
    im18,
    im19,
    im20,
    im21,
    im22,
    im23,
    im24,
    im25,
    im26,
  ];
  const fetchPost = () => {
    fetch(`${HRURL}/job-listing/get-listings`, {
      method: 'GET',
      headers: {
        Authorization: authUser.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getPositions(data.jobListings);
      });
  };
  useEffect(() => {
    fetchPost();
  }, []);
  // let positions = [
  //   {
  //     positionName: 'Softwarqweeqwqwweqwqeweqwqeewqewqewwqeewqweqe',
  //     expiryDate: '2022-11-7',
  //     invitationsNumber: 5,
  //     interviewsNumber: 4,
  //   },
  //   {
  //     positionName: 'Hardware',
  //     expiryDate: '2021-11-7',
  //     invitationsNumber: 5,
  //     interviewsNumber: 4,
  //   },
  //   {
  //     positionName: 'AI',
  //     expiryDate: '2021-11-7',
  //     invitationsNumber: 5,
  //     interviewsNumber: 4,
  //   },
  //   {
  //     positionName: 'Digital Design',
  //     expiryDate: '2021-11-7',
  //     invitationsNumber: 5,
  //     interviewsNumber: 4,
  //   },
  // ];
  return (
    <>
      {authUser.emailConfirmed ? (
        positions.length > 0 ? (
          <div classpositionName="positions">
            <PositionCard positions={positions} backgrounds={backgrounds} />
          </div>
        ) : (
          <h1>No Positions to view</h1>
        )
      ) : (
        <NotVerified />
      )}
      <button className="addposition">
        <Link to="/add">Add Position</Link>
      </button>
    </>
  );
}

export default ListingPage;
