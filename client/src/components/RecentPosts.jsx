import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/Api";
import { useAuthContext } from "../hooks/useAuthContext";

function RecentPosts() {
  const { user } = useAuthContext();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const response = await api.get("api/blogs/all", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, [user]);

  return (
    <div className="border shadow dark:border-spot-dark2 dark:bg-spot-dark2">
      <div className="relative font-semibold p-4 flex flex-col w-full bg-blue-400 dark:bg-spot-green">
        <h2 className="text-white">Recent Posts</h2>
      </div>
      <div className="relative flex flex-col justify-center w-full">
        {loading ? (
          <p>Loading...</p>
        ) : (
          blogs.slice(0, 5).map((blog, index) => (
            <Link to={`/postdetails/${blog._id}`} key={blog._id}>
              <div className="cursor-pointer w-full border-b border-gray-100  hover:bg-blue-100 dark:border-spot-dark3 dark:hover:bg-spot-dark3/20 transition-colors duration-200">
                <h3 className="hover:text-blue-500 hover:underline text-sm p-4 dark:text-spot-light dark:hover:text-spot-green">
                  {index + 1}. {blog.title.slice(0, 30)}
                  {"..."}
                </h3>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentPosts;
