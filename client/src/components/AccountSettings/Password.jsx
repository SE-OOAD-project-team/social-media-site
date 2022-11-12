import React from 'react';

import { edit_password } from '../../api/api.js';

import style from './TabComponent.module.css';
import formStyle from '../Form.module.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';

const PasswordSettings = (props) => {
    const validate = (values) => {
        const errors = {};

        if (!values.password) {
            errors.password = 'Required';
        }

        if (!values.retype_password) {
            errors.retype_password = 'Required';
        } else if (values.password !== values.retype_password) {
            errors.retype_password = "Passwords don't match";
        }
        
        return errors;
    };

    const on_submit = async (
        values,
        { setSubmitting, setStatus, setFieldValue }
    ) => {
        try {
            await edit_password(values.password);
            setStatus('Success');
        } catch (e) {
            // setStatus('Invalid Username or password');
            setStatus(`Error: ${e.message}`);
            setFieldValue('password', '', false);
            setFieldValue('retype_password', '', false);
            console.log(e);
        }
        setSubmitting(false);
    };

    return (
        <div className={`${style.TabComponent}`}>
            <Formik
                initialValues={{ password: '', retype_password: '' }}
                validate={validate}
                onSubmit={on_submit}
            >
                {({ isSubmitting, status }) => (
                    <Form className={formStyle.Form}>
                        <h2>Password</h2>
                        <div
                            className={`${formStyle.Error} ${formStyle.Small}`}
                        >
                            {status}
                        </div>
                        <div className={formStyle.Field}>
                            <Field
                                name="password"
                                className={formStyle.Input}
                                type="password"
                                placeholder="New Password"
                            />
                            <div
                                className={`${formStyle.Error} ${formStyle.XSmall}`}
                            >
                                <ErrorMessage name="password" />
                            </div>
                        </div>
                        <div className={formStyle.Field}>
                            <Field
                                name="retype_password"
                                className={formStyle.Input}
                                type="password"
                                placeholder="Re-type Password"
                            />
                            <div
                                className={`${formStyle.Error} ${formStyle.XSmall}`}
                            >
                                <ErrorMessage name="retype_password" />
                            </div>
                        </div>
                        <div className={formStyle.Field}>
                            <button
                                type="submit"
                                className={formStyle.Button}
                                disabled={isSubmitting}
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PasswordSettings;
