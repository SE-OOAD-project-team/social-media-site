import React from 'react';
import { useState, useReducer, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { logout } from '../api/api.js';

import settingsImage from '../assets/settings.svg';

import './App.css';

import Header from './Header';

const App = () => {
    const username = window.localStorage.getItem('username');
    const token = window.localStorage.getItem('token');

    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    return (
        <div className="App">
            <Header username={username} title="Social Media Site" redirectHome={false}/>
            <div>
                <Link to={`/profile/${username}`}>Profile</Link>
                {token != null ? (
                    <>
                        <div>{`Username: ${username} Token: ${token.substring(
                            0,
                            5
                        )}...`}</div>

                        <div>
                            <Link to="/settings">
                                <img
                                    style={{ width: '30px', height: '30px' }}
                                    src={settingsImage}
                                    alt="Settings"
                                />
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <Link to="/login">Login</Link>
                        </div>
                        <div>
                            <Link to="/signup">Signup</Link>
                        </div>
                    </>
                )}
            </div>
            <button
                onClick={() => {
                    logout();
                    forceUpdate();
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default App;
