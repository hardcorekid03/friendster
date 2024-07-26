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
        <div
          className="hover:border-b-2 text-white top-8 right-8 absolute cursor-pointer"
          onClick={onClose}
        >
          <span className="text-white text-xs">Close</span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ImageModal;
