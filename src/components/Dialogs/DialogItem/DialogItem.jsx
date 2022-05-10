import React from "react";
import Style from './DialogItem.module.scss';
import { Link } from 'react-router-dom';
import avatar from '../../../assets/images/avatar.png'

export default function DialogItem(props) {

    return (
        <Link key={props.id} className={Style.dialogItem} to={`/messages/${props.id}`}>
            <img src={props.urlAvatr ? props.urlAvatr : avatar} className={props.urlAvatr ?Style.avatarDialog: Style.defaultAvatar} />
            <span className={Style.nameOfUser}>{props.name}</span>
        </Link>
    );
}