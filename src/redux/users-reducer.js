import { userAPI } from '../api/api';

export const FOLLOW = 'redux/users-reducer/FOLLOW';
const SET_USERS = 'redux/users-reducer/SET-USERS';
const SET_CURRENT_PAGE = 'redux/users-reducer/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'redux/users-reducer/SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'redux/users-reducer/TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING = 'redux/users-reducer/TOGGLE-IS-FOLLOWING';
const SEARCH_USERS = 'redux/users-reducer/SEARCH-USERS';
const USERS_AFTER_SEARCH = 'redux/users-reducer/USERS-AFTER-SEARCH';
const IT_IS_FRIENDS = 'redux/users-reducer/IT-IS-FRIENDS';

let initialState = {
    users: [],
    pageSize: 21,
    totalCount: 37,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    searchName: '',
    itIsFriends: false
}

export default function UsersReducer(state = initialState, action) {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(item => {
                    if (item.id == action.userId) {
                        return { ...item, followed: !item.followed }
                    }
                    return item;
                })
            }
        case SET_USERS:
            return { ...state, users: [...action.users] }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalCount: action.currentUserCount }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case TOGGLE_IS_FOLLOWING:
            return {
                ...state,
                followingInProgress: action.isFollowing ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id != action.userId)
            }
        case SEARCH_USERS:
            return {
                ...state,
                searchName: action.searchName,
                currentPage: 1
            }
        case USERS_AFTER_SEARCH:
            return {
                ...state,
                users: action.newUsers,
                totalCount: action.newTotalCount
            }
        case IT_IS_FRIENDS:
            return {
                ...state,
                itIsFriends: action.value,
                currentPage: 1
            }
        default: return state;
    }
}

export const followAC = (userId) => ({ type: FOLLOW, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, users });
export const setCurrentPageAC = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUserCountAC = (currentUserCount) => ({ type: SET_TOTAL_USERS_COUNT, currentUserCount });
export const setIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const setFollowingInProgressAC = (isFollowing, userId) => ({ type: TOGGLE_IS_FOLLOWING, isFollowing, userId });
export const searchUsersAC = (searchName) => ({ type: SEARCH_USERS, searchName })
export const successUsersSearch = (newUsers, newTotalCount) => ({ type: USERS_AFTER_SEARCH, newUsers, newTotalCount })
export const setItIsFriends = (value) => ({ type: IT_IS_FRIENDS, value })


export const getCurrentUsers = async (dispatch, needPage, pageSize, needTotalCount, apiMethod) => {
    dispatch(setIsFetchingAC(true));
    const data = await apiMethod(needPage, pageSize);
    dispatch(setUsersAC(data.items));
    if (needTotalCount) {
        dispatch(setTotalUserCountAC(data.totalCount));
    }
    dispatch(setIsFetchingAC(false));
}

export const getUsersThunkCreator = (currentPage, pageSize, itIsFriends) => {
    return async (dispatch) => {
       let apiMethod = itIsFriends ? userAPI.getFriends.bind(userAPI) : userAPI.getUsers.bind(userAPI);
        getCurrentUsers(dispatch, currentPage, pageSize, true, apiMethod)
    }
}

export const getNewPageUsersTC = (pageNumber, pageSize, itIsFriends) => {
    return async (dispatch) => {
        let apiMethod = itIsFriends ? userAPI.getFriends.bind(userAPI) : userAPI.getUsers.bind(userAPI);
        dispatch(setCurrentPageAC(pageNumber));
        getCurrentUsers(dispatch, pageNumber, pageSize, false, apiMethod)
    }
}

export const followFlow = async (dispatch, apiMethod, id) => {
    const response = await apiMethod(id);
    if (response.data.resultCode == 0) {
        dispatch(followAC(id));
        dispatch(setFollowingInProgressAC(false, id));
    }
}

export const changeFollowTC = (id) => {
    return async (dispatch) => {
        followFlow(dispatch, userAPI.follow.bind(userAPI), id)
    }
}

export const changeUnfollowTC = (id) => {
    return async (dispatch) => {
        followFlow(dispatch, userAPI.unfollow.bind(userAPI), id)
    }
}

export const lookingForUsersTC = (searchString, pageSize) => (dispatch) => {
    dispatch(setIsFetchingAC(true));
    dispatch(searchUsersAC(searchString));
    userAPI.lookingForUsers(searchString, pageSize).then(response => {
        dispatch(setIsFetchingAC(false));
        dispatch(successUsersSearch(response.data.items, response.data.totalCount))
    })
}
