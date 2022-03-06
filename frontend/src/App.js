import { Route } from 'react-router-dom';

import PublicRoute from './Routes/PublicRoute';
import PrivateRoute from './Routes/PrivateRoute';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import TakeInterviewPage from './pages/TakeInterview';
import avatar from './user.jpg';
import AddQues from './pages/AddQues';
import InvitationPage from './pages/inviteUserPage';
import ChangePassword from './pages/ChagePass';
import EvaluationPage from './pages/Evaluate';
import NotificationPage from './pages/NotificationsPage';
import AddPosition from './pages/AddPosition';
import Dashboard from './pages/Dashboard';
import ListingPage from './pages/Listingpage';
import InterviewPage from './pages/InterviewPage';
import PositionPage from './pages/PositionPage';
import PositionDetails from './pages/PositionDetails';
import IntroPage from './pages/IntroPage';
import ViewApplicants from './pages/viewApplicants';
import ApplicantDetails from './pages/applicantDeteils';
import NewLanding from './pages/newLandingpage';
import WelcomePage from './pages/WelcomePage';
import NotificationTest from './pages/TestNotification';

// const mockUserObject = {
//   userId: 'ABC123',
//   token: 'aiwdjssqwijeoqiweoqu2398192381123',
//   password: '123456789',
//   firstName: 'Mohammed',
//   lastName: 'Moussa',
//   CompanyName: 'Mentor',
//   email: 'mm9079381@gmail.com',
//   PhoneCode: '02',
//   PhoneNo: '01125894119',
//   emailConfirmed: false,
// };

const UserContext = React.createContext();
const LoadingContext = React.createContext();

function App() {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(authUser));
  }, [authUser]);
  const [loading, setLoading] = useState(false);
  const isVerified = authUser?.emailConfirmed;

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
              path="/interview"
              exact
            >
              <TakeInterviewPage />
            </PublicRoute>
            {/* <PrivateRoute isAuthenticated={!!authUser} path="/selectposition" exact>
            <PositionForm />
          </PrivateRoute> */}
            {/* <Route path="/addquestions">
            <QuestionsPage />
          </Route> */}
            {/* <PrivateRoute isAuthenticated={!!authUser} path="/profile" exact>
            <Profile />
          </PrivateRoute> */}
            <PrivateRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/add"
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
            {/* <PrivateRoute isAuthenticated={!!authUser} path="/notifications" exact>
            <NotificationPage />
          </PrivateRoute> */}
            <PrivateRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/positions"
              exact
            >
              <AddPosition />
            </PrivateRoute>
            <PublicRoute
              isAuthenticated={!!authUser}
              isVerified={isVerified}
              path="/video/:interviewId"
              exact
            >
              <InterviewPage />
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
              isVerified={isVerified}
              path="/test"
              exact
            >
              <NotificationTest />
            </PrivateRoute>
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
