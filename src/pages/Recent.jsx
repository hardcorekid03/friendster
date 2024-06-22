import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

function Recent() {
  const navigate = useNavigate();
  const handleClick = () => {
    // Navigate to '/destination-path'
    navigate("/postdetails");
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

        <div
          className="md:flex shadow-md border-2  border-gray-100 hover:border-blue-200 mt-4 hover:shadow-lg hover:shadow-zinc-300 cursor-pointer p-4 mb-4"
        >
          <div className="blog-img mb-4 md:w-[35%] h-[200px]  sm:w-[75%] ">
            <img
              src="https://www.typingpal.com/en/blog/lorem-ipsum-the-ultimate-placeholder-text/lorem-ipsum@2x.png"
              className="blog-img h-full w-full object-cover "
            />
          </div>
          <div className="blog-prev mb-4 md:ml-4 flex-col md:w-[65%]">
            <h3 className="text-lg font-semibold"           onClick={handleClick}>
              Lorem Ipsum Dolor sit Amet
            </h3>
            <p className="mb-2 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
            <p className="font-semibold text-gray-400 mb-4" onClick={handleClick}>Read more...</p>
            <Link to="/createpost">
            <span className="font-semibold text-blue-400 cursor-pointer flex items-center">
              <img
                src="https://cdn-icons-png.freepik.com/512/168/168725.png" // Replace with the actual path to your avatar image
                alt="Avatar"
                className="inline-block h-8 w-8 object-cover rounded-full mr-2"
              />
             hardcorekid03
            </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recent;
