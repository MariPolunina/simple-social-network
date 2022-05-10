import React from "react";
import { Link } from "react-router-dom";
import Style from './Navbar.module.scss';
import classNames from "classnames";

function Navbar(props) {
    return (
        <AllMenu addClass={Style.navContainer} />
    );
}
export default Navbar;

export function AllMenu(props) {
    let cx = classNames.bind(Style)
    return (
        <nav className={cx(props.addClass, Style.menuContainer)}>
            <Link to="/profile" className={Style.link}>Profile</Link>
            <Link to="/dialogs" className={Style.link}>Messages</Link>
            <Link to="/friends" className={Style.link}>Friends</Link>
            <Link to="/users" className={Style.link}>Find users</Link>
        </nav>
    );
}

export function BigMenu(props) {
    return (<AllMenu addClass={Style.bigMenu} />)
}
