import React, { useContext,useState , useEffect } from 'react';
import { UserContext } from '../App';
import './scss/navbar.scss';
let loggin = false;
const NavBar = () => {
  const authUser = useContext(UserContext);
  const [user, setUser] = useState('inline-block');
  const [guest, setGuest] = useState('none');
  useEffect(() => {
    if (loggin) {
      setUser('inline-block')
      setGuest('none')
    }
    else {
      setUser('none')
      setGuest('inline-block')
    }
  });
  
  return (
    <header className="header">
      <div className="header__logo">Hire Mi</div>
      <nav className="header__navbar">
        
          <ul className="header__navbar__ul" style={{display:user}} >
            <li className="header__navbar__ul__li">
              {authUser.firstName} {authUser.lastName}
            </li>
            <li className="header__navbar__ul__li">
              <img
                className="user-avatar"
                src={authUser.avatarURL}
                alt="avatar"
              />
            </li>
          </ul>
        
          <ul className="guest__ul" style={{display:guest}}>
            <li className="guest__ul__li__login">
              login
            </li>
            <li className="guest__ul__li__signup">
              Signup
            </li>
            <li className="guest__ul__li__interview">
              Take Interview
            </li>
          </ul>
        
      </nav>
    </header>
  );
};

export default NavBar;
