import React from 'react';

import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './Login.css';

const Login = () => {
    return (
        <div className="LoginContainer">
            <div className="Login">
                <h1>Login</h1>
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
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            console.log(values);
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="LoginForm">
                            <div className="LoginField">
                                <Field
                                    name="username"
                                    className="LoginInput"
                                    type="text"
                                    placeholder="Username"
                                />
                                <div className="LoginInvalid">
                                    <ErrorMessage name="username" />
                                </div>
                            </div>
                            <div className="LoginField">
                                <Field
                                    name="password"
                                    className="LoginInput"
                                    type="password"
                                    placeholder="Password"
                                />
                                <div className="LoginInvalid">
                                    <ErrorMessage name="password" />
                                </div>
                            </div>
                            <div className="LoginRow LoginField">
                                <button
                                    type="submit"
                                    className="LoginButton"
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
