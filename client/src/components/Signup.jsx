import React from 'react';

import { signup } from '../api/api.js';

import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import style from './Form.module.css';

const Signup = () => {
    const validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = 'Required';
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 8) {
            errors.password = 'Should have atleast 8 characters';
        }

        if (!values.retype_password) {
            errors.retype_password = 'Required';
        } else if (values.password !== values.retype_password) {
            errors.retype_password = "Passwords don't match";
        }

        return errors;
    };

    const navigate = useNavigate();

    const on_submit = async (
        values,
        { setSubmitting, setStatus, setFieldValue }
    ) => {
        try {
            await signup(values.username, values.password);
            setStatus('Success');
            navigate('/settings');
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
        <div className={style.Container}>
            <div className={style.Box}>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        retype_password: '',
                    }}
                    validate={validate}
                    onSubmit={on_submit}
                >
                    {({ isSubmitting, status }) => (
                        <Form className={style.Form}>
                            <h1>Signup</h1>
                            <div className={`${style.Error} ${style.Small}`}>
                                {status}
                            </div>
                            <div className={style.Field}>
                                <Field
                                    name="username"
                                    className={style.Input}
                                    type="text"
                                    placeholder="Username"
                                />
                                <div
                                    className={`${style.Error} ${style.XSmall}`}
                                >
                                    <ErrorMessage name="username" />
                                </div>
                            </div>
                            <div className={style.Field}>
                                <Field
                                    name="password"
                                    className={style.Input}
                                    type="password"
                                    placeholder="Password"
                                />
                                <div
                                    className={`${style.Error} ${style.XSmall}`}
                                >
                                    <ErrorMessage name="password" />
                                </div>
                            </div>
                            <div className={style.Field}>
                                <Field
                                    name="retype_password"
                                    className={style.Input}
                                    type="password"
                                    placeholder="Re-type Password"
                                />
                                <div
                                    className={`${style.Error} ${style.XSmall}`}
                                >
                                    <ErrorMessage name="retype_password" />
                                </div>
                            </div>
                            <div className={`${style.Row} ${style.Field}`}>
                                <button
                                    type="submit"
                                    className={style.Button}
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </button>
                                <div>
                                    <Link to="/login">Login</Link>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Signup;
