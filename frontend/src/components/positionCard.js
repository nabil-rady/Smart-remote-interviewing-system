/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import './scss/listing.scss';

const PositionCard = (props) => {
  const renderExpired = (pos) => {
    const second = pos.expiryDate;
    if (new Date().getTime() > new Date(second).getTime()) {
      return <p className="expired">expired</p>;
    } else {
      return null;
    }
  };

  const Dates = props.positions.map((position) => {
    let nowDate = new Date(position.expiryDate);
    let date =
      nowDate.getFullYear() +
      '-' +
      (nowDate.getMonth() + 1) +
      '-' +
      nowDate.getDate();
    return date;
  });

  return (
    <div className="PositionCard">
      <ul className="positions-list">
        {props.positions.map((position, index) => (
          <Card key={index} className="positioncard">
            <img
              src={props.backgrounds[Math.floor(Math.random() * 26)]}
              className="photo"
            />
            <Link
              to={`/position/${position.positionName}$${position.jobListingId}`}
              className="pos_name"
              title={position.name}
            >
              {position.positionName}
            </Link>
            {renderExpired(position)} <br />
            <p htmlFor="expirydate" className="labels">
              Expiry Date:
            </p>
            <p name="expirydate" className="pos_expirydate">
              {Dates[index]}
            </p>{' '}
            <br></br>
            <p htmlFor="candidatesNo" className="labels">
              Candidates:
            </p>
            <p name="candidatesNo" className="pos_CandidatesNo">
              {position.invitationsNumber}
            </p>{' '}
            <br></br>
            <p htmlFor="finishedinterviews" className="labels">
              Interviews:
            </p>
            <p name="finishedinterviews" className="pos_Finishedinterviews">
              {position.interviewsNumber}
            </p>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default PositionCard;
