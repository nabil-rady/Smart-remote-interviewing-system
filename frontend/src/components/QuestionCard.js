/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import MultipleValueTextInput from 'react-multivalue-text-input';
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
        <label htmlFor="question-text">Question Statement</label>
        <input
          type="text"
          placeholder="Full Question"
          className="question-text"
          value={props.fullQuestion}
          id="question-text"
          onChange={(e) => props.fullQuestionHandler(e, props.number)}
        />
        <br></br>

        <label htmlFor="time-to-think">Time to think</label>
        <input
          type="number"
          name="timeToRead"
          className="read-select"
          placeholder="Time To Think"
          id="time-to-think"
          value={props.timeToThink}
          onChange={(e) => props.timeToThinkHandler(e, props.number)}
        />
        <br></br>

        <label htmlFor="time-to-answer">Time to answer</label>
        <input
          type="number"
          name="timeToAnswer"
          className="answer-select"
          placeholder="Time To Answer"
          id="time-to-answer"
          value={props.timeToAnswer > 10 ? 10 : props.timeToAnswer}
          onChange={(e) => props.timeToAnswerHandler(e, props.number)}
        />
        <br></br>

        <label htmlFor="question-keywords">Keywords</label>
        <MultipleValueTextInput
          onItemAdded={(_, allItems) =>
            props.keywordsHandler(props.number, allItems)
          }
          onItemDeleted={(_, allItems) =>
            props.keywordsHandler(props.number, allItems)
          }
          id="question-keywords"
          className="question-keywords"
          placeholder="Keywords seperated by commas"
        />
      </Card>
    </>
  );
};
export default QuestionCard;
