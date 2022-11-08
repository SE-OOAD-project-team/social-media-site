import React from 'react';

import { login } from '../api/api.js';

import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import style from './Login.module.css';

const Login = () => {
    const validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = 'Required';
        }

        if (!values.password) {
            errors.password = 'Required';
        }
        
        return errors;
    };
    
    const navigate = useNavigate();
    
    const on_submit = async (
        values,
        { setSubmitting, setStatus, setFieldValue }
    ) => {
        try {
            await login(values.username, values.password);
            setStatus('Success');
            navigate(window.history.state != null ? -1 : '/');
        } catch (e) {
            // setStatus('Invalid Username or password');
            setStatus(`Error: ${e.message}`);
            setFieldValue('password', '', false);
            console.log(e);
        }
        setSubmitting(false);
    };

    return (
        <div className={style.Container}>
            <div className={style.Login}>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validate={validate}
                    onSubmit={on_submit}
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
