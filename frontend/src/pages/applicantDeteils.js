import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import EmailVerification from '../components/EmailVerification';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import Card from '../components/Card';
// import './scss/viewApplicants.scss';
import './scss/applicantDetails.scss';
function ApplicantDetails() {
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
  let applicant = {
    name: 'Mohamed Moussa',
    positionName: 'Software',
    email: 'mm191018101@gmail.com',
    phone: '01125894119',
    interviewDate: '2/13/2022 1:50 pm',
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
      <p className="evaluate_label">Applicant Details</p>
      <Card className="detailscard">
        <div className="dataContainer">
          <p htmlFor="name" className="detailsLabel">
            Name:
          </p>
          <p name="name" className="info">
            {applicant.name}
          </p>
        </div>
        <div className="dataContainer">
          <p htmlFor="pname" className="detailsLabel">
            Position name:
          </p>
          <p name="pname" className="info">
            {applicant.positionName}
          </p>
        </div>
        <div className="dataContainer">
          <p htmlFor="email" className="detailsLabel">
            Email:
          </p>
          <p name="email" className="info">
            {applicant.email}
          </p>
        </div>
        <div className="dataContainer">
          <p htmlFor="phone" className="detailsLabel">
            Phone number:
          </p>
          <p name="phone" className="info">
            {applicant.phone}
          </p>
        </div>
        <div className="dataContainer">
          <p htmlFor="interviewdate" className="detailsLabel">
            Interview Date:
          </p>
          <p name="interviewdate" className="info">
            {applicant.interviewDate}
          </p>
        </div>
      </Card>
      <button className="answers">
        {' '}
        <Link to="/evaluate">See Answers</Link>
      </button>
    </>
  );
}

export default ApplicantDetails;
