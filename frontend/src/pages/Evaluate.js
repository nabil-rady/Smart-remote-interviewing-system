import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import EvaluationCard from '../components/EvaluationCard';
import './scss/evaluate.scss';
import vid1 from './videos/Bali in 8k ULTRA HD HDR - Paradise of Asia (60 FPS)_720P HD.mp4';
import vid2 from './videos/Beautiful Nature Around The World_720P HD.mp4';
import vid3 from './videos/Nature sounds Meditation forest sounds of birds singing relaxation - 4 minutes_720P HD.mp4';
const answers = [
  {
    ques: 'How are U ?',
    ans: vid1,
  },
  {
    ques: "What's your name ?",
    ans: vid2,
  },
  {
    ques: 'What do you like ?',
    ans: vid3,
  },
];

function EvaluationPage() {
  const ratings = useRef(null);
  const sideMenu = useRef(null);
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
  // const [ratings, setRatings] = useState([]);
  //   const ratingHandler = (e) => {
  //     setRatings([...ratings, e.target.value]
  //     );
  // };
  const clickHandler = () => {
    const ratingsArray = [];
    for (const rating of ratings.current.children) {
      console.log(rating);
    }
  };
  return (
    <>
      <NavBar
        handleToggleButtonClick={handleToggleButtonClick}
        burgerButton={true}
      />
      <SideMenu ref={sideMenu} />
      <EvaluationCard answers={answers} ref={ratings} />
      <button onClick={clickHandler} className="save-rating">
        Save
      </button>
    </>
  );
}

export default EvaluationPage;
