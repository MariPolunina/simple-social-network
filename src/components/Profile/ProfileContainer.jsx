import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { setUserProfileAC, getCurrentProfileTC, getUserStatusTC, updateUserStatusTC, savePhotoTC, updateProfileTC, defineFollowed } from '../../redux/profile-reducer'
import { useParams } from "react-router-dom";
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from "redux";
import { changeFollowTC, changeUnfollowTC, setFollowingInProgressAC } from '../../redux/users-reducer'
import { addNewInfo } from '../../redux/dialogs-reducer'
import Preloader from "../common/Preloader/Preloader";


const withRouter = WrappedComponent => props => {
  let params = useParams();
  // etc... other react-router-dom v6 hooks
  return (
    <WrappedComponent
      {...props}
      params={params}
    // etc...
    />
  );
};

class ProfileContainer extends React.Component {
  userId = this.props.params.userId;
  refreshProfile = () => {
    this.userId = this.props.params.userId;
    if (!this.userId) {
      if (this.props.isAuth) {
        this.userId = this.props.logId;
      }
    }
    this.props.getCurrentProfileTC(this.userId);
    this.props.getUserStatusTC(this.userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.params.userId != this.props.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    if (this.props.isFetching) {
      return <Preloader />
    }
    else {
      return (
        <Profile {...this.props} profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateUserStatusTC}
          isOwner={!!this.props.params.userId}
          savePhoto={this.props.savePhotoTC}
          updateProfileTC={this.props.updateProfileTC}
          userId={this.props.logId}
          profileId={this.userId}
          icons={this.props.icons}
          followingInProgress={this.props.followingInProgress}
          setFollowingInProgress={this.props.setFollowingInProgress}
          changeFollowTC={this.props.changeFollowTC}
          changeUnfollowTC={this.props.changeUnfollowTC}
          users={this.props.users}
          addNewInfo={this.props.addNewInfo}
          followed={this.props.followed}
        />
      );
    }
  }
}


let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  isFetching: state.profilePage.isFetching,
  logId: state.auth.id,
  isAuth: state.auth.isAuth,
  icons: state.profilePage.icons,
  users: state.usersPage.users,
  followingInProgress: state.usersPage.followingInProgress,
  followed: state.profilePage.followed
});

export default compose(
  connect(mapStateToProps, {
    setUserProfile: setUserProfileAC,
    getCurrentProfileTC,
    getUserStatusTC,
    updateUserStatusTC,
    savePhotoTC,
    updateProfileTC,
    changeFollowTC,
    changeUnfollowTC,
    setFollowingInProgress: setFollowingInProgressAC,
    addNewInfo,
    defineFollowed
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);

