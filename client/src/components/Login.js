import React from 'react';

import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

import './Login.css';

const Login = () => {
    return (
        <div className="LoginContainer">
            <div className="Login">
                <h1>Login</h1>
                <Formik>
                    <Form className="LoginForm">
                        <div>
                            <Field
                                className="LoginInput"
                                type="text"
                                value=""
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <Field
                                className="LoginInput"
                                type="password"
                                value=""
                                placeholder="Password"
                            />
                        </div>
                        <div className="LoginRow">
                            <button type="submit" className="LoginButton">
                                Submit
                            </button>
                            <div>
                                <Link to="/signup">Sign Up</Link>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;
