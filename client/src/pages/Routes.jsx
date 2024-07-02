import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import Recent from "./Recent";
import PostDetails from "./PostDetails";
import CreatePost from "./CreatePost";
import Profile from "./Profile";
import Error505 from "./error/Error505";
import { useAuthContext } from "../hooks/useAuthContext";

const AppRoutes = () => {
  const { user } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={user ? <Recent /> : <Navigate to="/signin" />} />

      <Route
        path="/postdetails/:id"
        element= {<PostDetails />}
      />
      <Route
        path="/createpost"
        element={<CreatePost /> }
      />
      <Route
        path="/profile"
        element={<Profile />}
      />
      <Route
        path="/signin"
        element={!user ? <Signin /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/" />}
      />
      <Route path="*" element={<Error505 />} />
    </Routes>
  );
};

export default AppRoutes;
