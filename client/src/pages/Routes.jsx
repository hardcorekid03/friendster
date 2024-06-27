import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Recent from './Recent';
import PostDetails from './PostDetails';
import CreatePost from './CreatePost';
import Profile from './Profile';
import Error505 from './error/Error505';

const AppRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<Recent />} />
                <Route path="/recent" element={<Recent />} />
                <Route path="/postdetails/:id" element={<PostDetails />} />
                <Route path="/createpost" element={<CreatePost />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/505" element={<Error505 />} />
                <Route path="*" element={<h1>Error 404: Page not found!</h1>} />
            </Routes>
    );
};

export default AppRoutes;
