import React, { useState, useRef } from 'react';
import './scss/select-position.scss';
import Card from '../components/Card';
import QuestionsPage from './AddQuestiion';
import NavBar from '../components/NavBar';
//import {Link} from 'react-router-dom'
import SideMenu from '../components/SideMenu';

const PositionForm = () => {
  const submitHandler = (e) => e.preventDefault();
  const [inputfieldsToAdd, setInputfieldsToAdd] = useState(0);
  const [committedFieldsToAdd, setCommittedFieldsToAdd] = useState(0);
  const sideMenu = useRef(null);

  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');

  return (
    <div>
      <NavBar
        handleToggleButtonClick={handleToggleButtonClick}
        burgerButton={true}
      />
      <SideMenu ref={sideMenu} />
      <Card className="cardQuestion top-margin">
        <form onSubmit={submitHandler} className="Selectingform">
          <input
            className="Qtext"
            type="text"
            placeholder="Position Name"
            required
          />
          <input
            className="Qtext"
            type="number"
            placeholder="Questions Number"
            onChange={(e) => setInputfieldsToAdd(parseInt(e.target.value))}
            required
          />

          <button
            className="Next"
            onClick={() => {
              setCommittedFieldsToAdd(inputfieldsToAdd);
            }}
          >
            Next
          </button>
        </form>
      </Card>
      <QuestionsPage counter={committedFieldsToAdd} />
    </div>
  );
};
export default PositionForm;
