import React, { useEffect, useState, useRef } from 'react';
import Details from '../components/Details';
import SideMenu from '../components/SideMenu';
import EmailVerification from '../components/EmailVerification';
import NavBar from '../components/NavBar';
import { globalId } from '../components/positionCard';
import { APIURL } from '../API/APIConstants';
const PositionDetails = () => {
  const sideMenu = useRef(null);
  const [position, setPosition] = useState();
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
  const fetchPost = () => {
    fetch(`${APIURL}/job-listing/${globalId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPosition(res);
      });
  };
  useEffect(() => {
    fetchPost();
  }, []);
  // let position = {
  //   positionName: 'Software',
  //   expiryDate: '2022-02-05T23:00:05.955Z',
  //   questions: [
  //     {
  //       statement:"How are you?",
  //       timeToThink: 5,
  //       timeToAnswer: 4,
  //       keywords: [
  //         'one',
  //         'two',
  //         'three',
  //         'four',
  //         'five'
  //       ],
  //     },
  //     {
  //       statement:"State your skills",

  //       timeToThink: 3,
  //       timeToAnswer: 2,
  //       keywords: [
  //         'one',
  //         'two',
  //         'three',
  //         'four',
  //         'five'
  //       ],
  //     },
  //     {
  //       statement:"What's your name?",
  //       timeToThink: 10,
  //       timeToAnswer: 7,
  //       keywords: [
  //         'one',
  //         'two',
  //         'three',
  //         'four',
  //         'five'
  //       ],
  //     },
  //   ],
  // };
  return (
    <>
      {verificationCard && (
        <EmailVerification verificationHandler={cardClickHandler} />
      )}
      <div className="blue-gradient">
        <NavBar
          handleToggleButtonClick={handleToggleButtonClick}
          burgerButton={true}
          clickHandler={navClickHandler}
          verified={verified}
        />
        <SideMenu ref={sideMenu} />
      </div>
      <Details position={position} />
    </>
  );
};
export default PositionDetails;
