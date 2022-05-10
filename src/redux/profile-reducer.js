import { profileAPI, userAPI } from "../api/api";
import facebookIcon from '../assets/images/contactsImg/facebookIcon.png';
import githubIcon from '../assets/images/contactsImg/githubIcon.png';
import vkIcon from '../assets/images/contactsImg/vkIcon.png';
import twitterIcon from '../assets/images/contactsImg/twitterIcon.png';
import instagramIcon from '../assets/images/contactsImg/instagramIcon.png';
import youtubeIcon from '../assets/images/contactsImg/youtubeIcon.png';
import { FOLLOW } from "./users-reducer";

const ADD_POST = 'redux/profile-reducer/ADD-POST';
const SET_USER_PROFILE = 'redux/profile-reducer/SET-USER-PROFILE';
const SET_STATUS = 'redux/profile-reducer/SET-STATUS';
const DELETE_POST = 'redux/profile-reducer/DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'redux/profile-reducer/SAVE-PHOTO-SUCCESS';
const CHANGE_LIKES_COUNT = 'redux/profile-reducer/CHANGE-LIKES-COUNT';
const CHANGE_FOLLOWED = 'redux/profile-reducer/CHANGE-FOLLOWED';
const CHANGE_FETCHING = 'redux/profile-reducer/CHANGE-FETCHING';


let initialState = {
    posts: [
        { id: 1, message: 'Hi, How are you?', likesCount: 12, sender: 'PaperPlane123', iLike: false },
        { id: 2, message: 'It is my new post', likesCount: 21, sender: 'jassyJein', iLike: true },
        { id: 3, message: 'VS is cool', likesCount: 1, sender: 'fileOm345', iLike: false },
        { id: 4, message: 'Are you sure', likesCount: 5, sender: 'PaperPlane123', iLike: true },
        { id: 5, message: 'VS is not cool. I like WebStorm', likesCount: 1, sender: 'seniorTomato56', iLike: false }
    ],
    profile: null,
    isFetching: false,
    status: '',
    icons: [
        { forWho: 'facebook', urlImg: facebookIcon },
        { forWho: 'website', urlImg: '' },
        { forWho: 'vk', urlImg: vkIcon },
        { forWho: 'twitter', urlImg: twitterIcon },
        { forWho: 'instagram', urlImg: instagramIcon },
        { forWho: 'youtube', urlImg: youtubeIcon },
        { forWho: 'github', urlImg: githubIcon },
        { forWho: 'mainLink', urlImg: '' }
    ],
    followed: false
}
export default function profileReducer(state = initialState, action = { type: '' }) {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, { id: state.posts.length + 1, message: action.message, likesCount: 0, sender: action.login, iLike: false }]
            };
        }
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile }
        case SET_STATUS:
            return { ...state, status: action.status }
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(item => item.id != action.userId) }
        case SAVE_PHOTO_SUCCESS:
            return { ...state, profile: { ...state.profile, photos: action.photos } }
        case CHANGE_LIKES_COUNT:
            return {
                ...state, posts: state.posts.filter(item => {
                    if (item.id == action.userId) {
                        item.likesCount = action.newLikeCount;
                        return item;
                    }
                    return item;
                })
            }
        case CHANGE_FOLLOWED:
            return {
                ...state,
                followed: action.followed
            }
        case FOLLOW:
            return {
                ...state,
                followed: !state.followed
            }
        case CHANGE_FETCHING:
            return{
                ...state,
                isFetching:action.newIsFetching
            }
        default: return state;
    }
}
export const addPostActionCreator = (message, login) => {
    return { type: ADD_POST, message, login };
};
export const setUserProfileAC = (profile) => {
    return { type: SET_USER_PROFILE, profile }
}
export const setStatusAC = (status) => {
    return { type: SET_STATUS, status }
}
export const deletePostAC = (userId) => {
    return { type: DELETE_POST, userId }
}
export const savePhotoSuccess = (photos) => {
    return { type: SAVE_PHOTO_SUCCESS, photos }
}
export const changeLikeCount = (newLikeCount, userId) => {
    return { type: CHANGE_LIKES_COUNT, newLikeCount, userId }
}
export const changeFollowed = (followed) => {
    return { type: CHANGE_FOLLOWED, followed }
}
export const changeFetching = (newIsFetching) => {
    return {type:CHANGE_FETCHING, newIsFetching}
}


export const getCurrentProfileTC = (userId) => {
    return (dispatch) => {
        dispatch(changeFetching(true))
        profileAPI.getCurrentProfile(userId).then(response => {
            dispatch(setUserProfileAC(response.data));
            dispatch(defineFollowed(response.data.fullName))
        })
        dispatch(changeFetching(false))
    }
}
export const getUserStatusTC = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(response => {
            dispatch(setStatusAC(response.data));
        })
    }
}
export const updateUserStatusTC = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then(response => {
            if (response.data.resultCode == 0) {
                dispatch(setStatusAC(status));
            }
        })
    }
}
export const savePhotoTC = (image) => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(image);
        if (response.data.resultCode == 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
}
export const updateProfileTC = (message) => {
    return (dispatch, getState) => {
        return profileAPI.updateProfile(message).then(response => {
            if (response.data.resultCode == 0) {
                dispatch(getCurrentProfileTC(getState().auth.id));
            }
            else {
                return Promise.reject({ error: response.data.messages[0] })
            }
        });
    }
}

export const defineFollowed = (nameUser) => {
    return (dispatch, getState) => {
        userAPI.lookingForUsers(nameUser).then(response => {
            dispatch(changeFollowed(response.data.items[0].followed))
        })
    }
}