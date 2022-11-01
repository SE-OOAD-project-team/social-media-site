import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import App from './components/App';
import CreatePost from "./components/create-post/CreatePost";
import ViewPost from './components/view-post/ViewPost';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                {/* Remove create-post route after developing */}
                <Route path="/create-post" element={<CreatePost />} />
                {/* Remove create-post route after developing */}
                <Route path="/view-post" element={<ViewPost />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
