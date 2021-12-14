import './scss/navbar-user-info-menu.scss';

const NavBarUserInfoMenu = () => {
    return (
        <div className="user-info-menu">
            <nav className="user-info-menu__nav">
                <ul className="user-info-menu__nav__ul">
                    <li className="user-info-menu__nav__ul__li">
                        Dashboard
                    </li>
                    <li className="user-info-menu__nav__ul__li">
                        Edit Profile
                    </li>
                    <li className="user-info-menu__nav__ul__li">
                        Logout
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBarUserInfoMenu;
