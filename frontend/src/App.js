import { Route } from 'react-router-dom';
import Landingpage from './pages/landingpage.js';
import Counterpage from './pages/questions';
import React, { useEffect } from 'react';
import Imageslider from './pages/imageSlider.js';

function App() {
  useEffect(() =>
    document.addEventListener('scroll', () => {
      const navbar = document.querySelector('.Container');
      if (window.scrollY > 0) navbar.style = `background-color: white`;
      else {
        navbar.style = `background:transparent`;
      }
    })
  );
  return (
    <>
      <Route path="/Home">
        <Landingpage />
      </Route>
      <Route path="/question">
        <Counterpage />
      </Route>
      <Route path="/Instructions">
        <Imageslider />
      </Route>
    </>
  );
}

export default App;
