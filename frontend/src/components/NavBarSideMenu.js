import React, { useContext, useState, useEffect, useRef } from 'react';
import './scss/navbar-sidemenu.scss';
import { Link } from 'react-router-dom';
import { requestForToken } from '../utils/firebase';
import { UserContext } from '../App';
import { APIURL } from '../API/APIConstants';
import handleError from '../utils/APIErrorHandling';
import { TailSpin } from 'react-loader-spinner';

const NavBarSideMenu = () => {
  const menu = useRef();
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser;
  const [registrationToken, setToken] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let token = await requestForToken();
      setToken(token);
    })();
  }, [registrationToken]);

  const logoutHandler = () => {
    let statusCode;
    setLoading(true);
    fetch(`${APIURL}/user/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authUser.token,
      },
      body: JSON.stringify({
        registrationToken,
      }),
    })
      .then((response) => {
        statusCode = response.status;
        return response.json();
      })
      .then((data) => {
        if (statusCode === 200) {
          setLoading(false);
          setAuthUser(null);
          localStorage.clear();
        } else {
          handleError(
            statusCode,
            data,
            () => {},
            () => setAuthUser(null)
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <div className="navbar-sidemenu" ref={menu}>
      <h2 className="navbar-sidemenu__logo">Vividly</h2>
      {authUser ? (
        <nav className="navbar-sidemenu__nav">
          <ul className="navbar-sidemenu__nav__ul">
            <li className="user-info-menu__nav__ul__li">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="user-info-menu__nav__ul__li">
              <Link to="/profile">Edit Profile</Link>
            </li>
            <div
              style={{
                display: 'flex',
              }}
            >
              <li
                className="user-info-menu__nav__ul__li"
                onClick={logoutHandler}
                style={{ borderBottom: 'none' }}
              >
                Logout
              </li>
              {loading && (
                <div
                  style={{
                    marginTop: '0.8rem',
                    width: '100%',
                    justifyContent: 'right',
                    marginLeft: 'calc(80% - 60px)',
                  }}
                >
                  <TailSpin
                    color="hsl(215deg, 79%, 42%)"
                    height={25}
                    width={25}
                  />
                </div>
              )}
            </div>
          </ul>
        </nav>
      ) : (
        <nav className="navbar-sidemenu__nav">
          <ul className="navbar-sidemenu__nav__ul">
            <li className="navbar-sidemenu__nav__ul__li">
              <Link to="/signup">Sign up</Link>
            </li>
            <li className="navbar-sidemenu__nav__ul__li">
              <Link to="/login">Login</Link>
            </li>
            <li className="navbar-sidemenu__nav__ul__li">
              <Link to="/interview">Take Interview</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default NavBarSideMenu;
