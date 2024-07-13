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
                authorId: authorDetails.username,
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
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [currentPage]);

  // Filter blogs based on the search term
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.blogbody.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.authorId &&
        blog.authorId.toLowerCase().includes(searchTerm.toLowerCase()))
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 pl-10 text-gray-800 bg-white  border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          {loading ? (
            <div className="container py-5 items-center justify-center">
              <p>Loading...</p>
            </div>
          ) : currentBlogs.length === 0 ? (
            <div className="container py-5">
              <p>No blogs found...</p>
            </div>
          ) : (
            currentBlogs.map((blog, index) => (
              <div
                key={index}
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
                      dangerouslySetInnerHTML={{
                        __html: blog.blogbody.slice(0, 250) + " ....Read more",
                      }}
                    />
                  </div>
                  <div className="md:flex justify-between items-center">
                    <span className="text-regular text-md text-blue-500 cursor-pointer flex items-center">
                      <img
                        src={IFFF + blog.authorImage}
                        alt="Avatar"
                        onError={handleImageError}
                        className="inline-block h-8 w-8 object-cover rounded-full mr-2"
                      />
                      {blog.authorId}
                    </span>
                    <span className="text-regular text-sm text-gray-400 cursor-pointer flex items-center">
                      Posted:{" "}
                      {`${format(new Date(blog.createdAt), "MMMM dd, yyyy")} `}
                    </span>
                  </div>
                  <div className="md:flex justify-end items-center mt-4">
                    <span className="text-regular text-sm text-gray-400 cursor-pointer flex items-center">
                      Add to favorites
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Pagination controls */}
          <div className="flex justify-center mt-4 mb-8 py-4  ">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 mx-1 border rounded ${
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
                className={`px-3 py-1 mx-1 border rounded ${
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
              className={`px-3 py-1 mx-1 border rounded ${
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
