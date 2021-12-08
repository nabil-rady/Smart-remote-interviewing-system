import { useRef } from 'react';
import './scss/navbar-dropdown-menu.scss';


const NavbarDropDownMenu = () => {
    const menu = useRef();

    return (
        <div className="navbar-dropdown" ref={menu}>
            <h2 className="navbar-dropdown__logo">
                Vividly
            </h2>
            <nav className="navbar-dropdown__nav">
                <ul className="navbar-dropdown__nav__ul">
                    <li className="navbar-dropdown__nav__ul__li">
                        Sign up
                    </li>
                    <li className="navbar-dropdown__nav__ul__li">
                        Login
                    </li>
                    <li className="navbar-dropdown__nav__ul__li">
                        Take Interview
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavbarDropDownMenu;
