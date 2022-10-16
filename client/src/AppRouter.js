import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import App from './components/App';
import CreatePost from "./components/create-post/CreatePost";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                {/* Remove create-post route after developing */}
                <Route path="/create-post" element={<CreatePost />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
