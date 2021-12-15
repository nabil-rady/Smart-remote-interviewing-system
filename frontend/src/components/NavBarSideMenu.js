import { useRef } from 'react';
import './scss/navbar-sidemenu.scss';

const NavBarSideMenu = () => {
  const menu = useRef();

  return (
    <div className="navbar-sidemenu" ref={menu}>
      <h2 className="navbar-sidemenu__logo">Vividly</h2>
      <nav className="navbar-sidemenu__nav">
        <ul className="navbar-sidemenu__nav__ul">
          <li className="navbar-sidemenu__nav__ul__li">Sign up</li>
          <li className="navbar-sidemenu__nav__ul__li">Login</li>
          <li className="navbar-sidemenu__nav__ul__li">Take Interview</li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBarSideMenu;
