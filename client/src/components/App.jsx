import React from 'react';
import { useReducer } from 'react';

import { Link } from 'react-router-dom';
import { logout } from '../api/api.js';

import './App.css';

const App = () => {
    const username = window.localStorage.getItem('username');
    const token = window.localStorage.getItem('token');

    const [count, forceUpdate] = useReducer((x) => x + 1, 0);

    return (
        <div className="App">
            <div>
                <Link to="/profile">Profile</Link>
            </div>
            <div>
                {token != null ? (
                    <div>{`Username: ${username} Token: ${token.substring(
                        0,
                        5
                    )}...`}</div>
                ) : (
                    <Link to="/login">Login</Link>
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
