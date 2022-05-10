import React from "react";
import Style from './FormControls.module.scss'
import classNames from "classnames";


const FieldContainer=({input, meta,TypeField, ...props})=>{
    return(
        <div className={Style.field}>
            <TypeField {...input} className={Style.message} {...props}/>
            {meta.error && meta.touched && <span>{meta.error} </span>}
        </div>
    );
}

export const Textarea=(props)=>{
    let cx = classNames.bind(Style);
    return(
       <FieldContainer {...props} TypeField={"textarea"} className={cx(Style.message, Style.textArea)} rows={5} maxLength={300}/>
    );
}

export const Input=(props)=>{
    return(
       <FieldContainer {...props} TypeField={"input"} />
    );
}

export const InputWithoutBorder=(props)=>{
    return(
       <FieldContainer {...props} TypeField={"input"} className={Style.noneBorderInput}/>
    );
}
