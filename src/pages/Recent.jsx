import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

function Recent({ setActiveComponent }) {
  return (
    <>
      <div className="items-center justify-center p-4">
        <div className="flex items-center justify-between p-4">
          <h3 className="text-xl font-semibold ">Recent Posts</h3>
          <PencilSquareIcon
            className=" text-xl font-semibold  hover:text-gray-700 cursor-pointer h-8 w-8 justify-center"
            onClick={() => setActiveComponent("CreatePost")}
          />
        </div>

        <div  className="md:flex shadow-md border-2  border-gray-200 hover:border-blue-200 mt-4 hover:shadow-lg hover:shadow-zinc-300 cursor-pointer p-4 mb-4"
        onClick={() => setActiveComponent("PostDetails")}
        >
          <div className="blog-img mb-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr6AUdNQEWnkDe9v5tiSc7m9ihU57cweKkew&s"
              style={{ height: 200, width: 400 }}
              className="blog-img object-cover h-auto w-auto sm:mb-4"
            />
          </div>
          <div className="blog-prev mb-4 md:ml-4">
            <h3 className="text-lg font-semibold">
              Lorem Ipsum Dolor sit Amet
            </h3>
            <p className="mb-8 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s.
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
