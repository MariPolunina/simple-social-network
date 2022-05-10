import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import {setUserData, LogoutTC} from '../../redux/auth-reducer'

class HeaderComponent extends React.Component {
    render() {
        return (
            <Header {...this.props} />
        );
    }
}

const mapStateToProps=(state)=>({
    isAuth:state.auth.isAuth,
    login:state.auth.login
});

export default connect(mapStateToProps,{
    setUserData,LogoutTC
})(HeaderComponent)