import React, { useState, useEffect } from "react";
import {
  PencilSquareIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { IF, IFFF } from "./url";
import { format } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";
import defaultImage from "../assets/images/dafaultImage.jpg";
import Trending from "./Trending";
import api from "../api/Api"; // Import the Axios instance

function Recent() {
  const { user } = useAuthContext();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState(new Set()); // State to manage favorite blogs
  const itemsPerPage = 5; // Adjust this number as needed
  

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
        const blogsData = response.data;

        // Fetch author details (including authorId) for each blog
        const blogsWithAuthorDetails = await Promise.all(
          blogsData.map(async (blog) => {
            try {
              // Assuming blog.authorId is available in the blog data
              const authorResponse = await api.get(
                `/api/user/${blog.authorId}`,
                {
                  headers: { Authorization: `Bearer ${user.token}` },
                }
              );
              const authorDetails = authorResponse.data;
              return {
                ...blog,
                authorUsername: authorDetails.username,
                authorId: authorDetails._id,
                authorImage: authorDetails.userimage,
              }; // Assuming authorId is directly accessible in authorDetails
            } catch (error) {
              console.error(
                `Error fetching author details for blog ${blog._id}:`,
                error
              );
              return { ...blog, authorId: null }; // Handle error case if author details cannot be fetched
            }
          })
        );

        setBlogs(blogsWithAuthorDetails);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, [user]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const response = await api.get("api/blogs/favorites/myfavorites", {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setFavorites(new Set(response.data.map((fav) => fav._id)));
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const handleFavorite = async (blogId) => {
    if (favorites.has(blogId)) {
      // Remove from favorites
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
        console.error("Error removing favorite:", error);
      }
    } else {
      // Add to favorites
      try {
        await api.post(
          `api/blogs/favorites/${blogId}`,
          { blogId },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setFavorites((prevFavorites) => new Set(prevFavorites).add(blogId));
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
    }
  };

  // Filter blogs based on the search term
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.blogbody.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.authorUsername &&
        blog.authorUsername.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <section className="md:col-span-9 md:mb-8 lg:p-6 sm:p-4">
        <div className="items-center justify-center p-4 mb-8 bg-white">
          <div className="flex items-center justify-between p-4 sm:p-2">
            <h3 className="text-xl font-semibold">Recent Posts</h3>

            <Link
              to="/createpost"
              className="text-xl font-semibold hover:text-gray-700 cursor-pointer h-8 w-8 flex items-center justify-center"
            >
              <PencilSquareIcon className="h-full w-full hidden sm:block" />
            </Link>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to page 1 when search term changes
                }}
                className="border p-2 pl-10 text-gray-800 bg-white border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="recentBlogs">
            {loading ? (
              <div className="container py-5 items-center justify-center">
                <p>Loading...</p>
              </div>
            ) : currentBlogs.length === 0 ? (
              <div className="container py-5">
                <p>No blogs found...</p>
              </div>
            ) : (
              currentBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="md:flex shadow-sm bg-white border border-gray-100 hover:border-gray-200 mt-4 hover:shadow-lg hover:shadow-zinc-300 cursor-pointer p-4 mb-4"
                >
                  <div className="blog-img mb-4 md:w-[35%] h-[220px] sm:w-[75%] overflow-hidden">
                    <img
                      src={IF + blog.image}
                      alt={blog.title}
                      onError={handleImageError}
                      className="blog-img h-full w-full object-cover inset-0 transform transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="blog-prev mb-4 md:ml-4 flex-col md:w-[65%]">
                    <div className="mb-2">
                      <Link to={`/postdetails/${blog._id}`}>
                        <h3 className="text-lg font-semibold text-blue-500 hover:underline">
                          {blog.title}
                        </h3>
                      </Link>

                      <div
                        className="mb-2 leading-relaxed text-xs md:text-sm"
                        dangerouslySetInnerHTML={{
                          __html:
                            blog.blogbody.slice(0, 300) + " ....Read more",
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-regular text-md text-blue-500 cursor-pointer flex items-center">
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
                      <span className="text-sm text-gray-400 cursor-pointer flex items-center">
                        Posted:{" "}
                        {`${format(
                          new Date(blog.createdAt),
                          "MMMM dd, yyyy"
                        )} `}
                      </span>
                    </div>
                    <div className="md:flex justify-end items-center mt-4">
                      <button
                        onClick={() => handleFavorite(blog._id)}
                        className={`text-sm ${
                          favorites.has(blog._id)
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        {favorites.has(blog._id) ? (
                          // remove to favorite
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 text-blue-400"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          // add to favorite
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 text-gray-400"
                          >
                            <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center mt-4 mb-8 py-4 border text-xs ">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 mx-1 border  ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-500"
                  : "bg-white text-blue-500"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 mx-1 border  ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 mx-1 border  ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-500"
                  : "bg-white text-blue-500"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </section>
      <section className="sm:block hidden md:col-span-3 md:mb-8 lg:p-6 sm:p-0 md:p-4">
        <Trending />
      </section>
    </>
  );
}

export default Recent;
