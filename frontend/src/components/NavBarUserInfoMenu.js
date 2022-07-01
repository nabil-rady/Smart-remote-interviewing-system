import React, { useContext, useState, useEffect } from 'react';
import './scss/navbar-user-info-menu.scss';
import { Link } from 'react-router-dom';
import { APIURL } from '../API/APIConstants';
import { UserContext } from '../App';
import handleError from '../utils/APIErrorHandling';
import { requestForToken } from '../utils/firebase';
import { TailSpin } from 'react-loader-spinner';
const NavBarUserInfoMenu = () => {
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser;
  const [registrationToken, setToken] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    let token = await requestForToken();
    setToken(token);
    console.log(registrationToken);
  });
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
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
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
    <div className="user-info-menu">
      <nav className="user-info-menu__nav">
        <ul className="user-info-menu__nav__ul">
          <li className="user-info-menu__nav__ul__li">
            <Link to="/dashboard">Dashboard</Link>{' '}
          </li>
          <li className="user-info-menu__nav__ul__li">
            <Link to="/profile">Edit Profile</Link>{' '}
          </li>
          <div className="flex">
            <li
              className="user-info-menu__nav__ul__li logoutUser"
              onClick={logoutHandler}
            >
              Logout
            </li>
            {loading && (
              <div
                style={{
                  marginLeft: '5rem',
                  marginTop: '1rem',
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
    </div>
  );
};

export default NavBarUserInfoMenu;
