import React from "react";
import close from '../../../assets/images/close.png';
import Style from './ButtonClose.module.scss'

export default function ButtonClose(props){
    const closeShowMessage = () => {
        props.setShowNewMessage(false);
    }
    return (
        <button onClick={closeShowMessage} type="button" className={Style.closeButton}><img src={close} /></button>
    );
}