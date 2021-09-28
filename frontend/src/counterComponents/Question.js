import React from 'react';
import Card from '../components/Card';
import './css/question.css';

function Question(props) {
  return (
    <Card className="questioncard">
      <p className="question">{props.question}</p>
    </Card>
  );
}

export default Question;
