import React, { useContext } from 'react';
import './scss/side-menu.scss';
import { UserContext } from '../App';

const BurgerMenu = React.forwardRef((props, sideMenu) => {
  const authUser = useContext(UserContext).authUser;
  const handleToggleButtonClick = () =>
    sideMenu.current.classList.toggle('change');
  return (
    <div className="burger-wrapper">
      <div className="burger_container" ref={sideMenu}>
        <div className="navbar">
          <ul className="nav_list">
            <li className="nav_header">
              <div>
                <div style={{ display: 'flex', paddingBottom: '0.8rem' }}>
                  <div
                    className="burger-bars-wrapper"
                    onClick={handleToggleButtonClick}
                  >
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                  </div>
                  <div className="side-menu__header__logo">Hire Mi</div>
                </div>
                <div className="letter">{authUser?.firstName[0]}</div>
                <p className="name">
                  {authUser?.firstName} {authUser?.lastName}
                </p>
                <p className="email">{authUser?.email}</p>
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
});

export default BurgerMenu;
