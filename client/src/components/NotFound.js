import React from 'react';

import './NotFound.css';
import image from './NotFound.svg';

import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="NotFound">
            <img className="NotFoundImage" src={image} alt="" />
            <div className="NotFoundText">
                <p>Could not find this page</p>
                <Link to="/">
                    <p>Go to Home page</p>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
