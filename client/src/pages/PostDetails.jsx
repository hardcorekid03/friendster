import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function PostDetails() {
  return (
    <>
        <div className="items-center justify-center p-4 sm:p-2 ">
      <div className="flex items-center justify-between p-4 sm:p-2">
        <h3 className="text-xl font-semibold ">Post Details</h3>
        <Link
          to="/"
          className="text-xl font-semibold hover:text-gray-700 cursor-pointer h-8 w-8 justify-center"
        >
          <ArrowLeftIcon className="h-full w-full" />
        </Link>
      </div>
      <div className="container mx-auto flex  py-4 items-center justify-center flex-col ">
        <div className=" mb-4 w-[100%] md:h-[400px] h-[250px] p-4 sm:p-2">
          <img
            className="h-full w-full object-cover"
            alt="hero"
            src="https://www.typingpal.com/en/blog/lorem-ipsum-the-ultimate-placeholder-text/lorem-ipsum@2x.png"
          />
        </div>
        <div className="p-4 sm:p-2">
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
    </>

  );
}

export default PostDetails;
