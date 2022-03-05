import React, { useRef } from 'react';
import Card from './Card';
import './scss/evaluate.scss';
const EvaluationCard = React.forwardRef((props, ratings) => {
  console.log(props.answers);
  return (
    <div ref={ratings}>
      <ul>
        {props.answers.map((answer, index) => (
          <li key={index}>
            <Card className="evaluation_card">
              <p className="question-title">
                Question{index + 1}: {answer.statement}
              </p>
              <div className="evaluate_video">
                <video width="83%" height="250" controls>
                  <source src={answer.link} />
                </video>
              </div>
              <label className="rate-label">Rate Question:</label>
              <input
                type="text"
                placeholder="Rate from 0% to 100%"
                className="evaluation-rate"
              />
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
});
export default EvaluationCard;
