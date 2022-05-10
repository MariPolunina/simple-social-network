import React from "react";
import Style from './ButtonWriteNewMessage.module.scss'

export default function ButtonWriteNewMessage(props) {
    return (
        <button type="button" onClick={() => props.handleShowNewMessage(props.isDefaultAvatar ? null : props.url, props.name, props.id)} className={Style.writeMessage}>Write message</button>
    )
}