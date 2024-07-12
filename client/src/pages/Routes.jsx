import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import Recent from "./Recent";
import PostDetails from "./PostDetails";
import CreatePost from "./CreatePost";
import Profile from "./Profile";
import UserDetails from "./UserDetails";
import Error404 from "./error/Error404";
import Error500 from "./error/Error500";
import { useAuthContext } from "../hooks/useAuthContext";

const AppRoutes = () => {
  const { user } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={user ? <Recent /> : <Navigate to="/signin" />} />

      <Route path="/postdetails/:id" element={<PostDetails />} />
      <Route path="/createpost" element={<CreatePost />} />
      <Route path="/createpost/:id" element={<CreatePost />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/userdetails" element={<UserDetails />} />

      
      <Route
        path="/signin"
        element={!user ? <Signin /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/" />}
      />
      <Route path="/500" element={<Error500 />} />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRoutes;
