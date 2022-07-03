import React from 'react';
import Card from './Card';
import { TailSpin } from 'react-loader-spinner';
import formatDate from '../utils/formatDate';

import './scss/details.scss';

const Details = (props) => {
  return (
    <>
      {props.position ? (
        <>
          <h1 className="position-title">
            Position: {props.position.positionName}
          </h1>
          <div className="position-body">
            <h2 className="expiryDate">
              Expiry Date:{' '}
              <span
                style={{
                  fontSize: '1.4rem',
                }}
              >
                {formatDate(props.position.expiryDate)}
              </span>
            </h2>
            <h2 className="questions-title">Questions:</h2>
            {props.position.questions.map((question, index1) => (
              <Card key={index1} className="questionsCard">
                <div className="detailsContainer">
                  <div className="question-body">
                    <p className="details-labels question-number">{`Q${
                      index1 + 1
                    }:`}</p>
                    <p className="details-values question-statement">
                      {question.statement}
                    </p>
                  </div>
                  <p className="details-labels">Thinking Time:</p>
                  <p className="details-values">{question.timeToThink}</p>
                  <br></br>
                  <p className="details-labels">Answer Time:</p>
                  <p className="details-values">{question.timeToAnswer}</p>
                  <br></br>
                  <p htmlFor="keywords" className="details-labels">
                    Keywords:
                  </p>
                  {question.keywords.map((keyword, index2) => (
                    <p name="keywords" className="keywords" key={index2}>
                      {keyword}
                    </p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            top: 'calc(50vh - 40px)',
            left: 'calc(50vw - 40px)',
          }}
        >
          <TailSpin color="hsl(215deg, 79%, 42%)" height={80} width={80} />
        </div>
      )}
    </>
  );
};
export default Details;
