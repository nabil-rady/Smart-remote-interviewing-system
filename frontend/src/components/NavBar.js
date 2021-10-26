import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import MobileBurgerButtons from './MobileBurgerButtons';
import './scss/navbar.scss';

const NavBar = (props) => {
  const authUser = useContext(UserContext).authUser; // Object or null
  const isLoggedIn = !!authUser;
  return (
    <header className="header">
      <MobileBurgerButtons />
      <div className="header__logo">
        <Link to="/">Hire Mi</Link>
      </div>
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
