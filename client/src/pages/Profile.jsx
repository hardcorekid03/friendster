import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Trending from "./Trending";

function Profile() {
  return (
    <>
    <section className="md:col-span-9 md:mb-8 lg:p-6 sm:p-4">
      <div className="icon-align p-2 bg-white shadow ">
      <div className="items-center justify-center p-4 sm:p-2 ">
        <div className="flex items-center justify-between p-4 sm:p-2">
          <h3 className="text-xl font-semibold ">User Profile</h3>
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
              src="https://art.ngfiles.com/images/1805000/1805086_forks0rspoons_my-new-profile-banner.png?f1620391802"
            />
          </div>
        </div>
        <div className="flex items-center justify-between p-4 sm:p-2 border-b-2 mb-4">
          <h3 className="text-md font-semibold hover:text-blue-400 cursor-pointer ">
            My Posts
          </h3>
          <h3 className="text-md font-semibold hover:text-blue-400 cursor-pointer ">
            Favorites
          </h3>
          <h3 className="text-md font-semibold hover:text-blue-400 cursor-pointer ">
            Settings
          </h3>
        </div>
        <div className="flex items-center justify-between p-4 sm:p-2 ">
          <input
            className="w-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:border-opacity-100 px-4 py-2"
            placeholder="Write something...."
          />
        </div>
      </div>
      </div>
    </section>
    <section className="sm:block hidden md:col-span-3 md:mb-8 lg:p-6 sm:p-0 md:p-4 ">
      <Trending />
    </section>
    </>



  );
}

export default Profile;
