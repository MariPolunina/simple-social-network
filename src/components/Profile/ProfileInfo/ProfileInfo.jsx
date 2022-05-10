import React, { useState } from "react";
import Preloader from "../../common/Preloader/Preloader";
import Style from './ProfileInfo.module.scss'
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import bigAvatar from "../../../assets/images/bigAvatar.png";
import ProfileDataForm from './ProfileDataForm/ProfileDataForm';
import ButtonFollow from "../../common/ButtonFollow/ButtonFollow";
import ButtonWriteNewMessage from "../../common/ButtonWriteNewMessage/ButtonWriteNewMessage";
import smallAvatar from "../../../assets/images/avatar.png";
import withWriteNewMessage from "../../../hoc/withWriteNewMessage/withWriteNewMessage";

function ProfileInfoAbout(props) {
    const [editMode, setEditMode] = useState(false);
    const [someError, setSomeError] = useState('');
    if (!props.profile) {
        return <Preloader />
    };
    const handlePhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }
    const sendForm = (values) => {
        values = {
            ...values, userId: props.userId
        }
        props.updateProfile(values).then(result => {
            setEditMode(false);
            setSomeError('');
        }).catch((result) => {
            setSomeError(result['error']);
        });
    }
    return (
        <div className={Style.content}>
            <div className={Style.avatarInfo} >
                <div className={Style.avatar}>
                    <img src={props.profile.photos.large ? props.profile.photos.large : bigAvatar} className={props.profile.photos.large ? Style.avatarImg : Style.avatarDefault} />
                    {!props.isOwner && <input type='file' onChange={handlePhotoSelected} className={Style.changeAvatarInput} />}
                </div>
                {
                    props.isOwner &&
                    <div className={Style.usersButton}>
                        <ButtonFollow followed={props.followed}
                            id={props.profileId}
                            followingInProgress={props.followingInProgress}
                            setFollowingInProgress={props.setFollowingInProgress}
                            changeFollowTC={props.changeFollowTC}
                            changeUnfollowTC={props.changeUnfollowTC}
                            textButton={props.followed ? 'Unfollow' : 'Follow'} />
                        <ButtonWriteNewMessage
                            isDefaultAvatar={!!props.profile.photos.small}
                            handleShowNewMessage={props.handleShowNewMessage}
                            url={props.profile.photos.small ? props.profile.photos.small : smallAvatar}
                            name={props.profile.fullName}
                            id={props.profileId} />
                    </div>
                }
            </div>
            <div className={Style.mainInfo}>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} />
                {editMode ? <div className={Style.dynamicForm}>
                    {someError != '' ? <div className={Style.errorMessage}>{someError}</div> : ''}
                    <ProfileDataForm profile={props.profile} sendForm={sendForm} />
                </div> :
                    <ProfileData profile={props.profile} isOwner={!props.isOwner} goToEditCode={() => setEditMode(true)} icons={props.icons} />}

            </div>
        </div>
    );
}

export default withWriteNewMessage(ProfileInfoAbout);

function ProfileData(props) {
    return (
        <div className={Style.formStatic}>
            <div className={Style.fieldFormStatic}>
                <span className={Style.fieldDescription}>Full name: </span>
                <p className={Style.value}>{props.profile.fullName}</p>
            </div>
            <div className={Style.fieldFormStatic}>
                <span className={Style.fieldDescription}>Looking for a job: </span>
                <p className={Style.value}>{props.profile.lookingForAJob ? 'yes' : 'no'}</p>
            </div>
            <div className={Style.fieldFormStatic}>
                <span className={Style.fieldDescription}>My skills: </span>
                <p className={Style.value}>{props.profile.lookingForAJobDescription}</p>
            </div>
            <div className={Style.fieldFormStatic}>
                <span className={Style.fieldDescription}>About me: </span>
                <p className={Style.value}>{props.profile.aboutMe}</p>
            </div>
            <div className={Style.fieldContacts}>
                <span className={Style.fieldDescription}>Contacts:</span>
                <ul className={Style.contactsInstaticForm}>
                    {Object.keys(props.profile.contacts).map(item => <Contact contactTitle={item} contactValue={props.profile.contacts[item]} key={item} icons={props.icons} />)}
                </ul>
            </div>
            {props.isOwner ? <button type="button" onClick={props.goToEditCode} className={Style.changeButton}>Change</button> : ''}
        </div>
    );
}

function Contact(props) {
    const icons = props.icons;
    const createIcon = (name) => {
        const findIcon = icons.filter((item) => item.forWho == name);
        return <img src={findIcon[0].urlImg} className={Style.iconColor} />;

    }
    return (
        <div className={Style.fieldFormStatic}>
            <div className={Style.firstcolumn}>
                {createIcon(props.contactTitle)}
            </div>
            <span className={Style.fieldDescription}>{props.contactTitle}: </span>
            <a href={props.contactValue} target='_blank' className={Style.fieldLink} >{props.contactValue}</a>
        </div>
    );
}