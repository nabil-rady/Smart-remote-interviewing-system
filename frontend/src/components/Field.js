import React from 'react';
import Card from './Card';
import './scss/field.scss';

const Field = (props) => {
  return (
    <Card className="card_Question">
      <p className="Question_label">{props.id}</p>

      <input
        type="text"
        placeholder="Full Question"
        className="Question_text"
      />

      <div>
        <p htmlFor="Time_to_read" className="label">
          Time To Read The Question
        </p>
        <select name="Time_to_read" className="read_select">
          <option value="1">15 seconds</option>
          <option value="2">30 seconds </option>
          <option value="3">1 minute</option>
          <option value="3">Unlimited</option>
        </select>
      </div>

      <div>
        <p className="label">Time To Answer</p>
        <select name="Time_to_answer" className="answer_select">
          <option value="1">1 Minute</option>
          <option value="2">2 Minutes </option>
          <option value="3">3 minutes</option>
          <option value="3">Unlimited</option>
        </select>
        <input
          type="text"
          placeholder="Key Words"
          className="Question_Keywords"
        />
      </div>
    </Card>
  );
};

export default Field;
