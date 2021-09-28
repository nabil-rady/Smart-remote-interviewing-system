import React, { useState, useEffect } from 'react';
import Nav from '../components/navBar';
import Question from '../counterComponents/question';
import Counter from '../counterComponents/counter';
function Counterpage() {
  const [ques, setQuestion] = useState('Your question will apear here...');
  useEffect(() =>
    document.addEventListener('click', () => {
      const btn = document.querySelector('.start');
      setQuestion('How Old Are You ?');
      btn.style.display = 'none';
    })
  );
  return (
    <div>
      <Nav />
      <Question question={ques} />
      <Counter />
    </div>
  );
}

export default Counterpage;
