import React, { useContext, useEffect } from 'react';
import { UserContext } from '../App';
import './scss/navbar.scss';

const NavBar = (props) => {
  const authUser = useContext(UserContext).authUser; // Object or null
  const isLoggedIn = !!authUser;
  const displayBurgerButton = () => {
    if (props.burgerButton === true) {
      return (
        <div id="toggle-icon" onClick={props.handleToggleButtonClick}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      );
    }
    return null;
  };

  return (
    <header className="header">
      {displayBurgerButton()}
      <div className="header__logo">Hire Mi</div>
      <nav className="header__navbar">
        <ul className={`header__navbar__ul ${isLoggedIn ? '' : 'hidden'}`}>
          <li className="header__navbar__ul__li">
            <img
              className="user-avatar"
              src={authUser?.avatarURL}
              alt="avatar"
            />
          </li>
          <li className="header__navbar__ul__li">{authUser?.firstName}</li>
        </ul>

        <ul className={`guest__ul ${!isLoggedIn ? '' : 'hidden'}`}>
          <li className="guest__ul__li__interview">Take Interview</li>
          <li className="guest__ul__li__login">Login</li>
          <li className="guest__ul__li__signup">Sign Up</li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
