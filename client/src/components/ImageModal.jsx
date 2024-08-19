import React from "react";

const ImageModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed h-screen inset-0 flex items-center justify-center bg-black bg-opacity-80 z-[99]"
      onClick={onClose}
    >
      <button
        className="absolute top-2 right-2 text-white rounded-full p-2"
        onClick={onClose}
      >
        &#10005;
      </button>

      <div
        className="bg-transparent relative  p-6 relative max-w-full md:h-[90%]  h-[60%] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ImageModal;
