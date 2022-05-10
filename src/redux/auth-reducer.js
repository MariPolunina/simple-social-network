import { headerAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "redux/auth-reducer/SET-USER-DATA";
const ERROR_LOGIN_FORM = 'redux/auth-reducer/ERROR_LOGIN_FORM';
const GET_CAPTCHA_SUCCESS='redux/auth-reducer/GET-CAPTCHA-SUCCESS';
const TOGGLE_FETCHING='redux/auth-reducer/TOGGLE-FETCHING';

let initialState = {
    id: null,
    isFetching: false,
    email: null,
    login: null,
    isAuth: false,
    password: null,
    rememberMe: false,
    errorLoginform: null,
    captchaURL:null
}

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                captchaURL:null,
                errorLoginform:null
            }
        case ERROR_LOGIN_FORM:
            return {
                ...state,
                errorLoginform: action.errorMessage
            }
        case GET_CAPTCHA_SUCCESS:
            return {
                ...state,
                captchaURL:action.gettingCaptchaURL
            }
        case TOGGLE_FETCHING:
            return{
                ...state,
                isFetching:action.valueFetching
            }
        default: return state;
    }
}
export const setUserData = (id, login, email, isAuth) => {
    return { type: SET_USER_DATA, data: { id, email, login, isAuth } };
}
export const setLoginErrors = (errorMessage) => {
    return { type: ERROR_LOGIN_FORM, errorMessage };
}
export const getCaptchaSuccess=(gettingCaptchaURL)=>{
    return {type:GET_CAPTCHA_SUCCESS, gettingCaptchaURL}
}
export const toggleFetching=(valueFetching)=>{
    return {type:TOGGLE_FETCHING, valueFetching}
}

export const AuthTC = () => {
    return (dispatch) => {
        return headerAPI.getAuthMe().then(response => {
            if (response.data.resultCode === 0) {
                let { id, login, email } = response.data.data;
                dispatch(setUserData(id, login, email, true));
            }
        })
    }
}
export const LoginTC = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        dispatch(toggleFetching(true));
        let response = await headerAPI.login({ email, password, rememberMe, captcha });
        if (response.data.resultCode === 0) {
            dispatch(AuthTC());
        }
        else {
            dispatch(setLoginErrors(response.data.messages[0]));
            if(response.data.resultCode==10){
                dispatch(getCaptchaTC());
            }
        }
        dispatch(toggleFetching(true));
    }
}
const getCaptchaTC=()=> (dispatch)=>{
    securityAPI.getCaptcha().then(response=>{
        dispatch(getCaptchaSuccess(response.data.url));
    })
}
export const LogoutTC = () => {
    return async (dispatch) => {
        let response = await headerAPI.logOut();
        if (response.data.resultCode === 0) {
            dispatch(setUserData(null, null, null, false));
        }
    }
}