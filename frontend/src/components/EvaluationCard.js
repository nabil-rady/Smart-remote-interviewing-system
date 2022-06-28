import React from 'react';
import Card from './Card';
import './scss/evaluate.scss';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { TailSpin } from 'react-loader-spinner';
Chart.register(...registerables);

const EvaluationCard = React.forwardRef((props, ratings) => {
  let emotionLabels = ['happy', 'sad', 'angry', 'surprise', 'neutral'];
  let chartData = [];
  let emotionScores = [];

  const getEmotions = (emotions, index) => {
    emotionScores.push([
      emotions.happy * 100,
      emotions.sad * 100,
      emotions.angry * 100,
      emotions.surprise * 100,
      emotions.neutral * 100,
    ]);
    chartData.push({
      labels: emotionLabels.map((label) => label),
      datasets: [
        {
          data: emotionScores[index].map((emotion) => emotion),
          backgroundColor: [
            'hsl(215deg, 79%, 42%)',
            'hsl(215deg, 79%, 42%)',
            'hsl(215deg, 79%, 42%)',
            'hsl(215deg, 79%, 42%)',
            'hsl(215deg, 79%, 42%)',
          ],
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
                onChange={props.changeHandler(index)}
              />
            </Card>
          </li>
        ))}
      </ul>
      {!props.loading && (
        <button onClick={props.clickHandler} className="save-rating">
          Save
        </button>
      )}
      {props.loading && (
        <div
          style={{
            top: 'calc(40vh - 40px)',
            marginLeft: 'calc(15% - 60px)',
            marginBottom: '1.5rem',
          }}
        >
          <TailSpin color="hsl(215deg, 79%, 42%)" height={60} width={60} />
        </div>
      )}
    </div>
  );
});

export default EvaluationCard;
