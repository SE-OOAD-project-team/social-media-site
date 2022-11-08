import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPage from './components/userPage/userPage';

import App from './components/App';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/NotFound';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/profile" element={<UserPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* <Route path="/edit_profile" element={<EditProfile />} /> */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
