import React, { useEffect } from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";;

export default function UsersAPIComponent(props) {
    useEffect(() => {
        props.setItIsFriends(false);
    }, [])
    useEffect(() => {
        props.getUsersThunkCreator(props.currentPage, props.pageSize, false);
    }, [props.itIsFriends, props.currentPage]);
    return <UserInfo {...props} />
}

export function UserInfo(props) {

    const handlePageChange = (pageNumber) => {
        props.getNewPageUsersTC(pageNumber, props.pageSize, props.itIsFriends);
    }
    return (
        <>
            {props.isFetching ? <Preloader /> : null}
            <Users totalCount={props.totalCount} 
                    pageSize={props.pageSize} 
                    currentPage={props.currentPage} 
                    handlePageChange={handlePageChange} 
                    users={props.users} 
                    followingInProgress={props.followingInProgress} lookingForUsers={props.lookingForUsersTC} 
                    itIsFriends={props.itIsFriends} 
                    addNewInfo={props.addNewInfo} 
                    setFollowingInProgress={props.setFollowingInProgress} changeFollowTC={props.changeFollowTC} 
                    changeUnfollowTC={props.changeUnfollowTC} />
        </>
    );
}