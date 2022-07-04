import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { HRURL } from '../API/APIConstants';
import { UserContext } from '../App';
import { TailSpin } from 'react-loader-spinner';
import { useMediaQuery } from '@react-hook/media-query';

import Carousel from 'react-bootstrap/Carousel';
import NotVerified from '../components/NotVerifiedModel';
import handleAPIError from '../utils/APIErrorHandling';
import NoInfo from '../components/NoInfor';
import PositionCard from '../components/positionCard';
import './scss/listingpage.scss';
import '../components/scss/listing.scss';
import WarningModal from '../components/warningModal';

function ListingPage() {
  const [positions, getPositions] = useState();
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser;
  const [warning, setWarning] = useState(false);
  const [deletedPosition, setDeletedPosition] = useState('');
  const smallScreen = useMediaQuery('only screen and (max-width: 1000px)');
  const clickHandler = (position) => {
    setDeletedPosition(position);
    setWarning(true);
  };
  const closeWarning = () => {
    setWarning(false);
  };
  const deletePosition = (position) => {
    let statusCode;
    fetch(`${HRURL}/job-listing/${position.jobListingId}`, {
      method: 'DELETE',

      headers: {
        Authorization: authUser.token,
      },
    })
      .then((response) => {
        statusCode = response.status;
        return response.json();
      })
      .then((data) => {
        if (statusCode === 200) {
          getPositions((oldPositions) =>
            oldPositions.filter(
              (newPosition, index) =>
                position.jobListingId !== newPosition.jobListingId
            )
          );
          setWarning(false);
        } else {
          handleAPIError(
            statusCode,
            data,
            () => {},
            () => setAuthUser(null)
          );
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchPositions = () => {
    return fetch(`${HRURL}/job-listing/get-listings`, {
      method: 'GET',
      headers: {
        Authorization: authUser.token,
      },
    });
  };

  const renderPositions = () => {
    if (smallScreen) {
      return positions.map((position, index) => {
        return (
          <PositionCard
            key={index}
            position={position}
            deletePosition={clickHandler}
          />
        );
      });
    }

    return (
      <Carousel interval={null}>
        {positions.map((position, index) => {
          if (index % 3 !== 0) return null;
          return (
            <Carousel.Item key={index}>
              <div
                className="d-flex"
                style={{
                  margin: '0 3.5rem',
                }}
              >
                <PositionCard
                  position={positions[index]}
                  deletePosition={clickHandler}
                ></PositionCard>
                <PositionCard
                  position={positions[index + 1]}
                  deletePosition={clickHandler}
                ></PositionCard>
                <PositionCard
                  position={positions[index + 2]}
                  deletePosition={clickHandler}
                ></PositionCard>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  };

  useEffect(() => {
    const setFetchedPositions = async () => {
      const response = await fetchPositions();
      const data = await response.json();
      if (response.status === 200) {
        getPositions(data.jobListings);
      } else {
        handleAPIError(
          response.status,
          data,
          () => {},
          () => setAuthUser(null)
        );
      }
    };
    setFetchedPositions();
  }, []);
  return (
    <>
      {warning && (
        <WarningModal
          closeWarning={closeWarning}
          deletePosition={deletePosition}
          position={deletedPosition}
          title={`${deletedPosition.positionName} Position Will be Deleted`}
          message={'Are you sure to continue ?!'}
        />
      )}
      <h1 className="dashboard-label">Dashboard</h1>
      {authUser.emailConfirmed ? (
        positions ? (
          positions.length > 0 ? (
            <>
              <div className="positions">{renderPositions()}</div>
              <button className="addposition">
                <Link to="/addposition">Add Position</Link>
              </button>
            </>
          ) : (
            <>
              <NoInfo page="dashboard" />
              <button className="addposition">
                <Link to="/addposition">Add Position</Link>
              </button>
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
        )
      ) : (
        <NotVerified />
      )}
    </>
  );
}

export default ListingPage;
