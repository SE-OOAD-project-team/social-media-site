import React from 'react';

import style from './TabComponent.module.css';
import formStyle from '../Form.module.css';

import { edit_profile } from '../../api/api.js';

import { Formik, Form, Field } from 'formik';

const ProfileSettings = (props) => {
    const on_submit = async (
        values,
        { setSubmitting, setStatus }
    ) => {
        try {
            await edit_profile({
                displayName: values.displayName,
                description: values.description,
            });
            props.setProfile({ ...props.profile, ...values });
            setStatus('Success');
        } catch (e) {
            setStatus(`Error: ${e.message}`);
            console.log(e);
        }
        setSubmitting(false);
    };

    return (
        <div className={`${style.TabComponent}`}>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    displayName: props.profile.displayName || '',
                    description: props.profile.description || '',
                }}
                // validate={validate}
                onSubmit={on_submit}
            >
                {({ isSubmitting, status }) => (
                    <Form className={formStyle.Form}>
                        <h2>Profile</h2>
                        <div
                            className={`${formStyle.Error} ${formStyle.Small}`}
                        >
                            {status}
                        </div>

                        <div>
                            <h5>Username</h5>
                            <div>{props.profile.username}</div>
                        </div>
                        <div className={formStyle.Field}>
                            <h5>Display Name</h5>
                            <Field
                                name="displayName"
                                className={formStyle.Input}
                                type="text"
                            />
                        </div>
                        <div className={formStyle.Field}>
                            <h5>Description</h5>
                            <Field
                                name="description"
                                className={formStyle.Input}
                                type="text"
                                as="textarea"
                            />
                        </div>
                        <div className={formStyle.Field}>
                            <button
                                type="submit"
                                className={formStyle.Button}
                                disabled={isSubmitting}
                            >
                                Save
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProfileSettings;
