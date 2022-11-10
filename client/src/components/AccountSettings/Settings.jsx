import React from 'react';
import { useState, useEffect } from 'react';

import Sidebar from './Sidebar';
import ProfileSettings from './Profile';
import PasswordSettings from './Password.jsx';

import { get_profile } from '../../api/api.js';

import style from './Settings.module.css';

import { Navigate } from 'react-router-dom';

const Settings = () => {
    const username = window.localStorage.getItem('username');
    if (username == null) {
        return <Navigate to="/login" />;
    }

    const [profile, setProfile] = useState({});
    useEffect(() => {
        (async () => {
            const profile = await get_profile(username);
            setProfile(profile);
        })();
    }, []);

    const tabs = ['Profile', 'Password'];
    const tab_components = [ProfileSettings, PasswordSettings].map(component => React.createElement(component, {profile, setProfile}));
    const [selected, setSelected] = useState(0);
    return (
        <div className={`${style.Container}`}>
            <header style={{ gridArea: 'a' }}>
                <h1>Settings</h1>
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
