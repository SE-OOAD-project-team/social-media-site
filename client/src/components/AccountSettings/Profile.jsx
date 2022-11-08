import React from 'react';

import style from './TabComponent.module.css';
import formStyle from '../Form.module.css';

import {Formik, Form, Field, ErrorMessage } from 'formik'

const ProfileSettings = () => {
    return (
        <div className={`${style.TabComponent}`}>
            <h2>Profile</h2>
        </div>
    );
};

export default ProfileSettings;
