import { Route } from 'react-router-dom';
import Landingpage from './pages/LandingPage.js';
import Counterpage from './pages/Questions';
import React, { useEffect, useState } from 'react';
import ImageSlider from './pages/ImageSlider.js';
import './App.scss';

import avatar from './user.jpg';

const mockUserObject = {
  firstName: 'Mohammed',
  lastName: 'Moussa',
  avatarURL: avatar,
}

const UserContext = React.createContext();

function App() {
  const [authUser, setAuthUser] = useState(mockUserObject);
  return (
    <>
      <UserContext.Provider value={authUser}>
        <Route path="/" exact>
          <Landingpage />
        </Route>
        <Route path="/question">
          <Counterpage />
        </Route>
        <Route path="/instructions">
          <ImageSlider />
        </Route>
      </UserContext.Provider>
    </>
  );
}

export { App, UserContext };
export default App;
