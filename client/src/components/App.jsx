import React from 'react';

import { Link } from 'react-router-dom';

import './App.css';

const App = () => {
    return (
        <div className="App">
            <div>
                <Link to="/profile">Profile</Link>
            </div>
            <div>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default App;
