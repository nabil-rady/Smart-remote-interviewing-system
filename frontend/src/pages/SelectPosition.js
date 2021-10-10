import React, { useState, useEffect } from 'react';
import './scss/SelectPosition.scss';
import Card from '../components/Card';
import QuestionsPage from './AddQuestiion';
import NavBar from '../components/NavBar';
//import {Link} from 'react-router-dom'
import BurgerMenu from '../components/BurgerMenu';

const PositionForm = () => {
  const submitHandler = (e) => e.preventDefault();
  const [inputfieldsToAdd, setInputfieldsToAdd] = useState(0);
  const [committedFieldsToAdd, setCommittedFieldsToAdd] = useState(0);
  useEffect(() => {
    const para = document.getElementById('toggle-icon');
    const burger = document.getElementById('big_container');
    para.addEventListener('click', () => {
      para.classList.toggle('rotate-icon');
      //const burger_container=document.querySelector("burger_container")
      burger.classList.toggle('change');
      //burger_container.classList.toggle("change2")
    });
  });

  return (
    <div>
      <NavBar />
      <BurgerMenu />
      <Card className="cardQuestion">
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
            onChange={(e) => setInputfieldsToAdd(parseInt(e.target.value, 10))}
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
