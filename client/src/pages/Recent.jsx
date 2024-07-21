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
            const authorResponse = await api.get(`/api/user/${blog.authorId}`, {
              headers: { Authorization: `Bearer ${user.token}` },
            });
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

  useEffect(() => {
    fetchBlogs();
  }, [user, favorites]); // Add 'favorites' as a dependency here

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
                    <div
                      className={`flex  items-center mt-4 md:justify-end
                             ${
                               favorites.has(blog._id)
                                 ? "text-blue-500"
                                 : "text-gray-400"
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
                            className="size-6 text-blue-500"
                          >
                            <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
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
                              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                            />
                          </svg>
                        )}
                      </button>
                      <span>{blog.favoritesCount}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex justify-center mt-4 mb-8 py-4 border text-sm">
          <button
            onClick={() => paginate(currentPage - 1)}
            className={`${
              currentPage === 1
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-white text-blue-500"
            } px-3 py-1 mx-1 rounded-l`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500"
                } px-3 py-2`}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            onClick={() => paginate(currentPage + 1)}
            className={`${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-white text-blue-500"
            } px-3 py-1 mx-1 rounded-r`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </section>

      <section className="sm:block hidden md:col-span-3 md:mb-8 lg:p-6 sm:p-0 md:p-4">
        <Trending />
      </section>
    </>
  );
}

export default Recent;
