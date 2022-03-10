import React, { useState, useRef, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import EmailVerification from '../components/EmailVerification';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import Card from '../components/Card';
import './scss/applicantDetails.scss';
import { Toast } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { HRURL } from '../API/APIConstants';
import { TailSpin } from 'react-loader-spinner';
import handleAPIError from '../utils/APIErrorHandling';
import messaging from '../utils/firebase';
import {
  setFirebaseMessageListenerEvent,
  getFirebaseToken,
} from '../utils/firebaseUtils';

function ApplicantDetails() {
  const authUser = useContext(UserContext).authUser;
  const params = useParams();
  console.log(params);
  const positionNameAndapplicantId = params.positionNameAndapplicantId;
  const [positionName, applicantId] = positionNameAndapplicantId.split('$');
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });
  const setAuthUser = useContext(UserContext).setAuthUser;
  useEffect(() => {
    setFirebaseMessageListenerEvent(messaging)
      .then((message) => {
        console.log(message);
        setNotification(message.notification);
        setShow(true);
      })
      .catch((err) => console.log(err));
    getFirebaseToken(messaging)
      .then((token) => console.log(token))
      .catch((err) => console.log(err));
  }, []);
  const sideMenu = useRef(null);
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
  const [verificationCard, setVerificationCard] = useState(false);
  const [verified, setVerified] = useState(false);
  const [applicant, setApplicant] = useState();
  const navClickHandler = () => {
    setVerificationCard(true);
  };
  const cardClickHandler = () => {
    setVerified(true);
    setVerificationCard(false);
  };

  const fetchApplicant = () => {
    return fetch(`${HRURL}/job-listing/answers/${applicantId}`, {
      method: 'GET',
      headers: {
        Authorization: authUser.token,
      },
    });
  };

  useEffect(() => {
    const setFetchedApplicant = async () => {
      const response = await fetchApplicant();
      const data = await response.json();
      if (response.status === 200) {
        setApplicant(data);
      } else {
        handleAPIError(
          response.status,
          data,
          () => {},
          () => setAuthUser(null)
        );
      }
    };
    setFetchedApplicant();
  }, []);

  const Dates = (applicant) => {
    let nowDate = new Date(applicant.submitedAt);
    let date =
      nowDate.getFullYear() +
      '-' +
      (nowDate.getMonth() + 1) +
      '-' +
      nowDate.getDate();
    return date;
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
      {applicant ? (
        <>
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
                {positionName}
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
                {applicant.phoneCode + applicant.phoneNumber}
              </p>
            </div>
            <div className="dataContainer">
              <p htmlFor="interviewdate" className="detailsLabel">
                Interview Date:
              </p>
              <p name="interviewdate" className="info">
                {Dates(applicant)}
              </p>
            </div>
          </Card>
          <button className="answers">
            {' '}
            <Link to={`/evaluate/${applicantId}`}>See Answers</Link>
          </button>
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            top: 'calc(50vh - 40px)',
            left: 'calc(50vw - 40px)',
          }}
        >
          <TailSpin color="hsl(215deg, 79%, 42%)" height={80} width={80} />
        </div>
      )}
    </>
  );
}

export default ApplicantDetails;
