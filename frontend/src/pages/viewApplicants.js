import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import EmailVerification from '../components/EmailVerification';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import Card from '../components/Card';
import './scss/viewApplicants.scss';
function ViewApplicants() {
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
  let applicants = [
    {
      name: 'Mohamed Moussa',
      interviewDate: '2/13/2022 1:50 pm',
    },
    {
      name: 'Mohamed Nabil',
      interviewDate: '2/13/2022 1:40 pm',
    },
    {
      name: 'Mohamed Medhat',
      interviewDate: '2/13/2022 1:30 pm',
    },
  ];
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
      <p className="evaluate_label">Evaluate Applicants</p>
      <ul className="applicants_list">
        {applicants.map((applicant, index) => (
          <Card key={index} className="applicantcard">
            <Link
              to="/applicant_details"
              className="app_name"
              title={applicant.name}
            >
              {applicant.name}
            </Link>
            <p htmlFor="interviewdate" className="labels">
              Interview Date:
            </p>
            <p name="interviewdate" className="app_interviewdate">
              {applicant.interviewDate}
            </p>
          </Card>
        ))}
      </ul>
    </>
  );
}

export default ViewApplicants;
