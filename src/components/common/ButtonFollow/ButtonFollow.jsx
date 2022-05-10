import React from "react";
import Style from './ButtonFollow.module.scss'

export default function ButtonFollow(props) {
    const handleClickFollow = (id, followed) => {
        props.setFollowingInProgress(true, id);
        if (!followed) {
            props.changeFollowTC(id)
        }
        else {
            props.changeUnfollowTC(id);
        }
    }
    return (
        <button type="button" className={props.followed ? Style.unfollowButton : Style.followButton} disabled={props.followingInProgress.some(id => id == props.id)} onClick={() =>  handleClickFollow(props.id, props.followed) }>{props.textButton}</button>
    );
}