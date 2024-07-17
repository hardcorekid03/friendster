import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IF } from "../url";
import { format } from "date-fns";

// Separate UserPost component
const UserPost = ({ loading, blogs, handleImageError, userProfile}) => (
  <div className="UserPost ">
    {loading ? (
      <div className="container py-5">
        <p>Loading...</p>
      </div>
    ) : blogs.length === 0 ? (
      <div className="container py-5">
        <p>No blogs found...</p>
      </div>
    ) : (
      blogs.map((blog, index) => (
        <div
          key={index}
          className="md:flex shadow-sm bg-white  border border-gray-100 hover:border-gray-200 mt-4 hover:shadow-lg hover:shadow-zinc-300 cursor-pointer p-4 mb-4"
        >
          <div className="blog-img mb-4 md:w-[35%] h-[220px] sm:w-[75%]">
            <img
              src={IF + blog.image}
              alt={blog.title}
              onError={handleImageError}
              className="blog-img h-full w-full object-cover"
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
                  __html: blog.blogbody.slice(0, 250) + " ....Read more",
                }}
              />
            </div>
            <div className="md:flex justify-between items-center">
              <span className="text-regular text-md text-blue-500 cursor-pointer flex items-center">
                <img
                  src="https://cdn-icons-png.freepik.com/512/168/168725.png"
                  alt="Avatar"
                  className="inline-block h-8 w-8 object-cover rounded-full mr-2"
                />
                {blog.authorId}
              </span>
              <span className="text-regular text-sm text-gray-400 cursor-pointer flex items-center">
                Posted: {`${format(new Date(blog.createdAt), "MMM dd, yyyy")} `}
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
  </div>
);

export default UserPost;
