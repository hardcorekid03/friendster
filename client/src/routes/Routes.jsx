import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Recent from "../pages/Recent";
import PostDetails from "../pages/PostDetails";
import CreatePost from "../pages/CreatePost";
import Profile from "../pages/Profile";
import UserDetails from "../pages/UserDetails";
import People from "../pages/People";
import Error404 from "../pages/error/Error404";
import Error500 from "../pages/error/Error500";

import { useAuthContext } from "../hooks/useAuthContext";

const AppRoutes = ({ filterMode, setFilterMode }) => {
  const { user } = useAuthContext();
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
  };
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Recent filterMode={filterMode} setFilterMode={setFilterMode} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        <Route
          path="/postdetails/:id"
          element={user ? <PostDetails /> : <Navigate to="/signin" />}
        />

        <Route
          path="/find-people"
          element={user ? <People /> : <Navigate to="/signin" />}
        />

        <Route
          path="/createpost"
          element={user ? <CreatePost /> : <Navigate to="/signin" />}
        />
        <Route
          path="/createpost/:id"
          element={user ? <CreatePost /> : <Navigate to="/signin" />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="/signin" />}
        />
        <Route
          path="/userdetails/:id"
          element={user ? <UserDetails /> : <Navigate to="/signin" />}
        />

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
    </>
  );
};

export default AppRoutes;
