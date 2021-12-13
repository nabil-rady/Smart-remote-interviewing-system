import React, { useRef, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import PositionCard from '../components/positionCard';
import SideMenu from '../components/SideMenu';
import NoNotification from '../components/NoNotification';
import './scss/listingpage.scss';

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
import im27 from '../solidBG/27.jpg';
import im28 from '../solidBG/28.jpg';
import im29 from '../solidBG/29.jpg';
import im30 from '../solidBG/30.jpg';

function ListingPage() {
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
    im27,
    im28,
    im29,
    im30,
  ];
  //   const [listItems, setListItems] = useState(Array.from(Array(9).keys(), n => n + 1));
  //   const [isFetching, setIsFetching] = useState(false);

  //   useEffect(() => {
  //     window.addEventListener('scroll', handleScroll);
  //     return () => window.removeEventListener('scroll', handleScroll);
  //   }, []);

  //   useEffect(() => {
  //     if (!isFetching) return;
  //     fetchMoreListItems();
  //   }, [isFetching]);

  //   function handleScroll() {
  //     if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
  //     setIsFetching(true);
  //   }

  //   function fetchMoreListItems() {
  //     setTimeout(() => {
  //       setListItems(prevState => ([...prevState, ...Array.from(Array(6).keys(), n => n + prevState.length + 1)]));
  //       setIsFetching(false);
  //     }, 2000);
  //   }

  const positions = [
    {
      name: 'Softwarqweeqwqwweqwqeweqwqeewqewqewwqeewqweqe',
      expirydate: '2022-11-7',
      CandidatesNo: 5,
      Finishedinterviews: 4,
    },
    {
      name: 'Hardware',
      expirydate: '2021-11-7',
      CandidatesNo: 5,
      Finishedinterviews: 4,
    },
    {
      name: 'AI',
      expirydate: '2021-11-7',
      CandidatesNo: 5,
      Finishedinterviews: 4,
    },
    {
      name: 'Digital Design',
      expirydate: '2021-11-7',
      CandidatesNo: 5,
      Finishedinterviews: 4,
    },
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
      <div className="positions">
        <PositionCard positions={positions} backgrounds={backgrounds} />
      </div>
    </>
  );
}

export default ListingPage;