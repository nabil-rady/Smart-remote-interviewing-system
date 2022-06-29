import React, { useState, useRef, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
import InviteUser from '../components/InviteApplicant';
import UsersList from '../components/InviteList';
import { HRURL } from '../API/APIConstants';
import { UserContext } from '../App';
import { useParams } from 'react-router-dom';
import handleAPIError from '../utils/APIErrorHandling';
import { TailSpin } from 'react-loader-spinner';
function InvitationPage() {
  const params = useParams();
  const listingId = params.listingId;
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser;
  const [usersList, setUsersList] = useState([]);
  let InviteUserHandler = (uName, uEmail, uCode, uPhone) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        {
          name: uName,
          email: uEmail,
          phoneCode: uCode,
          phoneNumber: uPhone,
        },
      ];
    });
  };
  const fetchInvitations = () => {
    return fetch(`${HRURL}/job-listing/candidates/${listingId}`, {
      method: 'GET',
      headers: {
        Authorization: authUser.token,
      },
    });
  };

  useEffect(() => {
    const setFetchedInvitations = async () => {
      const response = await fetchInvitations();
      const data = await response.json();
      if (response.status === 200) {
        data.candidates.map((candidate) => {
          InviteUserHandler(
            candidate.name,
            candidate.email,
            candidate.phoneCode,
            candidate.phoneNumber
          );
        });
      } else {
        handleAPIError(
          response.status,
          data,
          () => {},
          () => setAuthUser(null)
        );
      }
    };
    setFetchedInvitations();
  }, []);
  return (
    <>
      <div className="blue-gradient">
        <NavBar visible={true} />
      </div>
      {usersList?.length !== 0 ? (
        <>
          <InviteUser onInviteUser={InviteUserHandler} users={usersList} />
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

      <UsersList users={usersList} />
    </>
  );
}

export default InvitationPage;
