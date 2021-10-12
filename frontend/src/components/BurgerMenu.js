import React, { useContext } from 'react';
//import dashboardImage from './SVGs/dashboard.png'
import './scss/Burger.scss';
import { UserContext } from '../App';

const BurgerMenu = () => {
  const authUser = useContext(UserContext);
  return (
    <div id="big_container">
      <div className="burger_container">
        <div className="navbar">
          <ul className="nav_list">
            <li className="nav_header">
              <div>
                <div className="letter">{authUser.firstName[0]}</div>
                <p className="name">
                  {authUser.firstName} {authUser.lastName}
                </p>
                <p className="email">{authUser.Email}</p>
              </div>
            </li>

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
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
