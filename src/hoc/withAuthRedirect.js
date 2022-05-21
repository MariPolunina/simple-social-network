import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

function withAuthRedirect(Component) {
    function RedirectComponent(props) {
        if (!props.isAuth) {
            return <Navigate to="/login" />
        }
        return <Component {...props} />
    }
    let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
    ConnectedRedirectComponent.displayName=`withAuthRedirect(${Component.displayName || Component.name || 'Component' })`;
    return ConnectedRedirectComponent;
}

export default withAuthRedirect;