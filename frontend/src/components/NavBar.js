import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import MobileBurgerButtons from './MobileBurgerButtons';
import './scss/navbar.scss';

const NavBar = (props) => {
  const authUser = useContext(UserContext).authUser; // Object or null
  const isLoggedIn = !!authUser;
  const [Accvisibility, setAccVisibility] = useState(false);
  const [btnVisibility, setBtnVisibility] = useState(true);
  useEffect(() => {
    if (props.verified) {
      setAccVisibility(true);
      setBtnVisibility(false);
    } else {
      setAccVisibility(false);
      setBtnVisibility(true);
    }
  });
  // const displayBurgerButton = () => {
  //   if (props.burgerButton === true) {
  //     return (
  //       Accvisibility && (
  //         <div id="toggle-icon" onClick={props.handleToggleButtonClick}>
  //           <div className="bar1"></div>
  //           <div className="bar2"></div>
  //           <div className="bar3"></div>
  //         </div>
  //       )
  //     );
  //   }
  //   return null;
  // };

  return (
    <header className="header">
      {Accvisibility &&<MobileBurgerButtons />}
      <div className="header__logo">
        <Link to="/">Hire Mi</Link>
      </div>
      {btnVisibility && (
        <button onClick={props.clickHandler} className="verify">
          Verify Your account
        </button>
      )}
      {Accvisibility && (
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
      )}
    </header>
  );
};

export default NavBar;
