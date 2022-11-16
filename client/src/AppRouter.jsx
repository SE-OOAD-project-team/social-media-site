import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './components/App';
import UserPage from './components/userPage/userPage';
import Settings from './components/AccountSettings/Settings';
import NotFound from './components/NotFound';
import HomeFeed from './components/home-feed/HomeFeed';
import GeneratePost from './api/generate_posts';
import Login from './components/Login';
import Signup from './components/Signup';


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeFeed />} />
                <Route path="/profile/:username" element={<UserPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/testgen" element={<GeneratePost />} />
                <Route path="/notfound" element={<NotFound />} />
                {/* <Route path="/home-feed" element={<HomeFeed />} /> */}
                {/* <Route path="/capture" element={<Capture />} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
