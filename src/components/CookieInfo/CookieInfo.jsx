import React, { useState } from "react";
import Style from './CookieInfo.module.scss';
import cookieImg from '../../assets/images/cookie.png';
import ButtonClose from "../common/ButtonClose/ButtonClose";

function CookieInfo(props) {
    const [showCookie, setShowCookie] = useState(true);
    return (
        <div className={Style.cookieContainer}>
            {showCookie && <div className={Style.cookieInfo}>
                <img src={cookieImg} />
                <p className={Style.cookieMessage}>By using this website, you agree to our cookie policy.</p>
                <ButtonClose setShowNewMessage={setShowCookie} />
            </div>}
        </div>
    );
}

export default CookieInfo;