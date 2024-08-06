import React from "react";
import { Link } from "react-router-dom";

const ScrollToTopButton = () => {
  return (
    <div className="fixed hidden md:block bottom-10 right-5 z-50 ">
      <Link to="/createpost">
        <button className="ScrollTop bg-blue-400 dark:bg-spot-green">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-white size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <p className="text dark:text-spot-light">Write Blog</p>
        </button>
      </Link>
    </div>
  );
};

export default ScrollToTopButton;
