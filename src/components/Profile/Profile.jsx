import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Style from './Profile.module.scss'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
function Profile(props) {
    return (
        <div className={Style.content}>
            <ProfileInfo profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                isOwner={props.isOwner}
                savePhoto={props.savePhoto}
                updateProfile={props.updateProfileTC}
                userId={props.userId}
                profileId={props.profileId}
                icons={props.icons}
                followed={props.followed}
                followingInProgress={props.followingInProgress}
                setFollowingInProgress={props.setFollowingInProgress}
                changeFollowTC={props.changeFollowTC}
                changeUnfollowTC={props.changeUnfollowTC}
                users={props.users}
                addNewInfo={props.addNewInfo}
                defineFollowed={props.defineFollowed} />
            <MyPostsContainer />
        </div>
    );
}
export default Profile;