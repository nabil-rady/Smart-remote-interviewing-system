import React, { useEffect, useState } from 'react';
import Card from './Card';
import './scss/details.scss';

const Details = (props) => {
  const [expiry, setExpiry] = useState();
  useEffect(() => {
    const eDate = props.position.expiryDate;
    if (new Date().getTime() > new Date(eDate).getTime()) {
      setExpiry('red');
    } else {
      setExpiry('green');
    }
  }, []);
  return (
    <>
      <p className="pName">{props.position.positionName}</p>
      <p style={{ backgroundColor: expiry }} className="expiryDate">
        Expiry Date: {props.position.expiryDate}
      </p>
      <ul className="questionsList">
        {props.position.questions.map((question, index) => (
          <Card key={index} className="questionsCard">
            <p className="questionStatement">{question.statement}</p>
            <div className="detailsContainer">
              <p htmlFor="expirydate" className="detailsLabels">
                Thinking Time:
              </p>
              <p name="expirydate" className="pos_expirydate">
                {question.timeToThink}
              </p>{' '}
              <br></br>
              <p htmlFor="candidatesNo" className="detailsLabels">
                Answer Time:
              </p>
              <p name="candidatesNo" className="pos_CandidatesNo">
                {question.timeToAnswer}
              </p>{' '}
              <br></br>
              <p htmlFor="keywords" className="detailsLabels">
                Keywords:
              </p>
              {question.keywords.map((keyword, index) => (
                <p name="keywords" className="keywords">
                  {keyword}
                </p>
              ))}
            </div>
          </Card>
        ))}
      </ul>
    </>
  );
};
export default Details;
