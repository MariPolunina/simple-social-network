import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { LoginTC, LogoutTC } from '../../redux/auth-reducer'

let mapStateToProps = (state) => {
    return ({
        isAuth:state.auth.isAuth,
        errorLoginform:state.auth.errorLoginform,
        captchaURL:state.auth.captchaURL,
        isFetching:state.auth.isAuth,
    })
};
export default connect(mapStateToProps, {
    LoginTC, LogoutTC
})(Login);