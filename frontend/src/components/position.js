import React from 'react';
import './scss/NotificationCard.scss';
import Card from './Card';
import './scss/positionCard.scss';
const PositionForm = (props) => {
  return (
    <Card className="position-card">
      <input
        type="text"
        placeholder="Position Name"
        className="position-name"
        value={props.positionName}
        onChange={(e) => props.positionNameHandler(e)}
      />

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
