import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import MobileBurgerButtons from './MobileBurgerButtons';
import NavBarSideMenu from './NavBarSideMenu';
import NavBarUserInfoMenu from './NavBarUserInfoMenu';
import './scss/utility.scss';
import './scss/navbar.scss';
import './scss/dashboard-navbar.scss';
import notification from './SVGs/notification.png';
const NavBar = (props) => {
  const authUser = useContext(UserContext).authUser; // Object or null
  const isLoggedIn = !!authUser;

  const handleClick = () => {
    const menu = document.querySelector('.navbar-sidemenu');
    const mobileBurgerButton = document.querySelector('.mobile-burger-button');
    menu.classList.toggle('clicked');
    mobileBurgerButton.classList.toggle('black');
  };

  return (
    <header className="Navheader">
      <MobileBurgerButtons handleClick={handleClick} />
      <NavBarSideMenu />
      <div className="header__logo">
        <Link
          to="/"
          className="Logo"
          style={{ fontFamily: 'Baskerville Old Face', fontSize: 'x-large' }}
        >
          Vividly
        </Link>
      </div>
      <img
        src={notification}
        className="notificationImg"
        onClick={props.handleToggleButtonClick}
      />
      <nav className="header__navbar">
        <ul
          tabIndex="-1"
          className={`header__navbar__ul user-info ${
            isLoggedIn ? '' : 'hidden'
          }`}
        >
          <NavBarUserInfoMenu />
          <svg
            className="user-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M20.822 18.096c-3.439-.794-6.641-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.732-13.678-5.081 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-2.979.688-3.178 2.143-3.178 4.663l.005 1.241h10.483l.704-3h1.615l.704 3h10.483l.005-1.241c.001-2.52-.198-3.975-3.177-4.663zm-8.231 1.904h-1.164l-.91-2h2.994l-.92 2z" />
          </svg>
          <li className="header__navbar__ul__li username">
            {authUser?.firstName}
          </li>
          <svg
            className="arrow-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
          </svg>
        </ul>

        <ul className={`guest__ul ${!isLoggedIn ? '' : 'hidden'}`}>
          <li className="guest__ul__li__interview">
            <Link to="/interview">Take Interview</Link>
          </li>
          <li className="guest__ul__li__login">
            <Link to="/login">Login</Link>
          </li>
          <li className="guest__ul__li__signup">
            <Link to="/login">SignUp</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
