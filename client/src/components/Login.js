import React from 'react';

import { login } from '../api/api.js';

import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import style from './Login.module.css';

const Login = () => {
    return (
        <div className={style.Container}>
            <div className={style.Login}>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.username) {
                            errors.username = 'Required';
                        }

                        if (!values.password) {
                            errors.password = 'Required';
                        }

                        return errors;
                    }}
                    onSubmit={async (
                        values,
                        { setSubmitting, setStatus, setFieldValue }
                    ) => {
                        if (await login(values.username, values.password)) {
                            setStatus('Success');
                        } else {
                            setStatus('Invalid Username or password');
                            setFieldValue('password', '', false);
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, status }) => (
                        <Form className={style.Form}>
                            <h1>Login</h1>
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
                            <div className={`${style.Row} ${style.Field}`}>
                                <button
                                    type="submit"
                                    className={style.Button}
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </button>
                                <div>
                                    <Link to="/signup">Sign Up</Link>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
