import React, { useContext } from 'react';
import { UserContext } from '../App';
import './scss/navbar.scss';

const NavBar = () => {
  const authUser = useContext(UserContext);
  return (
    <header className="header">
      <div className="header__logo">
        Hire Mi
      </div>
      <nav className="header__navbar">
        <ul className="header__navbar__ul">
          <li className="header__navbar__ul__li">
            {authUser.firstName} {authUser.lastName}
          </li>
          <li className="header__navbar__ul__li">
            <img className="user-avatar" src={authUser.avatarURL} alt="avatar"/>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
