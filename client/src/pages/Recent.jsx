import React, { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { IF } from "./url";
import { format } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";
import Trending from "./Trending";
import defaultImage from "../assets/images/dafaultImage.jpg";
import api from "../api/Api"; // Import the Axios instance

function Recent() {
  const { user } = useAuthContext();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  useEffect(() => {
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
        console.error(error);
        console.error("Error fetching blogs:", error);
      }
      setLoading(false);
    };
    if (user) {
      fetchBlogs();
    }
  }, [user]);

  return (
    <>
      <section className="md:col-span-9 md:mb-8 lg:p-6 sm:p-4">
        <div className="items-center justify-center p-4 mb-8 bg-white">
          <div className="flex items-center justify-between p-4 sm:p-2">
            <h3 className="text-xl font-semibold ">Recent Posts</h3>

            <Link
              to="/createpost"
              className="text-xl font-semibold hover:text-gray-700 cursor-pointer h-8 w-8 flex items-center justify-center"
            >
              <PencilSquareIcon className="h-full w-full hidden sm:block" />
            </Link>
          </div>

          {loading ? (
            <div className="container py-5">
              <p> Loading... </p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="container py-5">
              <p>No blogs found...</p>
            </div>
          ) : (
            blogs.map((blog, index) => (
              <div
                key={index}
                className="md:flex shadow-sm bg-white border border-gray-100 hover:border-gray-200 mt-4 hover:shadow-lg hover:shadow-zinc-300 cursor-pointer p-4 mb-4"
              >
                <div className="blog-img mb-4 md:w-[35%] h-[220px] sm:w-[75%] overflow-hidden ">
                  <img
                    src={IF + blog.image}
                    alt={blog.title}
                    onError={handleImageError}
                    className="blog-img h-full w-full object-cover inset-0 transform transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="blog-prev mb-4 md:ml-4 flex-col md:w-[65%] ">
                  <div className="mb-2 ">
                    <Link to={`/postdetails/${blog._id}`}>
                      <h3 className="text-lg font-semibold text-blue-500 hover:underline">
                        {blog.title}
                      </h3>
                    </Link>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: blog.blogbody.slice(0, 250) + " ....Read more",
                      }}
                    />
                  </div>
                  <div className="md:flex justify-between items-center ">
                    <span className="text-regular text-md text-blue-500 cursor-pointer flex items-center">
                      <img
                    src={IF + blog.image}
                    alt="Avatar"
                        className="inline-block h-8 w-8 object-cover rounded-full mr-2"
                      />
                      {blog.author}
                    </span>
                    <span className="text-regular text-sm text-gray-400 cursor-pointer flex items-center ">
                      Posted:{" "}
                      {`${format(new Date(blog.createdAt), "MMM dd, yyyy")} `}
                    </span>
                  </div>
                  <div className="md:flex justify-end items-center mt-4 ">
                    <span className="text-regular text-sm text-gray-400 cursor-pointer flex items-center ">
                      Add to favorites
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <section className="sm:block hidden md:col-span-3 md:mb-8 lg:p-6 sm:p-0 md:p-4 ">
        <Trending />
      </section>
    </>
  );
}

export default Recent;
