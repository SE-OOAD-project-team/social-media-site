import React from 'react';
import { useState, useEffect } from 'react';

import Sidebar from './Sidebar';
import ProfileSettings from './Profile';
import PasswordSettings from './Password.jsx';
import FollowingSettings from './Following.jsx';

import Header from '../header/Header';

import style from './Settings.module.css';

import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();

    const username = window.localStorage.getItem('username');

    useEffect(() => {
        if (username == null) {
            navigate('/login', { replace: true });
        }
    });

    const [selected, setSelected] = useState(0);

    const tabs = ['Profile', 'Following', 'Password'];
    const tab_components = [
        ProfileSettings,
        FollowingSettings,
        PasswordSettings,
    ].map((component) => React.createElement(component, { username }));

    return (
        <div className={`${style.Container}`}>
            <Header title="Settings" style={{ gridArea: 'a' }} />
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
