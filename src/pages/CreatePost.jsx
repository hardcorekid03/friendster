import React from "react";
import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FileUploadComponent from "../components/FileUpload";

function CreatePost({ setActiveComponent }) {
  const [value, setValue] = useState("");

  const containerStyle = {
    height: "300px", // Set your desired height
  };

  const editorStyle = {
    height: "100%",
    overflowY: "auto", // Optional: Adds scroll for overflow content
  };

  console.log(value);

  return (
    <div className="items-center justify-center p-4">
      <div className="flex items-center justify-between p-4">
        <h3 className="text-xl font-semibold ">Create Post</h3>
        <ArrowLeftIcon
          className="text-xl font-semibold hover:text-gray-700 cursor-pointer h-8 w-8 justify-center"
          onClick={() => setActiveComponent("Recent")}
        />
      </div>
      <form>
        <div className="preview-img px-4">
          <label
            className="block text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm mb-4 cursor-pointer focus:outline-none"
            id="file_input"
            accept=".jpg,.jpeg,.png,.gif"
            type="file"
          />
          <input
            className="w-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:border-opacity-100 px-4 py-2"
            placeholder="Enter title"
          />
        </div>
        <div style={containerStyle} className="p-4 mb-4">
          <ReactQuill value={value} onChange={setValue} style={editorStyle} />
        </div>
      </form>
      <div className="px-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  inline-flex items-center">
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Save Post</span>
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
