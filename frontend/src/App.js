import { Route } from 'react-router-dom';
import Landingpage from './pages/LandingPage.js';
import Counterpage from './pages/Questions';
import React, { useEffect } from 'react';
import ImageSlider from './pages/ImageSlider.js';
import './App.css';
import Videopage from './pages/video.js';

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
      <Route path="/" exact>
        <Landingpage />
      </Route>
      <Route path="/question">
        <Counterpage />
      </Route>
      <Route path="/instructions">
        <ImageSlider />
      </Route>
      <Route path="/Interview"> 
        <Videopage/>
      </Route>
    </>
  );
}

export default App;
