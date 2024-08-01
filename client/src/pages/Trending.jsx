import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { IFFF } from "./url";
import useFetchUser from "../hooks/useFetchUser";


function Trending() {
  const { userData} = useFetchUser();
  const date = new Date(userData.createdAt || Date.now());
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const userImage = IFFF + userData.userimage;
  const handleImageError = (event) => {
    event.target.src = "https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg";
  };

  return (
    <>
      <div className="p-4 bg-gray-200 shadow-lg flex flex-col items-center w-full  border dark:border-spot-dark2 dark:bg-spot-dark2"
          //  style={{ backgroundImage: `url(${baseUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="flex justify-center border-2 shadow-sm border-white  w-[100px] h-[100px] mb-4 rounded-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            alt="hero"
            src={userImage}
            onError={handleImageError}
          />
        </div>
        <label className="block text-sm font-semibold mb-2 dark:text-spot-light dark:hover:text-spot-green">
          @{userData.username}
        </label>
        <label className="block text-sm font-medium">
          <span className="text-blue-400 font-normal dark:text-spot-light">
            {" "}
            {userData.bio || ""}
          </span>
        </label>
      </div>
      <div className="bg-white p-6 dark:bg-spot-dark dark:text-spot-light border-2 dark:border-spot-dark2">
        <label className="block text-sm font-medium mb-2 ">
          Location:{" "}
          <span className="text-blue-400 font-normal dark:text-spot-light">
            {" "}
            {userData.location}
          </span>
        </label>
        <label className="block text-sm font-medium mb-2 ">
          Joined:{" "}
          <span className="text-blue-400 font-normal  dark:text-spot-light">
            {month + " " + year}
          </span>
        </label>
      </div>
    </>
  );
}

export default Trending;
