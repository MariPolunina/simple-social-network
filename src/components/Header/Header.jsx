import React from "react";
import { Link } from "react-router-dom";
import Style from './Header.module.scss';
import logOutImg from '../../assets/images/free-icon-font-sign-out-3917770.png'
import menu from '../../assets/images/menu.png'

function Header(props) {
    const handleLogOut = () => {
        props.LogoutTC();
    }
    return (
        <header className={Style.header}>
            <Link to='/menu' className={Style.showMenu} >
                <img src={menu}/>
            </Link>
            {props.isAuth ?
                <div className={Style.aboutLogin}>
                    <p className={Style.loginInstriction}>{props.login}</p>
                    <button type="submit" onClick={handleLogOut} value='LogOut'><img src={logOutImg} /></button>
                </div>
                : ''}
        </header>);
}
export default Header;