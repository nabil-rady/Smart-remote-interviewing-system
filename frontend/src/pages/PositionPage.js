import React, { useContext, useState, useRef } from 'react';
import '../components/scss/utility.scss';
import NavBar from '../components/NavBar';
import './scss/profile.scss';
import { UserContext } from '../App';
import Card from '../components/Card';
import search from './SVGs/research.png';
import invite from './SVGs/invitation.png';
import check from './SVGs/check.png';
import { Link } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import EmailVerification from '../components/EmailVerification';
import './scss/positionpage.scss';
function PositionPage() {
  let positionName = 'Software';
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
      <p className="pName">{positionName}</p>
      <Card className="detailsCard">
        <img src={search} className="images" />
        <div className="labelContainer">
          <Link to="/positiondetails" className="cardLabel">
            Position Details
          </Link>
        </div>
      </Card>
      <Card className="detailsCard">
        <img src={check} className="images" />
        <div className="labelContainer">
          <Link to="/view_applicants" className="cardLabel">
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
