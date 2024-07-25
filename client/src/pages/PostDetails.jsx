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
