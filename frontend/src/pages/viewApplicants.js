import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'firebase/compat/messaging';
import { Link } from 'react-router-dom';
import { HRURL } from '../API/APIConstants';
import { UserContext } from '../App';

import NavBar from '../components/NavBar';
import Card from '../components/Card';
import handleAPIError from '../utils/APIErrorHandling';
import { TailSpin } from 'react-loader-spinner';
import NoInfo from '../components/NoInfor';

import formatDate from '../utils/formatDate';

import './scss/viewApplicants.scss';

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
            <h1 className="evaluate_label">Evaluate Applicants</h1>
            <ul className="applicants_list">
              {interviews.map((applicant, index) => (
                <Card key={index} className="applicants_card">
                  <Link
                    to={`/applicant_details/${applicant.interviewId}`}
                    className="app_name"
                    title={applicant.name}
                  >
                    Applicant:{' '}
                    <span
                      style={{
                        color: 'black',
                        fontWeight: '400',
                        fontSize: '1rem',
                      }}
                    >
                      {applicant.name}
                    </span>
                  </Link>
                  <p htmlFor="interviewdate" className="labels">
                    Interview Date:
                  </p>
                  <p name="interviewdate" className="app_interviewdate">
                    {formatDate(applicant.submitedAt)}
                  </p>
                </Card>
              ))}
            </ul>
          </>
        ) : (
          <>
            <NoInfo page="evaluate" />
          </>
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
