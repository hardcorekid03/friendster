import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";


function Recent() {
  const navigate = useNavigate();
  const handleClick = () => {
    // Navigate to '/destination-path'
    navigate('/postdetails');
  };
  return (
    <>
      <div className="items-center justify-center p-4">
        <div className="flex items-center justify-between p-4">
          <h3 className="text-xl font-semibold ">Recent Posts</h3>
          <Link
            to="/createpost"
            className="text-xl font-semibold hover:text-gray-700 cursor-pointer h-8 w-8 flex items-center justify-center"
          >
            <PencilSquareIcon className="h-full w-full" />
          </Link>
        </div>

        <div onClick={handleClick} className="md:flex shadow-md border-2  border-gray-100 hover:border-blue-200 mt-4 hover:shadow-lg hover:shadow-zinc-300 cursor-pointer p-4 mb-4">
          <div className="blog-img mb-4 md:w-[35%] h-[200px]  sm:w-[75%] ">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr6AUdNQEWnkDe9v5tiSc7m9ihU57cweKkew&s"
              className="blog-img h-full w-full object-cover "
            />
          </div>
          <div className="blog-prev mb-4 md:ml-4 flex-col md:w-[65%]">
            <h3 className="text-lg font-semibold">
              Lorem Ipsum Dolor sit Amet
            </h3>
            <p className="mb-8 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
            <span className="font-semibold text-blue-700 cursor-pointer">
              by: @hardcorekid03
            </span>
            <p className="font-semibold text-gray-400">Read more...</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recent;
