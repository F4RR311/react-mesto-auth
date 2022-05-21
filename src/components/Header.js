import React from "react";
import logo from "../images/mesto-logo.svg";

const Header = () => {
    return (

        <div className="header">
            <img className="header__logo" src={logo}
                 alt="Логотип Mesto"/>

        </div>

    )


}
export default Header;