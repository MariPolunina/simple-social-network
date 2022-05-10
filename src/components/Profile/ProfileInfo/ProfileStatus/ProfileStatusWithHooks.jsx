import React, { useEffect, useState } from "react";
import Style from './ProfileStatus.module.scss'

export default function ProfileStatusWithHooks(props) {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(()=>{
        setStatus(props.status);
    }, [props.status]);

    const handleActivateDoubleClick = () => {
        setEditMode(true);
    }
    const handleDeactivateDoubleClick = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    const handleChange=(e)=>{
        setStatus(e.currentTarget.value)
    }
    return (
        <div className={Style.statusContainer}>
            {!editMode ?
                <span className={Style.statusStatic} onClick={!props.isOwner? handleActivateDoubleClick: null} >{props.status || ''}</span> :
                <input autoFocus={true} onBlur={handleDeactivateDoubleClick} onChange={handleChange} value={status} className={Style.statusDynamic} maxLength={30}/>
            }
        </div>
    );
}