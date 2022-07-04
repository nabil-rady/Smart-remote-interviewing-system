import React from 'react';
import './scss/NotificationCard.scss';
import Card from './Card';
import './scss/positionCard.scss';

const PositionForm = (props) => {
  return (
    <Card className="position-card">
      <h2 className="position-card-title">Position details</h2>
      <label htmlFor="position-name">Position name</label>
      <input
        type="text"
        placeholder="Position Name"
        className="position-name"
        value={props.positionName}
        id="position-name"
        onChange={(e) => props.positionNameHandler(e)}
      />
      <label htmlFor="expiry-date">Expiry date</label>
      <input
        type="date"
        className="expiry-date"
        placeholder="Expiry Date"
        value={props.expiryDate}
        onChange={(e) => props.expiryDateHandler(e, props.number)}
      />
    </Card>
  );
};

export default PositionForm;
