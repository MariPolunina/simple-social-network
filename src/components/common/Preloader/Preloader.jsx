import React from "react";
import Style from './Preloader.module.scss'
import preloader from "../../../assets/images/loader.gif"

export default function Preloader(props) {
    return (
        <div className={Style.preloaderBackground}>
            <img src={preloader} className={Style.center} />
        </div>
    );
}