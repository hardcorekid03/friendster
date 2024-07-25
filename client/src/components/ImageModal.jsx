// Modal.js
import React from "react";

const ImageModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-[99]"
      onClick={onClose}
    >
      <div
        className="bg-transparent relative  p-6 relative max-w-full md:h-[90%]  h-[60%] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hover:bg-gray-700  text-white px-3 py-1 rounded top-8 right-8 absolute cursor-pointer  ">
          <button className="text-white" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ImageModal;
