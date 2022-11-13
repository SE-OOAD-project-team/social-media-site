import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './components/App';
import UserPage from './components/userPage/userPage';
import Settings from './components/AccountSettings/Settings';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/NotFound';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/profile/:username" element={<UserPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
                <Route path="notfound" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
