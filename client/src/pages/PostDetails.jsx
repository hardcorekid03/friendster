import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IF, IFFF } from "./url";
import { format } from "date-fns";
import Trending from "./Trending";
import { useAuthContext } from "../hooks/useAuthContext";
import defaultImage from "../assets/images/dafaultImage.jpg";
import useDeleteBlog from "../hooks/useDeleteBlog";
import api from "../api/Api";
import useFavoriteToggle from "../hooks/useFavoriteToggle";

function PostDetails() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogDetails, setBlogDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [fetchCommentsFlag, setFetchCommentsFlag] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState(new Set()); // State to manage favorite blogs
  const itemsPerPage = 5; // Adjust this number as needed

  const handleToggleFavorite = useFavoriteToggle(
    id,
    user,
    isFavorite,
    setIsFavorite
  );

  useEffect(() => {
    const fetchBlogDetails = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = response.data;

        try {
          // Fetch author details based on authorId from blog data
          const authorResponse = await api.get(`/api/user/${data.authorId}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          const authorDetails = authorResponse.data;

          // Combine blog data with author details
          const blogWithAuthorDetails = {
            ...data,
            authorUsername: authorDetails.username,
            authorId: authorDetails._id,
            authorImage: authorDetails.userimage,
          };

          setBlogDetails(blogWithAuthorDetails);

          // Check if the blog is a favorite
          const favoriteResponse = await api.get(
            `/api/blogs/favorites/check/${id}`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
          setIsFavorite(favoriteResponse.data.isFavorite);
        } catch (authorError) {
          console.error(
            `Error fetching author details for blog ${id}:`,
            authorError
          );
          setBlogDetails(data); // Set blog data without author details in case of error
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);

        // Additional error logging
        console.error(`Status: ${error.response?.status}`);
        console.error(`Data: ${error.response?.data}`);
      }

      setLoading(false);
    };

    fetchBlogDetails();
  }, [id, user]);

  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  const { handleDelete } = useDeleteBlog();

  const onDeleteClick = () => {
    handleDelete(blogDetails._id, blogDetails);
  };

  const onEditClick = () => {
    navigate(`/createpost/${blogDetails._id}`);
  };

  // Separate function for fetching comments
  const fetchComments = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/api/blogs/${id}/comments`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id, fetchCommentsFlag, user]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `/api/blogs/${id}/comments`,
        { text: commentText },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setComments([...comments, response.data]);
      setCommentText("");
      setFetchCommentsFlag((prevFlag) => !prevFlag); // Toggle fetchCommentsFlag
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await api.delete(`/api/blogs/${id}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      // Filter out the deleted comment from the comments state
      setComments(comments.filter((comment) => comment._id !== commentId));
      setFetchCommentsFlag((prevFlag) => !prevFlag); // Toggle fetchCommentsFlag
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentComments = comments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(comments.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <section className="md:col-span-9 md:mb-8 lg:p-6 sm:p-4">
        <div className="bg-white items-center justify-center p-4 mb-8">
          <div className="container mx-auto flex py-4 flex-col mb-4 border-b-2">
            {loading ? (
              <p>Loading...</p>
            ) : (
              blogDetails && (
                <>
                  <div className="mb-4 w-[100%] md:h-[400px] h-[250px] p-4 sm:p-2">
                    <img
                      className="h-full w-full object-cover"
                      alt="hero"
                      onError={handleImageError}
                      src={IF + blogDetails.image}
                    />
                  </div>
                  <div className="p-4 sm:p-2">
                    <div className="justify-center mb-2 border-b-2">
                      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        {blogDetails.title}
                      </h1>
                      <div className="font-semibold text-blue-400 cursor-pointer flex items-center justify-between mb-4">
                        <div>
                          <img
                            src={IFFF + blogDetails.authorImage}
                            alt="Avatar"
                            className="inline-block h-8 w-8 object-cover rounded-full mr-2"
                            onError={handleImageError}
                          />
                          <Link to={`/profile/${blogDetails.authorId}`}>
                            {blogDetails.authorUsername}
                          </Link>
                        </div>
                        <div className="text-regular text-sm text-gray-500 cursor-pointer flex items-center">
                          {format(
                            new Date(blogDetails.createdAt),
                            "MMMM dd,yyyy"
                          )}
                          <div
                            className="rounded-sm px-3 py-1 hover:bg-gray-100"
                            onClickCapture={handleToggleFavorite}
                          >
                            <span>
                              {"  "}
                              {isFavorite ? (
                                <div className="text-red-400">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    class="size-6"
                                  >
                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="">
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
                                </div>
                              )}
                            </span>
                          </div>
                          <div className="group inline-block">
                            <button className="outline-none focus:outline-none border ml-2 px-2 py-1 bg-white rounded-sm flex items-center w-10 h-10">
                              <span className="pr-1 flex-1">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fas"
                                  data-icon="ellipsis-h"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  className="svg-inline--fa fa-ellipsis-h fa-w-16 fa-3x"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                                    className=""
                                  ></path>
                                </svg>
                              </span>
                            </button>

                            <ul className="cursor-pointer bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32">
                              {blogDetails.authorUsername === user.username && (
                                <>
                                  <li
                                    className="rounded-sm px-3 py-1 hover:bg-gray-100"
                                    onClickCapture={onDeleteClick}
                                  >
                                    Delete
                                  </li>
                                  <li
                                    className="rounded-sm px-3 py-1 hover:bg-gray-100"
                                    onClickCapture={onEditClick}
                                  >
                                    Edit
                                  </li>
                                </>
                              )}
                              <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                                Share
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="mb-2 leading-relaxed text-xs md:text-sm"
                      dangerouslySetInnerHTML={{
                        __html: blogDetails.blogbody,
                      }}
                    />
                  </div>

                  <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Comments</h2>
                    <form onSubmit={handleCommentSubmit}>
                      <textarea
                        className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-4 mb-4 outline-blue-500"
                        rows="3"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment"
                      ></textarea>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2"
                      >
                        Submit
                      </button>
                    </form>

                    <div className="mt-4 justify-between">
                      {currentComments.map((comment) => (
                        <div key={comment._id} className="border-b mb-2 pb-2">
                          <p className="text-sm text-gray-700">
                            {comment.text}
                          </p>
                          <p className="text-xs text-gray-400">
                            <Link
                              to={`/profile/${comment.author._id}`}
                              className="hover:text-blue-700 hover:underline text-center"
                            >
                              {comment.author.username} 
                            </Link>
                            <span>
                             {" "} 
                              {format(
                                new Date(comment.createdAt),
                                "MMMM dd, yyyy"
                              )}
                            </span>
                          </p>
                          <div className="">
                            {(user.id === comment.author._id ||
                              user.id === blogDetails.authorId) && (
                              // Show delete button only if the comment author is the current user or the blog author is the current user
                              <button
                                className="text-gray-300 hover:text-red-500 text-xs"
                                onClick={() => handleCommentDelete(comment._id)}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center  mb-8 p-4 border mt-4 text-sm">
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
                      {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                      ).map((pageNumber) => (
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
                      ))}
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
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </section>
      <section className="sm:block hidden md:col-span-3 md:mb-8 lg:p-6 sm:p-0 md:p-4 ">
        <Trending />
      </section>
    </>
  );
}

export default PostDetails;
