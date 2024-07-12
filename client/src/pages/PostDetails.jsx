import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IF, IFFF, URL } from "./url";
import { format } from "date-fns";
import Trending from "./Trending";
import { useAuthContext } from "../hooks/useAuthContext";
import defaultImage from "../assets/images/dafaultImage.jpg";
import useAddToFavorites from "../hooks/useAddToFavorites";
import useDeleteBlog from "../hooks/useDeleteBlog";
import api from "../api/Api";

function PostDetails() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [blogDetails, setBlogDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToFavorites } = useAddToFavorites(user, blogDetails);

  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

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
            authorImage: authorDetails.userimage,
          };

          setBlogDetails(blogWithAuthorDetails);
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
        <div className="bg-white  items-center justify-center p-4  mb-8 ">
          <div className="container mx-auto flex  py-4  flex-col mb-4 border-b-2 ">
            {loading ? (
              <p>Loading...</p>
            ) : (
              blogDetails && (
                <>
                  <div className=" mb-4 w-[100%] md:h-[400px] h-[250px] p-4 sm:p-2">
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
                            src={IFFF + blogDetails.authorImage} // Replace with the actual path to your avatar image
                            alt="Avatar"
                            className="inline-block h-8 w-8 object-cover rounded-full mr-2"
                            onError={handleImageError}

                          />
                          {blogDetails.authorUsername}
                        </span>
                        <span className="text-regular text-sm text-gray-500 cursor-pointer flex items-center">
                          {format(
                            new Date(blogDetails.createdAt),
                            "MMMM/dd/yyyy"
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
                            <ul className="cursor-pointer  bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32">
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
                                    {" "}
                                    Edit
                                  </li>
                                </>
                              )}
                              <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                                {" "}
                                Share
                              </li>
                              <li
                                className="rounded-sm px-3 py-1 hover:bg-gray-100"
                                onClickCapture={addToFavorites}
                              >
                                Add to Favorites
                              </li>
                            </ul>
                          </div>
                        </span>
                      </div>
                    </div>

                    <div className="mb-2 leading-relaxed">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: blogDetails.blogbody,
                        }}
                      />
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
