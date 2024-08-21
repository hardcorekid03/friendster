import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { IF, IFFF } from "./url";
import { format } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";
import defaultImage from "../assets/images/dafaultImage.jpg";
import ScrollToTopButton from "../components/ScrollToTop";
import api from "../api/Api"; // Import the Axios instance
import RecentPosts from "../components/RecentPosts";
import Calendar from "../components/Calendar";

function Recent({ filterMode }) {
  const { user } = useAuthContext();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [visibleBlogs, setVisibleBlogs] = useState(5); // State for pagination

  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  const fetchBlogs = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const response = await api.get("api/blogs/all", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      let blogsData = response.data;

      if (filterMode === "favorites") {
        blogsData = blogsData.sort(
          (a, b) => b.favoritesCount - a.favoritesCount
        );
      }

      const blogsWithAuthorDetails = await Promise.all(
        blogsData.map(async (blog) => {
          try {
            const authorResponse = await api.get(`/api/user/${blog.authorId}`, {
              headers: { Authorization: `Bearer ${user.token}` },
            });
            const authorDetails = authorResponse.data;
            return {
              ...blog,
              authorUsername: authorDetails.username,
              authorId: authorDetails._id,
              authorImage: authorDetails.userimage,
            };
          } catch (error) {
            console.error(
              `Error fetching author details for blog ${blog._id}:`,
              error
            );
            return { ...blog, authorId: null };
          }
        })
      );

      setBlogs(blogsWithAuthorDetails);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, [user, favorites, filterMode]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get("api/blogs/favorites/myfavorites", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFavorites(new Set(response.data.map((fav) => fav._id)));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [user]);

  const handleFavorite = async (blogId) => {
    if (favorites.has(blogId)) {
      try {
        await api.delete(`api/blogs/favorites/${blogId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFavorites((prevFavorites) => {
          const newFavorites = new Set(prevFavorites);
          newFavorites.delete(blogId);
          return newFavorites;
        });
      } catch (error) {
        console.error(
          "Error removing favorite:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      try {
        await api.post(
          `api/blogs/favorites/${blogId}`,
          { blogId },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setFavorites((prevFavorites) => new Set(prevFavorites).add(blogId));
      } catch (error) {
        console.error(
          "Error adding favorite:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.blogbody.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.authorUsername &&
        blog.authorUsername.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSeeMore = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 5);
  };

  const allBlogsVisible = visibleBlogs >= filteredBlogs.length;

  return (
    <>
      <ScrollToTopButton />

      <section className="md:col-span-9 mb-8 lg:p-6 py-4 mb-12 md:mb-2">
        <div className="items-center justify-center p-4 bg-white dark:bg-spot-dark2">
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 pl-10 text-gray-800 focus:outline-none border-gray-300 bg-white w-full text-sm px-4 py-3 outline-blue-500 dark:text-spot-light dark:bg-spot-dark2 dark:focus:bg-spot-dark dark:border-spot-light dark:focus:border-spot-green"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-spot-light" />
            </div>
          </div>

          <div className="recentBlogs">
            {loading ? (
              <div className="container flex py-5 items-center justify-center dark:text-spot-light">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-spot-white"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="container py-5">
                <p className="dark:text-spot-light">No blogs found...</p>
              </div>
            ) : (
              <>
                {filteredBlogs.slice(0, visibleBlogs).map((blog) => (
                  <div
                    key={blog._id}
                    className="md:flex shadow-sm bg-white dark:bg-spot-dark2 border border-gray-100 dark:border-spot-dark3/40 rounded-lg hover:border-gray-200 hover:bg-gray-50 dark:hover:border-spot-light dark:hover:bg-spot-dark3/20 mt-4 hover:shadow-lg dark:hover:shadow-spot-dark cursor-pointer p-4 mb-4"
                  >
                    <div className="blog-img mb-4 md:w-[35%] h-[220px] sm:w-[75%] overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        onError={handleImageError}
                        className="blog-img h-full w-full object-cover inset-0 transform transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <div className="blog-prev mb-4 md:ml-4 flex-col md:w-[65%]">
                      <div className="mb-2">
                        <Link to={`/postdetails/${blog._id}`}>
                          <h3 className="text-lg font-semibold text-blue-500 dark:text-spot-light dark:hover:text-spot-green hover:underline">
                            {blog.title}
                          </h3>
                        </Link>

                        <div
                          className="mb-2 leading-relaxed text-xs md:text-sm text-gray-800 dark:text-spot-light"
                          dangerouslySetInnerHTML={{
                            __html:
                              blog.blogbody.slice(0, 300) + " ....Read more",
                          }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-regular text-md text-blue-500 dark:text-spot-green cursor-pointer flex items-center">
                          <img
                            src={IFFF + blog.authorImage}
                            alt="Avatar"
                            onError={handleImageError}
                            className="inline-block h-8 w-8 object-cover rounded-full mr-2"
                          />
                          <Link to={`/profile/${blog.authorId}`}>
                            {blog.authorUsername}
                          </Link>
                        </span>
                        <span className="text-sm text-gray-400 dark:text-spot-light">
                          {format(new Date(blog.createdAt), "MMMM dd, yyyy")}
                        </span>
                      </div>
                      <div
                        className={`flex  items-center  justify-end ${
                          favorites.has(blog._id)
                            ? "text-red-400"
                            : "text-gray-400 dark:text-spot-light"
                        }`}
                      >
                        <button
                          onClick={() => handleFavorite(blog._id)}
                          className="text-sm px-4 py-2 rounded"
                        >
                          {favorites.has(blog._id) ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-6"
                            >
                              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                              />
                            </svg>
                          )}
                        </button>
                        <span>{blog.favoritesCount}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {!allBlogsVisible && (
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={handleSeeMore}
                      className="w-full px-4 py-2 text-white text-sm bg-blue-500 rounded-md hover:bg-blue-600 dark:bg-spot-green dark:hover:bg-spot-dark3/50 mb-10 md:mb-2"
                    >
                      See more...
                    </button>
                  </div>
                )}
                {allBlogsVisible && filteredBlogs.length > 0 && (
                  <div className="container py-5 text-center">
                    <p className="w-full px-4 py-2 border border-gray-100 dark:text-spot-light dark:border-spot-light ">
                      End of results
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      <section className="sm:block hidden md:col-span-3 md:mb-8 lg:p-6 sm:p-0 md:p-4 ">
        <RecentPosts />
        <Calendar />
      </section>
    </>
  );
}

export default Recent;
