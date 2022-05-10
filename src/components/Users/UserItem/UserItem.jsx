import React from "react";
import { Link } from "react-router-dom";
import ButtonFollow from "../../common/ButtonFollow/ButtonFollow";
import ButtonWriteNewMessage from "../../common/ButtonWriteNewMessage/ButtonWriteNewMessage";
import Style from './UserItem.module.scss'
export default function UserItem(props) {
    return (
        <div className={Style.container}>
            <div className={Style.avatarInfo}>
                <Link to={`/profile/${props.id}`}>
                    <img src={props.url} className={props.isDefaultAvatar ? Style.defaultAvatar : Style.avatar} />
                </Link>

                <ButtonFollow followed={props.followed} 
                              followingInProgress={props.followingInProgress} 
                              id={props.id} 
                              setFollowingInProgress={props.setFollowingInProgress} changeFollowTC={props.changeFollowTC} 
                              changeUnfollowTC={props.changeUnfollowTC} 
                              textButton={props.textButton} />
                <ButtonWriteNewMessage 
                        isDefaultAvatar={props.isDefaultAvatar}
                        handleShowNewMessage={props.handleShowNewMessage}
                        url={props.url}
                        name={props.name}
                        id={props.id} />

            </div>
            <div className={Style.userInfo}>
                <p className={Style.login}>{props.name}</p>
                <p className={Style.status}>{props.status}</p>
            </div>
        </div>

    );
}
