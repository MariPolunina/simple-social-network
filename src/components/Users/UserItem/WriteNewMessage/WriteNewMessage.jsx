import React from "react";
import { Field, Form } from "react-final-form";
import Style from './WriteNewMessage.module.scss';
import { Link } from "react-router-dom";
import defaultAvatar from '../../../../assets/images/avatar.png'
import ButtonClose from "../../../common/ButtonClose/ButtonClose";

export default function WriteNewMessage(props) {

    const sendTextMessage = (values) => {
        addMessage(values.newMessage);
    }
    const addMessage = (textMessage) => {
        if (textMessage!=null) {
            props.addNewInfo(props.id, textMessage, props.nameNewMessage, props.imgUrlNewMessage);
            props.setShowNewMessage(false);
            props.setShowSuccessMesasge(true);
        }
    }
    return (
        <div className={Style.bigBlockWindow}>
            <div className={Style.newMessageContainer}>
                <div className={Style.headerNewMessage} >
                    <p className={Style.hederText}>New message</p>
                   <ButtonClose setShowNewMessage={props.setShowNewMessage} />
                </div>
                <div className={Style.messageBody}>
                    <ShortUserInfo imgUrlNewMessage={props.imgUrlNewMessage} nameNewMessage={props.nameNewMessage} id={props.id} />
                    <NewMessageForm sendTextMessage={sendTextMessage} />
                </div>
            </div>
        </div>
    )
}

function NewMessageForm(props) {
    return (
        <Form onSubmit={props.sendTextMessage} render={
            ({ handleSubmit }) =>
                <form onSubmit={handleSubmit} className={Style.formNewMessageContainer}>
                    <Field name="newMessage">
                        {({ input }) => (
                            <div className={Style.textAreaContainer}>
                                <textarea {...input} type="text" rows={1} className={Style.newMessageTextArea} />
                            </div>
                        )}
                    </Field>
                    <button className={Style.sendButton}>Send</button>
                </form>
        } />
    );
}

function ShortUserInfo(props) {
    return (
        <div className={Style.shortUserInfoContainer}>
            <Link to={`/profile/${props.id}`} className={Style.linkProfile}>
                <img src={props.imgUrlNewMessage != null ? props.imgUrlNewMessage : defaultAvatar} className={props.imgUrlNewMessage != null ? Style.avatarNewMessage : Style.defaultAvatar} />
            </Link>
            <p>{props.nameNewMessage}</p>
        </div>
    );
}