import React from "react";
import { connect } from "react-redux";
import { addPostActionCreator, changeLikeCount, updateNewPostTextActionCreator } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";


let mapStateToProps = (state) => {
    return ({
        posts: state.profilePage.posts
    })
}

let MyPostsContainer = connect(mapStateToProps, {
    addPost:addPostActionCreator,
    changeLikeCount
})(MyPosts);

export default MyPostsContainer;