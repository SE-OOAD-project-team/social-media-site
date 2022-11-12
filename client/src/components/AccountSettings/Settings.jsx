import React from 'react';
import { useState } from 'react';

import Sidebar from './Sidebar';
import ProfileSettings from './Profile';
import PasswordSettings from './Password.jsx';

import homeImage from '../../assets/home.svg';

import style from './Settings.module.css';

import { useNavigate, Link } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();
    
    const username = window.localStorage.getItem('username');
    if (username == null) {
        return navigate('/login');
    }

    const [selected, setSelected] = useState(0);

    const tabs = ['Profile', 'Password'];
    const tab_components = [ProfileSettings, PasswordSettings].map(
        (component) => React.createElement(component, { username })
    );

    return (
        <div className={`${style.Container}`}>
            <header style={{ gridArea: 'a' }}>
                <h1>Settings</h1>
                <Link to="/">
                    <img style={{ width: '36px' }} src={homeImage} alt="Home" />
                </Link>
            </header>
            <Sidebar
                style={{ gridArea: 'b' }}
                tabs={tabs}
                selected={selected}
                setSelected={setSelected}
            />
            <div style={{ gridArea: 'c' }}>{tab_components[selected]}</div>
        </div>
    );
};

export default Settings;
