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
import AddQues from './pages/AddQues';
import InvitationPage from './pages/inviteUserPage';
import InviteUser from './components/InviteApplicant';

const mockUserObject = {
  userId: 'ABC123',
  token: 'aiwdjssqwijeoqiweoqu2398192381123',
  firstName: 'Mohammed',
  lastName: 'Moussa',
  CompanyName: 'Mentor',
  email: 'mm9079381@gmail.com',
  avatarURL: avatar,
};

const UserContext = React.createContext();

function App() {
  const [authUser, setAuthUser] = useState(mockUserObject);
  return (
    <>
      <UserContext.Provider value={{ authUser, setAuthUser }}>
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
        <Route path="/selectposition">
          <PositionForm />
        </Route>
        <Route path="/addquestions">
          <QuestionsPage />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/add">
          <AddQues />
        </Route>
        <Route path="/invite">
          <InvitationPage />
        </Route>
      </UserContext.Provider>
    </>
  );
}

export { App, UserContext };
export default App;
