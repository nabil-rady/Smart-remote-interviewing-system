import { Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CounterPage from './pages/Questions';
import React, { useEffect, useState } from 'react';
import ImageSlider from './pages/ImageSlider';
import './App.scss';
import InterviewPage from './pages/TakeInterview';
import avatar from './user.jpg';
import PositionForm from './pages/SelectPosition';
import QuestionsPage from './pages/AddQuestiion';
import Profile from './pages/Profile';

const mockUserObject = {
  firstName: 'Mohammed',
  lastName: 'Moussa',
  CompanyName: 'Mentor',
  Email: 'mm9079381@gmail.com',
  avatarURL: avatar,
};

//const mockUserObject = null;

const UserContext = React.createContext();

function App() {
  const [authUser, setAuthUser] = useState(mockUserObject);
  return (
    <>
      <UserContext.Provider value={authUser}>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/signup" exact>
          <SignUpPage />
        </Route>
        <Route path="/interview" exact>
          <InterviewPage />
        </Route>
        <Route path="/question">
          <CounterPage />
        </Route>
        <Route path="/instructions">
          <ImageSlider />
        </Route>
        <Route path="/SelectPosition">
          <PositionForm />
        </Route>
        <Route path="/AddQuestions">
          <QuestionsPage />
        </Route>
        <Route path="/Profile">
          <Profile />
        </Route>
      </UserContext.Provider>
    </>
  );
}

export { App, UserContext };
export default App;
