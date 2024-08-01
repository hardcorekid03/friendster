import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IF, IFFF } from "../url";
import { format } from "date-fns";

function UserPost({ loading, data, error, favorites, handleFavorite }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Adjust this number based on your preference

  // Calculate total pages
  const totalPages = Math.ceil(data.length / postsPerPage);

  // Calculate the current posts to display
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  // Pagination handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <div className="UserPost mb-8">
    {loading ? (
      <div className="container py-5 bg-spot-dark2 text-spot-light">
        <p>Loading...</p>
      </div>
    ) : data.length === 0 ? (
      <div className="container py-5 bg-spot-dark2 text-spot-light">
        <p>No blogs found...</p>
      </div>
    ) : (
      <>
        {currentPosts.map((blog, index) => (
          <div
            key={index}
            className="md:flex shadow-sm bg-white dark:bg-spot-dark2 border border-gray-100 dark:border-spot-dark3/40 rounded-lg hover:border-gray-200 dark:hover:border-spot-light dark:hover:bg-spot-dark3/20 mt-4 hover:shadow-lg dark:hover:shadow-spot-dark cursor-pointer p-4 mb-4"
          >
            <div className="blog-img mb-4 md:w-[35%] h-[220px] sm:w-[75%]">
              <img
                src={IF + blog.image}
                alt={blog.title}
                onError={error}
                className="h-full w-full object-cover"
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
                    __html: blog.blogbody.slice(0, 250) + " ....Read more",
                  }}
                />
              </div>
              <div className="md:flex justify-between items-center">
              <span className="text-regular text-md text-blue-500 dark:text-spot-green cursor-pointer flex items-center">
              <img
                    src={IFFF + blog.authorImage}
                    alt="Avatar"
                    className="inline-block h-8 w-8 object-cover rounded-full mr-2"
                    onError={error}
                  />
                  <Link to={`/profile/${blog.authorId}`}>
                    {blog.authorUsername}
                  </Link>
                </span>
                <span className="text-sm text-gray-400 dark:text-spot-light cursor-pointer flex items-center">
                  Posted:{" "}
                  {`${format(new Date(blog.createdAt), "MMM dd, yyyy")} `}
                </span>
              </div>

              <div className="md:flex justify-end items-center mt-4 ">
                <div
                  className={`flex items-center mt-4 justify-end ${
                    favorites.has(blog._id) ? "text-red-400" : "text-gray-400 dark:text-spot-light"
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
          </div>
        ))}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mb-8 p-4 border mt-4 text-sm border-spot-light/20">
            <button
              onClick={() => paginate(currentPage - 1)}
              className={`${
                currentPage === 1
          ? "bg-gray-100 text-gray-500 dark:bg-spot-dark2 dark:text-spot-light cursor-not-allowed"
          : "bg-white dark:bg-spot-dark text-blue-500 dark:text-spot-green"
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
              ? "bg-blue-500 dark:bg-spot-green text-white"
              : "bg-white dark:bg-spot-dark text-blue-500 dark:text-spot-green"
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
          ? "bg-gray-100 text-gray-500 dark:bg-spot-dark2 dark:text-spot-light cursor-not-allowed"
          : "bg-white dark:bg-spot-dark text-blue-500 dark:text-spot-green"
              } px-3 py-1 mx-1 rounded-r`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </>
    )}
  </div>
  );
}

export default UserPost;
