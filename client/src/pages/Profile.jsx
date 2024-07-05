import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { IF } from "./url";
import { format } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";
import Trending from "./Trending";
import defaultImage from "../assets/images/dafaultImage.jpg";
import UserPost from "./postdetails/UserPost";
import api from "../api/Api"; // Import the Axios instance

function Profile() {
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
        const response = await api.get("api/blogs/", {
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
        <div className="items-center justify-center p-4 bg-white ">
          <div className="flex items-center justify-between p-4 sm:p-2">
            <h3 className="text-xl font-semibold ">User Profile</h3>
            <Link
              to="/"
              className="text-xl font-semibold hover:text-gray-700 cursor-pointer h-8 w-8 justify-center"
            >
              <ArrowLeftIcon className="h-full w-full" />
            </Link>
          </div>
          <div className="relative container mx-auto flex  py-4 items-center justify-center flex-col ">
            <div className="absolute top-2 right-2 bg-gray-400 text-white px-3 py-1 rounded ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 cursor-pointer  "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
            <div className=" mb-4 w-[100%] md:h-[400px] h-[250px] p-4 sm:p-2">
              <img
                className="h-full w-full object-cover"
                alt="hero"
                src="https://art.ngfiles.com/images/1805000/1805086_forks0rspoons_my-new-profile-banner.png?f1620391802"
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 sm:p-2 border-b-2 mb-4">
            <h3 className="text-md font-semibold hover:text-blue-400 cursor-pointer ">
              My Posts
            </h3>
            <h3 className="text-md font-semibold hover:text-blue-400 cursor-pointer ">
              Favorites
            </h3>
            <h3 className="text-md font-semibold hover:text-blue-400 cursor-pointer ">
              Settings
            </h3>
          </div>
          <div className="flex items-center justify-between p-4 sm:p-2 ">
            <input
              className="w-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:border-opacity-100 px-4 py-2"
              placeholder="Write something...."
            />
          </div>

          {/* <div className="UserPost items-center p-4 sm:p-2 border-b-2 mb-4">
            <>
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
                    className="md:flex shadow-sm bg-white rounded-lg border border-gray-100 hover:border-gray-200 mt-4 hover:shadow-lg hover:shadow-zinc-300 cursor-pointer p-4 mb-4"
                  >
                    <div className="blog-img mb-4 md:w-[35%] h-[220px] sm:w-[75%] ">
                      <img
                        src={IF + blog.image}
                        alt={blog.title}
                        onError={handleImageError}
                        className="blog-img h-full w-full object-cover "
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
                            __html:
                              blog.blogbody.slice(0, 250) + " ....Read more",
                          }}
                        />
                      </div>
                      <div className="md:flex justify-between items-center ">
                        <span className="text-regular text-md text-blue-500 cursor-pointer flex items-center">
                          <img
                            src="https://cdn-icons-png.freepik.com/512/168/168725.png"
                            alt="Avatar"
                            className="inline-block h-8 w-8 object-cover rounded-full mr-2"
                          />
                          {blog.author}
                        </span>
                        <span className="text-regular text-sm text-gray-400 cursor-pointer flex items-center ">
                          Posted:{" "}
                          {`${format(
                            new Date(blog.createdAt),
                            "MMM dd, yyyy"
                          )} `}
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
            </>
          </div> */}
          <div className="items-center p-4 sm:p-2 border-b-2 mb-4">
            <UserPost
              loading={loading}
              blogs={blogs}
              handleImageError={handleImageError}
            />
          </div>
        </div>
      </section>
      <section className="sm:block hidden md:col-span-3 md:mb-8 lg:p-6 sm:p-0 md:p-4 ">
        <Trending />
      </section>
    </>
  );
}

export default Profile;
