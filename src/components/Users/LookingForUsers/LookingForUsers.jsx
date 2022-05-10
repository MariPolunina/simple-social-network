import React from "react";
import { Field, Form } from "react-final-form";
import Style from './LookingForUsers.module.scss'
import findIcon from '../../../assets/images/findIcon.png'

export default function LookingForUsers(props) {
    const searchOn=(values)=>{
        if(typeof values.search!='undefined'){
            props.lookingForUsers(values.search, props.pageSize)
        }
    }
    const handleChange = event => {
        props.lookingForUsers(event.target.value, props.pageSize)
      };
    return (
        <div className={Style.formSearch}>
            <Form onSubmit={searchOn} render={({ handleSubmit }) => (
                <form className={Style.flexForm} onChange={handleChange} onSubmit={handleSubmit}>
                    <Field component="input" type="search" name="search" className={Style.fieldSearch} />
                    <button className={Style.searchButton} ><img src={findIcon} /></button>
                </form>
            )}
            />
        </div>
    )
}
