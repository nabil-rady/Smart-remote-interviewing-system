import React, { useState, useRef, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
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
  const setAuthUser = useContext(UserContext).setAuthUser;
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
        <NavBar visible={true} />
      </div>
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
