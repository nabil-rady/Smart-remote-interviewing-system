import React, { useContext, useState, useRef, useEffect } from 'react';
import '../components/scss/utility.scss';
import NavBar from '../components/NavBar';
import './scss/profile.scss';
import { UserContext } from '../App';
import Card from '../components/Card';
import search from './SVGs/research.png';
import invite from './SVGs/invitation.png';
import check from './SVGs/check.png';
import { Link, useParams } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import EmailVerification from '../components/EmailVerification';
import './scss/positionpage.scss';
import { Button, Row, Col, Toast } from 'react-bootstrap';
import { HRURL } from '../API/APIConstants';
import ErrorModal from '../components/ErrorModal';

import messaging from '../utils/firebase';
import {
  setFirebaseMessageListenerEvent,
  getFirebaseToken,
} from '../utils/firebaseUtils';

function PositionPage(props) {
  const params = useParams();
  console.log(params);
  const positionNameAndId = params.positionNameAndId;

  const [positionName, positionId] = positionNameAndId.split('$');
  console.log(positionName, positionId);

  useEffect(async () => {
    setFirebaseMessageListenerEvent(messaging)
      .then((message) => {
        console.log(message);
        setNotification(message.notification);
        setShow(true);
      })
      .catch((err) => console.log(err));
    try {
      const token = await getFirebaseToken(messaging);
      console.log(token);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const [show, setShow] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });

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
      <p className="pName">{positionName}</p>
      <Card className="detailsCard">
        <img src={search} className="images" />
        <div className="labelContainer">
          <Link
            to={`/positiondetails/${positionName}$${positionId}`}
            className="cardLabel"
          >
            Position Details
          </Link>
        </div>
      </Card>
      <Card className="detailsCard">
        <img src={check} className="images" />
        <div className="labelContainer">
          <Link
            to={`/view_applicants/${positionName}$${positionId}`}
            className="cardLabel"
          >
            Evalute Applicants
          </Link>
        </div>
      </Card>
      <Card className="detailsCard">
        <img src={invite} className="images" />
        <div className="labelContainer">
          <Link to="/invite" className="cardLabel">
            Invite Applicants
          </Link>
        </div>
      </Card>
    </>
  );
}

export default PositionPage;
