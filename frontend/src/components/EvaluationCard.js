import React, { useRef } from 'react';
import Card from './Card';
import './scss/evaluate.scss';
const EvaluationCard = React.forwardRef((props, ratings) => {
  return (
    <div ref={ratings}>
      <ul>
        {props.answers.map((answer, index) => (
          <li key={index}>
            <Card className="evaluation_card">
              <p className="question-title">
                Question{index + 1}: {answer.ques}
              </p>
              <div className="evaluate_video">
                <video width="83%" height="250" controls>
                  <source src={answer.ans} type="video/mp4" />
                  <source src={answer.ans2} type="video/ogg" />
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
