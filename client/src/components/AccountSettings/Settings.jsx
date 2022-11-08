import React from 'react';
import { useState } from 'react';

import Sidebar from './Sidebar';
import ProfileSettings from './Profile';
import PasswordSettings from './Password.jsx';

import style from './Settings.module.css';

const Settings = () => {
    const tabs = ['Profile', 'Password'];
    const tab_components = [<ProfileSettings />, <PasswordSettings />];
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
