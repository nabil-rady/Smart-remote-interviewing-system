import React from 'react';
//import dashboardImage from './SVGs/dashboard.png'
import './scss/Burger.scss';

const BurgerMenu = () => {
  return (
    <div id="big_container">
      <div className="burger_container">
        <div className="navbar">
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
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
