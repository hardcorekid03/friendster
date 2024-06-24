import React from "react";
import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import FileUpload from "../components/FileUpload";

function CreatePost() {
  const [value, setValue] = useState("");

  const containerStyle = {
    height: "600px", // Set your desired height
  };

  const editorStyle = {
    height: "100%",
  };

  console.log(value);

  return (
    <>
      <div className="items-center justify-center p-2 mb-8">
        <div className="flex items-center justify-between p-4 sm:p-2">
          <h3 className="text-xl font-semibold ">Create Post</h3>
          <Link
            to="/"
            className="text-xl font-semibold hover:text-gray-700 cursor-pointer h-8 w-8 justify-center"
          >
            <ArrowLeftIcon className="h-full w-full" />
          </Link>
        </div>
        <form>
          <div className="preview-img p-4">
            <FileUpload />
            <input
              className="w-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:border-opacity-100 px-4 py-2"
              placeholder="Enter blog title"
            />
          </div>
          <div
            style={containerStyle}
            className="p-4 w-[100%] md:h-[400px] h-[250px] "
          >
            <ReactQuill
              value={value}
              onChange={setValue}
              className="h-full w-full "
            />
          </div>
        </form>
        <div className="px-4 py-8 mt-10">
          <button className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  inline-flex items-center">
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Save Post</span>
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4  inline-flex items-center">
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
