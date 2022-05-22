import React, { useState } from "react";
import Style from './Login.module.scss';
import { Form, Field } from 'react-final-form'
import { Navigate } from "react-router-dom";
import { required } from "../../utils/validators/validators";
import { Input, InputWithoutBorder } from "../common/FormsControls/FormsControls";
import openEyes from '../../assets/images/free-icon-font-eye-3917104.png';
import closeEyes from '../../assets/images/free-icon-font-eye-crossed-3917175.png';
import classNames from "classnames";
import Preloader from "../common/Preloader/Preloader";

let cx = classNames.bind(Style)
const LoginForm = (props) => {
    return (
        <Form initialValues={{ login: 'free@samuraijs.com', password: 'free' }} className={Style.loginForm} onSubmit={props.onSubmit} render={({ handleSubmit }) => (
            <form className={Style.formContainer} onSubmit={handleSubmit} >
                <Field name="login" component={Input} type="text" placeholder="login" validate={required} defaultValue='dsds' className={Style.fieldLogin} />
                <div className={cx(Style.fieldContainer, Style.fieldPassword)}>
                    <Field name="password" component={InputWithoutBorder} type={props.showPassword ? "text" : "password"} placeholder="password" validate={required} />
                    <button type="button" onClick={props.changeShowPassword} className={Style.buttonPassword}><img src={props.showPassword ? closeEyes : openEyes} /></button>
                </div>
                <label className={cx(Style.formLabel, Style.fieldContainer)}>
                    <Field type="checkbox" component="input" name="rememberMe" className={Style.checkBoxStyle} />
                    Remember me
                </label>
                {props.captchaURL ?
                    <label className={cx(Style.formLabel, Style.fieldContainer)}>
                        Input captcha
                        <Field component="input" name="captcha" type="text" className={Style.inputCaptcha} />
                    </label> : ''}
                <button type='submit' className={Style.formButton}>Login</button>
            </form>
        )} />
    );
}

export default function Login(props) {
    const [showPassword, setShowPassword] = useState(false);
    const changeShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const onSubmit = values => {
        props.LoginTC(values.login, values.password, values.rememberMe, values.captcha);
    }
    return (
        <div className={Style.loginContainer}>
            {props.isFetching && <Preloader />}
            {props.isAuth ?
                <Navigate to={"/profile"} /> :
                <div className={Style.container}>
                    <h1 className={Style.h1Login}>Login</h1>
                    {props.errorLoginform ? <span className={Style.errorMessage}>{props.errorLoginform}</span> : null}
                    <div className={Style.formCenter}>
                        {props.captchaURL ?
                            <div className={Style.loginForm}>
                                <LoginForm onSubmit={onSubmit} captchaURL={props.captchaURL} showPassword={showPassword} changeShowPassword={changeShowPassword} />
                                <CaptchaField captchaURL={props.captchaURL} />
                            </div> : <LoginForm className={Style.loginForm} onSubmit={onSubmit} showPassword={showPassword} changeShowPassword={changeShowPassword} />}
                    </div>
                    <div className={Style.additionalInfo}>
                        <p>Login: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </div>
                </div>
            }
        </div>
    );
}

function CaptchaField(props) {
    return (
        <div>
            <img src={props.captchaURL} />
        </div>
    );
}