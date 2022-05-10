import { AuthTC } from "./auth-reducer";

const SET_INITIALIZED = 'redux/app-reducer/SET-INITIALIZED';

let initialState = {
    initialized: false,
}

export default function AppReducer(state = initialState, action) {
    switch (action.type) {
        case (SET_INITIALIZED):
            return ({
                ...state,
                initialized: true
            })
        default: return state;
    }
}
export const initializedSuccess = () => {
    return { type: SET_INITIALIZED }
}

export const initializeAppTC = () => {
    return (dispatch) => {
        let authPromise = dispatch(AuthTC());
        Promise.all([authPromise]).then(() => {
            dispatch(initializedSuccess());
        });
    }
}