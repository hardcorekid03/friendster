import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function PostDetails({ setActiveComponent }) {
  return (
    <div className="items-center justify-center p-4">
      <div className="flex items-center justify-between p-4">
        <h3
          className="text-xl font-semibold "
          onClick={() => setActiveComponent("Recent")}
        >
          Post Details
        </h3>
        <ArrowLeftIcon
          className="text-xl font-semibold hover:text-gray-700 cursor-pointer h-8 w-8 justify-center"
          onClick={() => setActiveComponent("Recent")}
        />
      </div>
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <img
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-cover"
          alt="hero"
          src="https://dummyimage.com/720x600"
        />
        <div className="">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          What is Lorem Ipsum?
          </h1>
          <p className="mb-8 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <span className="font-semibold text-blue-700 cursor-pointer">
            by: @hardcorekid03
          </span>
          <div className="flex justify-center"></div>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
