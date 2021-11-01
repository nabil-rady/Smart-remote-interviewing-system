import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import './scss/positionList.scss';

const PositionList = (props) => {
  return (
    <>
      <ul>
        {props.positions.map((position, index) => (
          <li key={index}>
            <Card className="Position">
              <h2 className="PositionName">
                <Link to="/invite">{position}</Link>
              </h2>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PositionList;
