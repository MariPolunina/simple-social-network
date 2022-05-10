import React, { useState } from "react";
import Style from './Post.module.scss'
import avatar from '../../../../assets/images/avatar.png';
import like from '../../../../assets/images/heart.png';
import classNames from "classnames";

let cx = classNames.bind(Style);
function Post(props) {
    const [iLike, setILike]=useState(props.iLike);
    let handleLikeChange=()=>{
        setILike(!iLike);
        iLike?props.changeLikeCount(props.likes-1, props.id):props.changeLikeCount(props.likes+1, props.id);
    }
    return (
        <div className={Style.postContainer} >
            <div className={Style.post}>
                <div className={Style.aboutUser}>
                    <img className={Style.logo} src={avatar} />
                    <p>{props.sender}</p>
                </div>
                <div className={Style.aboutMessage}>
                    <p className={Style.textMessage}>{props.message}</p>
                </div>
            </div>
            <button type="button" className={cx({[Style.likeButton]:true,[Style.iLike]:iLike})} onClick={handleLikeChange} >
                <img src={like}/>
                <p>{props.likes}</p>
            </button>
        </div>
    );
}
export default Post;