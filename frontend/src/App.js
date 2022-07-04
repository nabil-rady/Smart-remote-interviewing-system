import { Route } from 'react-router-dom';
import { requestForToken, onMessageListener } from './utils/firebase';
import PublicRoute from './Routes/PublicRoute';
import PrivateRoute from './Routes/PrivateRoute';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import NotificationCard from './components/NotificationCard';
import AddQues from './pages/AddQues';
import InvitationPage from './pages/inviteUserPage';
import ChangePassword from './pages/ChangePass';
import EvaluationPage from './pages/Evaluate';
import Dashboard from './pages/Dashboard';
import PositionPage from './pages/PositionPage';
import PositionDetails from './pages/PositionDetails';
import IntroPage from './pages/IntroPage';
import ViewApplicants from './pages/viewApplicants';
import ApplicantDetails from './pages/applicantDeteils';
import NewLanding from './pages/newLandingpage';
import WelcomePage from './pages/WelcomePage';
import FinishPage from './pages/FinishPage';
import ProfilePage from './pages/Profile';
import Interview from './pages/Interview';

const UserContext = React.createContext();
const LoadingContext = React.createContext();

function App() {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const [notification, setNotification] = useState({
    title: '',
    body: '',
  });
  const [show, setShow] = useState(false);
  requestForToken();
  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
    })
    .catch((err) => console.log('Failed: ', err));
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(authUser));
  }, [authUser]);
  const [loading, setLoading] = useState(false);
  const isVerified = authUser?.emailConfirmed;

  const removeNotification = () => setNotification(false);

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
            <NotificationCard
              notification={notification}
              removeNotification={removeNotification}
              showNotification={show}
            />
            <Route path="/" exact>
              <NewLanding />
            </Route>
            <PublicRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/login"
              exact
            >
              <LoginPage />
            </PublicRoute>
            <PublicRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/signup"
              exact
            >
              <SignUpPage />
            </PublicRoute>
            <PublicRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/finish"
              exact
            >
              <FinishPage />
            </PublicRoute>
            <PrivateRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/profile"
              exact
            >
              <ProfilePage />
            </PrivateRoute>
            <PrivateRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/addposition"
              exact
            >
              <AddQues />
            </PrivateRoute>
            <PrivateRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/invite/:listingId"
              exact
            >
              <InvitationPage />
            </PrivateRoute>
            <PrivateRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/changepass"
              exact
            >
              <ChangePassword />
            </PrivateRoute>
            <PublicRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/interview"
              exact
            >
              <Interview />
            </PublicRoute>
            <PrivateRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/dashboard"
              exact
            >
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/position/:positionNameAndId"
              exact
            >
              <PositionPage />
            </PrivateRoute>
            <PublicRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/intro/:interviewId"
              exact
            >
              <IntroPage />
            </PublicRoute>
            <PrivateRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/positiondetails/:positionNameAndId"
              exact
            >
              <PositionDetails />
            </PrivateRoute>
            <PrivateRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/view_applicants/:positionNameAndId"
              exact
            >
              <ViewApplicants />
            </PrivateRoute>
            <PrivateRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/applicant_details/:positionNameAndapplicantId"
              exact
            >
              <ApplicantDetails />
            </PrivateRoute>
            <PublicRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/welcome/:interviewId"
              exact
            >
              <WelcomePage />
            </PublicRoute>
            <PrivateRoute
              isAuthenticated={!!authUser}
              path="/evaluate/:applicantId"
            >
              <EvaluationPage />
            </PrivateRoute>
          </UserContext.Provider>
        </LoadingContext.Provider>
      </>
    );
  };

  return render();
}

export { App, UserContext, LoadingContext };
export default App;
