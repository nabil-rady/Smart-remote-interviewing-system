import React, { useEffect, useState } from 'react';
import Card from './Card';
import './scss/evaluate.scss';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const EvaluationCard = React.forwardRef((props, ratings) => {
  let emotionLabels = ['happy', 'sad', 'angry', 'surprise', 'neutral'];
  const getEmotions = (emotions, index) => {
    let emotion = [
      emotions.happy * 100,
      emotions.sad * 100,
      emotions.angry * 100,
      emotions.surprise * 100,
      emotions.neutral * 100,
    ];
    let chartData = [];
    chartData.push({
      labels: emotionLabels.map((label) => label),
      datasets: [
        {
          data: emotion.map((emotion) => emotion),
          backgroundColor: ['red', 'grey', 'green', 'yellow', 'purple'],
        },
      ],
    });
    return (
      <div>
        <Bar
          data={chartData[index]}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Emotions Results',
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    );
  };
  return (
    <div>
      <ul>
        {props.answers.map((answer, index) => (
          <li key={index}>
            <Card className="evaluation_card">
              <p className="question-title">
                Question{index + 1}: {answer.statement}
              </p>
              {getEmotions(answer.emotions, index)}
              <div className="dataContainer">
                <p htmlFor="email" className="detailsLabel">
                  OpenPose:
                </p>
                <p name="email" className="info">
                  {answer.openPose}
                </p>
              </div>
              <div className="dataContainer">
                <p htmlFor="email" className="detailsLabel">
                  Score:
                </p>
                <p name="email" className="info">
                  {answer.score}
                </p>
              </div>
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
                ref={ratings}
                onChange={props.changeHandler}
              />
            </Card>
          </li>
        ))}
      </ul>
      <button onClick={props.clickHandler} className="save-rating">
        Save
      </button>
    </div>
  );
});
export default EvaluationCard;
