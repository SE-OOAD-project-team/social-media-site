import React from 'react';

import style from './NotFound.module.css';
import image from '../assets/NotFound.svg';

import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className={style.NotFound}>
            <img className={style.NotFoundImage} src={image} alt="" />
            <div className={style.NotFoundText}>
                <p>Could not find this page</p>
                <Link to="/">
                    <p>Go to Home page</p>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
