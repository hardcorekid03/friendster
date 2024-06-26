import React, { useState, useRef } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import useTitleAndSlug from "../hooks/useTitleAndSlug";
import axios from "axios";

function CreatePost() {
  const fileInputRef = useRef(null);
  
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImage(event.target.files[0]);
  };

  const handleReset = () => {
    setSelectedFile(null);
    fileInputRef.current.value = null;
  };

  const handleSvgClick = () => {
    fileInputRef.current.click();
  };

  const containerStyle = {
    height: "600px", // Set your desired height
  };
  // states for blog posting
  const [blogbody, setBlogbody] = useState("");
  const [author, setAuthor] = useState("hardcorekid03");
  const [authorId, setAuthorId] = useState("123456789");
  const [image, setImage] = useState(null);
  const { title, slug, handleTitleChange, resetTitleAndSlug } =
    useTitleAndSlug();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = { image, title, slug, blogbody, author, authorId };

    if (image) {
      const data = new FormData();
      const alphanumericKey = Math.random().toString(36).substr(2, 9);
      const filename = `blog-${alphanumericKey}-${Date.now()}${image.name}`;
      data.append("img", filename);
      data.append("file", image);
      blog.image = filename;

      // console.log(data)
      //img upload
      try {
        const imgUpload = await axios.post("/api/upload", data);
        console.log(imgUpload.data);
      } catch (err) {
        console.log(err);
      }
    }
    const response = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify(blog),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      resetTitleAndSlug();
      setBlogbody("");
      setError(null);
      setSelectedFile(null);
      fileInputRef.current.value = null;
      console.log("Blog posted!");
      alert("blog posted! " + slug);
    }
  };
  return (
    <div className="p-2 mb-8">
      <div className="flex  justify-between p-2 sm:p-2">
        <h3 className="text-xl font-semibold">Create Post</h3>
        <Link
          to="/"
          className="text-xl font-semibold hover:text-gray-700 cursor-pointer h-8 w-8 justify-center"
        >
          <ArrowLeftIcon className="h-full w-full" />
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className=" mb-2 p-2">
          <div className="hidden preview-img mb-2">
            <label className="text-sm text-gray-400 font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Upload Banner
            </label>
            <input
              className="flex w-full cursor-pointer bg-white text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:text-lg file:font-lg"
              type="file"
              accept="image/*"
              id="picture"
              ref={fileInputRef}
              onChange={handleChange}
            />
          </div>

          {/* Conditional rendering */}

          <div className="relative cursor-pointer flex items-center justify-center bg-gray-00 border-dashed border-2 border-gray-300 hover:border-blue-300 hover:shadow w-[100%] md:h-[250px] h-[250px] p-2">
            <div className="absolute top-2 right-2 bg-gray-400 text-white px-3 py-1 rounded ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 "
                onClick={handleReset}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>

            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected File"
                className="object-contain w-full h-full cursor-pointer"
                onClick={handleSvgClick}
              />
            ) : (
              <div className="flex flex-col justify-center items-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-12 cursor-pointer"
                  onClick={handleSvgClick}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <h1 className="text-sm "> Upload Image</h1>
              </div>
            )}
          </div>
        </div>

        <div className="preview-img p-2">
          {/* <FileUpload onFileSelect={handleFileSelect} /> */}
          <input
            className="w-full border border-gray-300 focus:border-blue-500 focus:outline-none focus:border-opacity-100 px-4 py-2"
            placeholder="Enter blog title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div
          style={containerStyle}
          className="p-2 w-[100%] md:h-[400px] h-[250px]"
        >
          <ReactQuill
            value={blogbody}
            placeholder="Write a blog now..."
            onChange={(e) => setBlogbody(e)}
            className="h-full w-full"
          />
        </div>
        <div className="px-2 py-8 mt-10">
          <button className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 inline-flex items-center">
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Save Post</span>
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 inline-flex items-center">
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Cancel</span>
          </button>
          {error && (
            <div className="px-2 py-8 mt-4 border-red-400 border bg-red-200">
              All fields are required!
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
