import React, { useState } from "react";

const DeleteConfirmation = ({ onDelete, onCancel }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex flex-col md:flex-row justify-between items-center"
      role="alert"
    >
      <div className="flex flex-col md:flex-row items-center">
        <div className="py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className=" size-6 mr-4 text-red-700 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>
        </div>
        <div className=" sm:tems-center justify-center">
          <p className="font-bold">
            Are you sure you want to delete this blog?
          </p>
        </div>
      </div>
      <div className="mt-2 md:mt-0 flex gap-2">
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-6 rounded "
        >
          Yes
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-6 rounded"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
