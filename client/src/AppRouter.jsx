import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './components/App';
import UserPage from './components/userPage/userPage';
import Settings from './components/AccountSettings/Settings';
import NotFound from './components/NotFound';
import HomeFeed from './components/home-feed/HomeFeed';
import LoginLandingPage from './components/landing-page/loginLandingPage';
import SignupLandingPage from './components/landing-page/SignupPage';
import GeneratePost from './api/generate_posts';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginLandingPage />} />
                <Route path="/app" element={<App />} />
                <Route path="/profile/:username" element={<UserPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<LoginLandingPage />} />
                <Route path="/signup" element={<SignupLandingPage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="notfound" element={<NotFound />} />
                <Route path="/home-feed" element={<HomeFeed />} />
                <Route path="/testgen" element={<GeneratePost />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
