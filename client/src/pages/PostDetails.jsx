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
                        <span>
                          <img
                            src={IFFF + blogDetails.authorImage}
                            alt="Avatar"
                            className="inline-block h-8 w-8 object-cover rounded-full mr-2"
                            onError={handleImageError}
                          />
                          <Link to={`/profile/${blogDetails.authorId}`}>
                            {blogDetails.authorUsername}
                          </Link>
                        </span>
                        <span className="text-regular text-sm text-gray-500 cursor-pointer flex items-center">
                          {format(
                            new Date(blogDetails.createdAt),
                            "MMMM dd,yyyy"
                          )}
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
                              <li
                                className="rounded-sm px-3 py-1 hover:bg-gray-100"
                                onClickCapture={handleToggleFavorite}
                              >
                                <span>
                                  {"  "}
                                  {isFavorite ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      className="size-6 text-blue-500"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      className="size-6 text-gray-400"
                                    >
                                      <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                    </svg>
                                  )}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </span>
                      </div>
                    </div>

                    <div
                      className="mb-2 leading-relaxed text-xs md:text-sm"
                      dangerouslySetInnerHTML={{
                        __html: blogDetails.blogbody,
                      }}
                    />
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
