import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ children, isVerified, isAuthenticated, ...rest }) => {
  if (!isAuthenticated) {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          if (location === '/signup') {
            return (
              <Redirect
                to={{
                  pathname: '/dashboard',
                  state: { from: location },
                }}
              />
            );
          } else {
            return children;
          }
        }}
      />
    );
  }
  if (isVerified) {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: '/dashboard',
              state: { from: location },
            }}
          />
        )}
      />
    );
  }
  return <Route {...rest} render={() => children} />;
};
export default PublicRoute;
