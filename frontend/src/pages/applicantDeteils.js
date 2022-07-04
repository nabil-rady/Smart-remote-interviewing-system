import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import Card from '../components/Card';
import './scss/applicantDetails.scss';
import { useParams } from 'react-router-dom';
import { HRURL } from '../API/APIConstants';
import { TailSpin } from 'react-loader-spinner';
import handleAPIError from '../utils/APIErrorHandling';

function ApplicantDetails() {
  const authUser = useContext(UserContext).authUser;
  const params = useParams();
  console.log(params);
  const applicantId = params.positionNameAndapplicantId;
  const setAuthUser = useContext(UserContext).setAuthUser;
  const [applicant, setApplicant] = useState();

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

  const renderDate = (applicant) => {
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
      <div className="blue-gradient">
        <NavBar visible={true} />
      </div>
      {applicant ? (
        <>
          <h1 className="evaluate_label">Applicant Details</h1>
          <Card className="detailscard">
            <div className="dataContainer">
              <p htmlFor="name" className="detailsLabel">
                Name:
              </p>
              <p name="name" className="info" title={applicant.name}>
                {applicant.name}
              </p>
            </div>
            <div className="dataContainer">
              <p htmlFor="email" className="detailsLabel">
                Email:
              </p>
              <p name="email" className="info" title={applicant.email}>
                {applicant.email}
              </p>
            </div>
            <div className="dataContainer">
              <p htmlFor="phone" className="detailsLabel">
                Phone number:
              </p>
              <p
                name="phone"
                className="info"
                title={applicant.phoneCode + applicant.phoneNumber}
              >
                {applicant.phoneCode + applicant.phoneNumber}
              </p>
            </div>
            <div className="dataContainer">
              <p htmlFor="interviewdate" className="detailsLabel">
                Interview Date:
              </p>
              <p
                name="interviewdate"
                className="info"
                title={renderDate(applicant)}
              >
                {renderDate(applicant)}
              </p>
            </div>
            <div className="dataContainer">
              <p htmlFor="interviewdate" className="detailsLabel">
                Manual Evaluation Score:
              </p>
              <p
                name="interviewdate"
                className="info"
                title={applicant.avgManualEvaluation}
              >
                {applicant.avgManualEvaluation}
              </p>
            </div>
            <div className="dataContainer">
              <p htmlFor="interviewdate" className="detailsLabel">
                Evaluation Results:
              </p>
              <p
                name="interviewdate"
                className="info"
                title={applicant.avgScore}
              >
                {applicant.avgScore}
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
