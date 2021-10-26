import React, { useState, useEffect } from 'react';
import Nav from '../components/NavBar';
import Question from '../counterComponents/Question';
import Counter from '../counterComponents/Counter';
function Counterpage() {
  const [ques, setQuestion] = useState('Your question will apear here...');
  useEffect(() =>
    document.addEventListener('click', () => {
      const btn = document.querySelector('.start');
      setQuestion('How Old Are You ?');
      if (btn) btn.style.display = 'none';
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
