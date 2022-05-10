import React from "react";
import UserItem from "./UserItem/UserItem";
import defaultAvatar from '../../assets/images/avatar.png'
import sendImg from '../../assets/images/send.png'
import Style from './Users.module.scss'
import Pages from "./UserItem/Pages/Pages";
import LookingForUsers from "./LookingForUsers/LookingForUsers";
import withWriteNewMessage from "../../hoc/withWriteNewMessage/withWriteNewMessage";

const infoHowToShow = {
    sizePortion: 10,
    decreaseIncrease: 5
}

function UsersAbout(props) {
    return (
        <div className={Style.userContainer}>
            {!props.itIsFriends ? <LookingForUsers lookingForUsers={props.lookingForUsers} pageSize={props.pageSize} /> : ''}
            <div className={Style.usersOnPage}>
                {props.users.length == 0 && !props.isFetching ?
                    <div className={Style.sorryMessage}>Sorry. We didn't found any Users</div> :
                    props.users.map(item => {
                        return <UserItem textButton={item.followed ? 'Unfollow' : 'Follow'} name={item.name}
                            status={item.status} key={item.id}
                            url={item.photos.small ? item.photos.small : defaultAvatar}
                            isDefaultAvatar={item.photos.small ? false : true}
                            id={item.id}
                            followed={item.followed}
                            followingInProgress={props.followingInProgress}
                            handleShowNewMessage={props.handleShowNewMessage}
                            setFollowingInProgress={props.setFollowingInProgress} changeFollowTC={props.changeFollowTC}
                            changeUnfollowTC={props.changeUnfollowTC}
                        />
                    })
                }
            </div>
            <Pages infoHowToShow={infoHowToShow} currentPage={props.currentPage} totalCount={props.totalCount} pageSize={props.pageSize} handlePageChange={props.handlePageChange} />
        </div>
    );
}

export default withWriteNewMessage(UsersAbout);

export function SucessMessage(props) {
    return (
        <div className={Style.successInfoMessage}>
            <p>The message was sending</p>
            <img src={sendImg} className={Style.successSend} />
        </div>
    )
}
