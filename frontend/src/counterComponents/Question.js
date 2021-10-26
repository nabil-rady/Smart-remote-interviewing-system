import React from 'react';
import Card from '../components/Card';
import './scss/question.scss';

function Question(props) {
  return (
    <Card className="questioncard top-margin">
      <p className="question">{props.question}</p>
    </Card>
  );
}

export default Question;
