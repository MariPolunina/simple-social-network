import React, { useEffect, useState } from "react";
import WriteNewMessage
    from "../../components/Users/UserItem/WriteNewMessage/WriteNewMessage";
import { SucessMessage } from "../../components/Users/Users";
import Style from './withWriteNewMessage.module.scss'

export default function withWriteNewMessage(Component) {
     function WithWriteMessage (props) {
        const [showNewMessage, setShowNewMessage] = useState(false);
        const [nameNewMessage, setNewMeessage] = useState('');
        const [imgUrlNewMessage, setImgUrlNewMessage] = useState('');
        const [idProfile, setidProfile] = useState('');
        const [showSuccessMesasge, setShowSuccessMesasge] = useState(false);
        useEffect(() => {
            if (showSuccessMesasge) {
                setTimeout(() => setShowSuccessMesasge(false), 800)
            }
        }, [showSuccessMesasge]);
        let handleShowNewMessage = (imgUrl, name, id) => {
            setShowNewMessage(true);
            setImgUrlNewMessage(imgUrl);
            setNewMeessage(name);
            setidProfile(id);
        }
        return (
            <div className={Style.hocContainer}>
                <Component handleShowNewMessage={handleShowNewMessage} {...props} />
                {showNewMessage ? <WriteNewMessage nameNewMessage={nameNewMessage} imgUrlNewMessage={imgUrlNewMessage} setShowNewMessage={setShowNewMessage} id={idProfile} addNewInfo={props.addNewInfo} setShowSuccessMesasge={setShowSuccessMesasge} /> : ''}
                {showSuccessMesasge && <SucessMessage />}
            </div>
        );
    }
    WithWriteMessage.displayName=`withAuthRedirect(${Component.displayName || Component.name || 'Component' })`;
    return WithWriteMessage;
}

