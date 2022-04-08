import React, { useState, useRef, useContext, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import Card from '../components/Card';
import './scss/viewApplicants.scss';
import { Toast } from 'react-bootstrap';
import 'firebase/compat/messaging';
import { useParams } from 'react-router-dom';
import handleAPIError from '../utils/APIErrorHandling';
import { HRURL } from '../API/APIConstants';
import { TailSpin } from 'react-loader-spinner';
import messaging from '../utils/firebase';
import {
  setFirebaseMessageListenerEvent,
  getFirebaseToken,
} from '../utils/firebaseUtils';

function ViewApplicants() {
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser;
  const params = useParams();
  const positionId = params.positionNameAndId;
  const [interviews, setInterviews] = useState();
  const fetchInterviews = () => {
    return fetch(`${HRURL}/job-listing/${positionId}`, {
      method: 'GET',
      headers: {
        Authorization: authUser.token,
      },
    });
  };

  useEffect(() => {
    const setFetchedInterviews = async () => {
      const response = await fetchInterviews();
      const data = await response.json();
      if (response.status === 200) {
        setInterviews(data.interviews);
      } else {
        handleAPIError(
          response.status,
          data,
          () => {},
          () => setAuthUser(null)
        );
      }
    };
    setFetchedInterviews();
  }, []);
  return (
    <>
      <div className="blue-gradient">
        <NavBar visible={true} />
      </div>
      {interviews ? (
        interviews.length > 0 ? (
          <>
            <p className="evaluate_label">Evaluate Applicants</p>
            <ul className="applicants_list">
              {interviews.map((applicant, index) => (
                <Card key={index} className="applicantcard">
                  <Link
                    to={`/applicant_details/${applicant.interviewId}`}
                    className="app_name"
                    title={applicant.name}
                  >
                    {applicant.name}
                  </Link>
                  <p htmlFor="interviewdate" className="labels">
                    Interview Date:
                  </p>
                  <p name="interviewdate" className="app_interviewdate">
                    {applicant.submitedAt}
                  </p>
                </Card>
              ))}
            </ul>
          </>
        ) : (
          <h1>There's no applicants to evaluate</h1>
        )
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

export default ViewApplicants;
