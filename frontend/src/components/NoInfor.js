import React from 'react';
import './scss/NoInfo.scss';
import waitImg from './SVGs/wait1.png';
import welcomeImg from './SVGs/welcome.png';

const NoInfo = (props) => {
  return (
    <div>
      <img
        src={props.page == 'evaluate' ? waitImg : welcomeImg}
        alt="bell"
        className="NoInfo_img"
      />
      <p className="NoInfo-title">Welcome to Vividly</p>
      <p className="NoInfo-text">
        {props.page == 'evaluate'
          ? 'No Applicants To Evaluate Yet. Please Wait For Applicants To Finish Interviews'
          : 'No Positions Yet. Please Add Some Positions'}
      </p>
    </div>
  );
};

export default NoInfo;
