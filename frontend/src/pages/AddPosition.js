import React, { useState } from 'react';
import Nav from '../components/NavBar';
import { count } from './SelectPosition';
import { Link } from 'react-router-dom';
import './scss/Addposition.scss';
import NavBar from '../components/NavBar';
import PositionList from '../components/positionList';
// import Field from '../components/Field';

function AddPosition(props) {
  const positions = [
    'Software',
    'Machine learning',
    'Web Developer',
    'Account Manager',
  ];
  return (
    <div>
      <NavBar />
      <PositionList positions={positions} />
      <button className="addposition">
        <Link to="/add">Add Position</Link>
      </button>
    </div>
  );
}

export default AddPosition;
