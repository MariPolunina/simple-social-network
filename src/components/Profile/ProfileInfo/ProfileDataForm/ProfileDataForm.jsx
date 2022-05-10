import React from "react";
import { Field, Form } from "react-final-form";
import Style from './ProfileDataForm.module.scss'

/*props.sendForm*/
export default function ProfileDataForm(props) {
    return (
        <div className={Style.formContainer}>
            <Form initialValues={{ lookingForAJob: props.profile.lookingForAJob, fullName: props.profile.fullName, lookingForAJobDescription: props.profile.lookingForAJobDescription, contacts: props.profile.contacts, aboutMe: props.profile.aboutMe }} onSubmit={props.sendForm} render={({ submitError, handleSubmit }) => (
                <form onSubmit={handleSubmit} className={Style.dynamicForm}>
                    {submitError && <div>{submitError}</div>}
                    <label className={Style.rowForm}>
                        Full name:
                        <Field component="input" type="text" name="fullName" className={Style.inputText} />
                    </label>
                    <label className={Style.rowForm}>
                        Looking for a job:
                        <Field component="input" type="checkbox" name="lookingForAJob" />
                    </label>
                    <label className={Style.rowForm}>
                        My skills:
                        <Field component="textarea" name="lookingForAJobDescription" className={Style.inputText} />
                    </label>
                    <label className={Style.rowForm}>
                        About Me:
                        <Field name="aboutMe" className={Style.inputText}>
                            {({ input }) => (
                                <div className={Style.aboutMe}>
                                    <textarea {...input} type="text" className={Style.inputText} rows={4}/>
                                </div>
                            )}
                        </Field>
                    </label>
                    <React.Fragment >
                        {Object.keys(props.profile.contacts).map(item => <ContactField contactTitle={item} key={item} />)}
                    </React.Fragment>
                    <button type="submit" className={Style.buttonSave}>Save</button>
                </form>
            )
            } />
        </div>
    );
}

function ContactField(props) {
    return (
        <label className={Style.rowForm}>
            {`${props.contactTitle}: `}
            <Field name={`contacts.${props.contactTitle}`} component="input" type="text" className={Style.inputText} />
        </label>
    );
}
