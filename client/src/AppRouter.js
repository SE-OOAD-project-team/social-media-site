import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import App from './components/App';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
