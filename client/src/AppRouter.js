import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './components/App';
import Login from './components/Login';
import NotFound from './components/NotFound';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
