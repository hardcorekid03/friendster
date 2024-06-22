import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Recent from './Recent';
import PostDetails from './PostDetails';
import CreatePost from './CreatePost';

const AppRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<Recent />} />
                <Route path="/recent" element={<Recent />} />
                <Route path="/postdetails" element={<PostDetails />} />
                <Route path="/createpost" element={<CreatePost />} />
                <Route path="*" element={<h1>Error 404: Page not found!</h1>} />
            </Routes>
    );
};

export default AppRoutes;
