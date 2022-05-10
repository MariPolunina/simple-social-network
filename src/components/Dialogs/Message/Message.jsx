import React from "react";
import Style from './Message.module.scss'
import classNames from "classnames";

let cx = classNames.bind(Style);
export default function Message(props) {
    return (
        <div className={Style.messageForm}>
            <li key={props.id} className={cx({[Style.messageItem]:true,[Style.myMessage]:props.fromMe})}>{props.message}</li>
        </div>
    );
}