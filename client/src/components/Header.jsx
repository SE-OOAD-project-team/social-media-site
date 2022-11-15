import React from 'react';
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { join_path, get_profile } from '../api/api.js';
import { server_uri } from '../index.js';

import homeImage from '../assets/home.svg';
import accountImage from '../assets/account.svg';

import SearchBar from './SearchBar/SearchBar';

const Header = ({ title, username, redirectHome, style }) => {
    const [profilePicSrc, setProfilePicSrc] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                if (username != null) {
                    const profile = await get_profile(username);
                    if (profile.picture != null) {
                        setProfilePicSrc(profile.picture);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        })();
    });

    return (
        <header className="Header" style={style}>
            <h1>{title}</h1>
            <SearchBar placeholder="Search" />
            <Link
                to={
                    redirectHome
                        ? '/'
                        : username != null
                        ? '/settings'
                        : '/login'
                }
            >
                <img
                    src={
                        redirectHome
                            ? homeImage
                            : username != null && profilePicSrc
                            ? join_path(server_uri, '/image', profilePicSrc)
                            : accountImage
                    }
                    style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '100%',
                        objectFit: 'cover',
                    }}
                    alt="Profile"
                />
            </Link>
        </header>
    );
};

export default Header;
