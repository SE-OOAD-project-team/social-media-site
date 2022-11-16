import React from 'react';
import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import './Header.css';

import { join_path, get_profile, logout } from '../../api/api.js';
import { server_uri } from '../../index.js';

import accountImage from '../../assets/account.svg';

import SearchBar from '../SearchBar/SearchBar';

const Header = ({ title, style, setCreatePost }) => {
    const username = window.localStorage.getItem('username');

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

    const navigate = useNavigate();

    const [selected, setSelected] = useState(false);

    return (
        <header className="Header" style={style}>
            <h2 style={{marginLeft: '10px'}}>{title}</h2>
            <SearchBar placeholder="Search" />
            {username != null && setCreatePost && (
                <div id="create-post-btn" onClick={() => setCreatePost(true)}>
                    Create a Post
                </div>
            )}
            {username == null && (
                <Link to="/login" style={{textDecoration: 'none'}}>
                    <div id="create-post-btn">Login</div>
                </Link>
            )}
            <div onClick={() => setSelected(!selected)}>
                <img
                    src={
                        username != null && profilePicSrc
                            ? join_path(server_uri, '/image', profilePicSrc)
                            : accountImage
                    }
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '100%',
                        objectFit: 'cover',
                        cursor: 'pointer',
                    }}
                    alt="Profile"
                />
                {selected && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '65px',
                            right: '10px',
                            backgroundColor: 'white',
                            width: '100px',
                            boxShadow: '0 0 1px',
                            padding: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Link to="/">Home</Link>
                        {username != null && (
                            <Link to={`/profile/${username}`}>Profile</Link>
                        )}
                        {username != null && (
                            <Link to="/settings">Settings</Link>
                        )}
                        {username != null && (
                            <Link
                                onClick={() => {
                                    logout();
                                    navigate(0, { replace: true });
                                }}
                            >
                                Logout
                            </Link>
                        )}
                        {username == null && <Link to="/login">Login</Link>}
                        {username == null && <Link to="/signup">Sign Up</Link>}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
