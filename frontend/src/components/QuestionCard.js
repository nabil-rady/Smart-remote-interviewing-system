/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Card from './Card';
import delIcon from '../components/SVGs/delete.svg';
import './scss/QuestionCard.scss';
import '../pages/scss/Add.scss';

const QuestionCard = (props) => {
  return (
    <>
      <Card className="label-card">
        <h2 className="question-label">Question {props.number} </h2>
        {props.numberOfQuestions !== 1 && (
          <img
            className="delete"
            id="1"
            src={delIcon}
            onClick={() => props.deleteHandler(props.number)}
          />
        )}
      </Card>
      <Card className="card-question">
        <input
          type="text"
          placeholder="Full Question"
          className="question-text"
          value={props.fullQuestion}
          onChange={(e) => props.fullQuestionHandler(e, props.number)}
        />

        <input
          type="number"
          name="timeToRead"
          className="read-select"
          placeholder="Time To Think"
          value={props.timeToThink}
          onChange={(e) => props.timeToThinkHandler(e, props.number)}
        />
        <input
          type="number"
          name="timeToAnswer"
          className="answer-select"
          placeholder="Time To Answer"
          value={props.timeToAnswer > 10 ? 10 : props.timeToAnswer}
          onChange={(e) => props.timeToAnswerHandler(e, props.number)}
        />
        <input
          type="text"
          placeholder="Keywords ex:(keyword1,keyword2,keyword3,....)"
          className="question-keywords"
          value={props.keywords}
          onChange={(e) => props.keywordsHandler(e, props.number)}
        />
      </Card>
    </>
  );
};
export default QuestionCard;
