import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { getUsersThunkCreator, getNewPageUsersTC, setFollowingInProgressAC, changeUnfollowTC, changeFollowTC, setItIsFriends } from "../../redux/users-reducer";
import { UserInfo } from "../Users/UsersAPIComponent";
import Style from './Friends.module.scss';
import {addNewInfo} from '../../redux/dialogs-reducer'

function Friends(props) {
    useEffect(() => {
        props.setItIsFriends(true);
    }, []);
    useEffect(() => {
        props.getUsersThunkCreator(props.currentPage, props.pageSize, true)
    }, [props.itIsFriends, props.currentPage]);
    if (props.users.length == 0 && !props.isFetching) {
        return (
            <div className={Style.withoutFollowContainer}>
                Start Following someone!
            </div>
        )
    }
    return (
        <UserInfo {...props} />
    );
}

let mapStateToProps = (state) => {
    return ({
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        itIsFriends: state.usersPage.itIsFriends
    })
}

export default compose(
    connect(mapStateToProps, {
        setFollowingInProgress: setFollowingInProgressAC,
        getUsersThunkCreator,
        getNewPageUsersTC,
        changeFollowTC,
        changeUnfollowTC,
        setItIsFriends,
        addNewInfo
    }),
    withAuthRedirect
)(Friends)