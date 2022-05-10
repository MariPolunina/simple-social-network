import { applyMiddleware, combineReducers, createStore, compose  } from "redux";
import AuthReducer from "./auth-reducer";
import dialogReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import UsersReducer from "./users-reducer";
import thunkMiddleWare from 'redux-thunk'
import AppReducer from "./app-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogReducer,
    usersPage:UsersReducer,
    auth:AuthReducer,
    app:AppReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
applyMiddleware(thunkMiddleWare)));

//let store = createStore(reducers, applyMiddleware(thunkMiddleWare));
 
export default store;