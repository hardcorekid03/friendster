import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import useTitleAndSlug from "../hooks/useTitleAndSlug";

function CreatePost() {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const containerStyle = {
    height: "600px", // Set your desired height
  };

  const [blogbody, setBlogbody] = useState("");
  const [author, setAuthor] = useState("hardcorekid03");
  const [error, setError] = useState("");
  const [image, setImage] = useState("dasdasdsa");
  const { title, slug, handleTitleChange, resetTitleAndSlug } =
    useTitleAndSlug();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = { image, title, slug, blogbody, author };

    
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
      setAuthor("");
      setError(null);
      console.log("Blog posted!");
      alert("blog posted!");
    }
  };
  return (
    <div className="items-center justify-center p-2 mb-8">
      <div className="flex items-center justify-between p-2 sm:p-2">
        <h3 className="text-xl font-semibold">Create Post</h3>
        <Link
          to="/"
          className="text-xl font-semibold hover:text-gray-700 cursor-pointer h-8 w-8 justify-center"
        >
          <ArrowLeftIcon className="h-full w-full" />
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <div className="preview-img p-2">
            <label className="text-sm text-gray-400 font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
             Upload Banner
            </label>
            <input
              className="flex w-full  bg-white text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:text-lg file:font-lg"
              type="file"
              id="picture"
              onChange={handleChange}
            />
          </div>

          {/* Conditional rendering */}
          {selectedFile ? (
            <div className="w-[100%] md:h-[400px] h-[250px] p-2 sm:p-2 ">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected File"
                className="h-full w-full object-cover"
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
            </div>
          ) : (
            console.log("hello")
          )}
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
            <div className="px-2 py-8 mt-4 border-red-500 border">
              Error: {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
