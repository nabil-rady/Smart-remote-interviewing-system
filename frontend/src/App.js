import { Route } from 'react-router-dom';

import PublicRoute from './Routes/PublicRoute';
import PrivateRoute from './Routes/PrivateRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CounterPage from './pages/Questions';
import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import ImageSlider from './pages/ImageSlider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import InterviewPage from './pages/TakeInterview';
import avatar from './user.jpg';
import AddQues from './pages/AddQues';
import InvitationPage from './pages/inviteUserPage';
import ChangePassword from './pages/ChagePass';
import EvaluationPage from './pages/Evaluate';
import NotificationPage from './pages/NotificationsPage';
import AddPosition from './pages/AddPosition';
import Dashboard from './pages/Dashboard';
import ListingPage from './pages/Listingpage';
import WebcamStreamCapture from './pages/interviewPage';
import PositionPage from './pages/PositionPage';
import PositionDetails from './pages/PositionDetails';
import IntroPage from './pages/IntroPage';
import ViewApplicants from './pages/viewApplicants';
import ApplicantDetails from './pages/applicantDeteils';
import BeforeInterviewPage from './pages/BeforeInterviewPage';
import NewLanding from './pages/newLandingpage';
const mockUserObject = {
  userId: 'ABC123',
  token: 'aiwdjssqwijeoqiweoqu2398192381123',
  password: '123456789',
  firstName: 'Mohammed',
  lastName: 'Moussa',
  CompanyName: 'Mentor',
  email: 'mm9079381@gmail.com',
  PhoneCode: '02',
  PhoneNo: '01125894119',
  avatarURL: avatar,
};

const UserContext = React.createContext();
const LoadingContext = React.createContext();

function App() {
  const [authUser, setAuthUser] = useState(mockUserObject);
  const [loading, setLoading] = useState(false);

  const render = () => {
    if (loading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <TailSpin color="hsl(215deg, 79%, 42%)" height={80} width={80} />
        </div>
      );
    }
    return (
      <>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <UserContext.Provider value={{ authUser, setAuthUser }}>
            <Route path="/" exact>
              <LandingPage />
            </Route>
            <PublicRoute isAuthenticated={!!authUser} path="/login" exact>
              <LoginPage />
            </PublicRoute>
            <PublicRoute isAuthenticated={!!authUser} path="/signup" exact>
              <SignUpPage />
            </PublicRoute>
            <PrivateRoute isAuthenticated={!!authUser} path="/interview" exact>
              <InterviewPage />
            </PrivateRoute>
            <PrivateRoute isAuthenticated={!!authUser} path="/before-interview">
              <BeforeInterviewPage />
            </PrivateRoute>
            <PrivateRoute isAuthenticated={!!authUser} path="/question" exact>
              <CounterPage />
            </PrivateRoute>
            <PrivateRoute
              isAuthenticated={!!authUser}
              path="/instructions"
              exact
            >
              <ImageSlider />
            </PrivateRoute>
            {/* <PrivateRoute isAuthenticated={!!authUser} path="/selectposition" exact>
            <PositionForm />
          </PrivateRoute> */}
            {/* <Route path="/addquestions">
            <QuestionsPage />
          </Route> */}
            {/* <PrivateRoute isAuthenticated={!!authUser} path="/profile" exact>
            <Profile />
          </PrivateRoute> */}
            <PrivateRoute isAuthenticated={!!authUser} path="/add" exact>
              <AddQues />
            </PrivateRoute>
            <PrivateRoute isAuthenticated={!!authUser} path="/invite" exact>
              <InvitationPage />
            </PrivateRoute>
            <PrivateRoute isAuthenticated={!!authUser} path="/changepass" exact>
              <ChangePassword />
            </PrivateRoute>
            {/* <PrivateRoute isAuthenticated={!!authUser} path="/notifications" exact>
            <NotificationPage />
          </PrivateRoute> */}
            <PrivateRoute isAuthenticated={!!authUser} path="/positions" exact>
              <AddPosition />
            </PrivateRoute>
            <PrivateRoute isAuthenticated={!!authUser} path="/video" exact>
              <WebcamStreamCapture />
            </PrivateRoute>
            <PrivateRoute isAuthenticated={!!authUser} path="/dashboard" exact>
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute isAuthenticated={!!authUser} path="/listing" exact>
              <ListingPage />
            </PrivateRoute>
            <PrivateRoute isAuthenticated={!!authUser} path="/position" exact>
              <PositionPage />
            </PrivateRoute>
            <PrivateRoute isAuthenticated={!!authUser} path="/intro" exact>
              <IntroPage />
            </PrivateRoute>
            <PrivateRoute
              isAuthenticated={!!authUser}
              path="/positiondetails"
              exact
            >
              <PositionDetails />
            </PrivateRoute>
            <PrivateRoute
              isAuthenticated={!!authUser}
              path="/view_applicants"
              exact
            >
              <ViewApplicants />
            </PrivateRoute>
            <PrivateRoute
              isAuthenticated={!!authUser}
              path="/applicant_details"
              exact
            >
              <ApplicantDetails />
            </PrivateRoute>
            <PrivateRoute isAuthenticated={!!authUser} path="/new" exact>
              <NewLanding />
            </PrivateRoute>
            {/* <PrivateRoute isAuthenticated={!!authUser} path="/evaluate">
            <EvaluationPage />
          </PrivateRoute> */}
          </UserContext.Provider>
        </LoadingContext.Provider>
      </>
    );
  };

  return render();
}

export { App, UserContext, LoadingContext };
export default App;
