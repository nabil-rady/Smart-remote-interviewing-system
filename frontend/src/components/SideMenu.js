import React, { useContext, useState, useEffect } from 'react';
import './scss/side-menu.scss';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import { HRURL } from '../API/APIConstants';
import { TailSpin } from 'react-loader-spinner';
import handleAPIError from '../utils/APIErrorHandling';
const BurgerMenu = React.forwardRef((props, sideMenu) => {
  const authUser = useContext(UserContext).authUser;
  const setAuthUser = useContext(UserContext).setAuthUser;
  const [notifications, setNotifications] = useState();
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
  // const fetchNotifications = () => {
  //   return fetch(`${HRURL}/job-listing/notifications`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: authUser.token,
  //     },
  //   });
  // };

  // useEffect(() => {
  //   const setFetchedAnswers = async () => {
  //     const response = await fetchNotifications();
  //     const data = await response.json();
  //     if (response.status === 200) {
  //       console.log(data);
  //       setNotifications(data.notifications);
  //     } else {
  //       handleAPIError(
  //         response.status,
  //         data,
  //         () => {},
  //         () => setAuthUser(null)
  //       );
  //     }
  //   };
  //   setFetchedAnswers();
  // }, []);
  return (
    <div className="burger-wrapper">
      <div className="burger_container" ref={sideMenu}>
        <div className="navbar">
          <div className="nav_header">Notifications</div>

          {notifications ? (
            <ul className="nav_list">
              <li className="nav_item">
                <a href="/Home" className="nav_link">
                  Home
                </a>
              </li>
              <li className="nav_item">
                <a href="/evaluate" className="nav_link">
                  Evaluate
                </a>
              </li>
              <li className="nav_item">
                <a href="/logout" className="nav_link">
                  Logout
                </a>
              </li>
            </ul>
          ) : (
            <div
              style={{
                position: 'absolute',
                top: 'calc(50vh - 40px)',
                left: 'calc(50vw - 40px)',
              }}
            >
              <TailSpin color="hsl(215deg, 79%, 42%)" height={80} width={80} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default BurgerMenu;
