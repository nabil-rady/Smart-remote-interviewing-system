import React, { useEffect, useState } from 'react';
import Card from './Card';
import './scss/listing.scss';
const PositionCard = (props) => {
  const exp = [];
  const expired = (pos) => {
    let second = pos.expirydate;
    if (new Date().getTime() > new Date(second).getTime()) {
      return <p className="expired">expired</p>;
    } else {
      return null;
    }
  };
  useEffect(() => {
    expired(props.positions);
  });
  return (
    <div className="PositionCard">
      <ul className="Position-list">
        {props.positions.map((position, index) => (
          <Card className="positioncard">
            <img
              src={props.backgrounds[Math.floor(Math.random() * 30)]}
              className="photo"
            />
            <p className="pos_name">{position.name}</p>
            {expired(position)} <br></br>
            <p htmlFor="expirydate" className="labels">
              Expiry Date:
            </p>
            <p name="expirydate" className="pos_expirydate">
              {position.expirydate}
            </p>{' '}
            <br></br>
            <p htmlFor="candidatesNo" className="labels">
              Candidates:
            </p>
            <p name="candidatesNo" className="pos_CandidatesNo">
              {position.CandidatesNo}
            </p>{' '}
            <br></br>
            <p htmlFor="finishedinterviews" className="labels">
              Interviews:
            </p>
            <p name="finishedinterviews" className="pos_Finishedinterviews">
              {position.Finishedinterviews}
            </p>
          </Card>
        ))}
      </ul>
    </div>
  );
};
export default PositionCard;
