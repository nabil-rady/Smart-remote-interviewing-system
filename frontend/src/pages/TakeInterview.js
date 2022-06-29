import React from 'react';
import NavBar from '../components/NavBar';
import Interview from '../components/Interview';
import '../components/scss/utility.scss';
import './scss/Interview.scss';

function TakeInterviewPage(props) {
  return (
    <>
      <NavBar visible={false} />
      <Interview
        setLink={props.setLink}
        link={props.link}
        clickHandler={props.clickHandler}
        loading={props.loading}
      />
    </>
  );
}

export default TakeInterviewPage;
