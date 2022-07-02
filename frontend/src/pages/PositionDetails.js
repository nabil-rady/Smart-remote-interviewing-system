import React, { useEffect, useState, useContext } from 'react';
import Details from '../components/Details';
import NavBar from '../components/NavBar';
import { HRURL } from '../API/APIConstants';
import { UserContext } from '../App';
import { useParams } from 'react-router-dom';
import handleAPIError from '../utils/APIErrorHandling';

const PositionDetails = () => {
  const params = useParams();
  const positionNameAndId = params.positionNameAndId;
  const positionId = positionNameAndId.split('$')[1];
  const { authUser, setAuthUser } = useContext(UserContext);
  const [position, setPosition] = useState();
  const fetchPosition = () => {
    return fetch(`${HRURL}/job-listing/${positionId}`, {
      method: 'GET',
      headers: {
        Authorization: authUser.token,
      },
    });
  };

  useEffect(() => {
    const setFetchedPosition = async () => {
      const response = await fetchPosition();
      const data = await response.json();
      if (response.status === 200) {
        setPosition(data);
      } else {
        handleAPIError(
          response.status,
          data,
          () => {},
          () => setAuthUser(null)
        );
      }
    };
    setFetchedPosition();
  }, []);

  return (
    <>
      <div className="blue-gradient">
        <NavBar visible={true} />
      </div>
      <Details position={position} />
    </>
  );
};
export default PositionDetails;
