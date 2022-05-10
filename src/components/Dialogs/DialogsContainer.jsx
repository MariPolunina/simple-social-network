import React from 'react';
import { addMessageActionCreator, updateNewMessageTextActionCreator, changeCurrentPage } from '../../redux/dialogs-reducer';
import { connect } from "react-redux";
import Dialogs from './Dialogs';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return ({
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages,
        pageSize: state.messagesPage.pageSize,
        currentPage: state.messagesPage.currentPage
    })
}
let mapDispatchToProps = (dispatch) => {
    return ({
        messageAdd: (message, idDialog) => {
            dispatch(addMessageActionCreator(message, idDialog));
        },
        changeCurrentPage:(item)=>{
            dispatch(changeCurrentPage(item))
        }
    })
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);
