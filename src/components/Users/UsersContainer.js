import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { setFollowingInProgressAC, getUsersThunkCreator, getNewPageUsersTC, changeFollowTC, changeUnfollowTC, lookingForUsersTC, setItIsFriends } from "../../redux/users-reducer";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalCount, getUsers } from "../../redux/users-selectors";
import UsersAPIComponent from "./UsersAPIComponent";
import {addNewInfo} from '../../redux/dialogs-reducer'

let mapStateToProps = (state) => {
    return ({
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        itIsFriends:state.usersPage.itIsFriends,
    })
}

export default compose(
    connect(mapStateToProps, {
        setFollowingInProgress: setFollowingInProgressAC,
        getUsersThunkCreator,
        getNewPageUsersTC,
        changeFollowTC,
        changeUnfollowTC,
        lookingForUsersTC,
        addNewInfo,
        setItIsFriends
    }),
        withAuthRedirect,
       
)(UsersAPIComponent)