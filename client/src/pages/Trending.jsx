import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import api from '../api/Api'; // Import the Axios instance
import { IFFF } from "./url";
import useFetchUser from "../hooks/useFetchUser";


function Trending() {
  const { user } = useAuthContext();
  const { userData, imageSrc, setImageSrc } = useFetchUser();

  const date = new Date(userData.createdAt || Date.now());
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const userImage = IFFF + userData.userimage;
  const handleImageError = (event) => {
    event.target.src = "https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg";
  };

  return (
    <>
      <div className="p-4 bg-zinc-300 shadow-lg flex flex-col items-center w-full"
          //  style={{ backgroundImage: `url(${baseUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="flex justify-center  w-[100px] h-[100px] mb-4 rounded-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            alt="hero"
            src={userImage}
            onError={handleImageError}
          />
        </div>
        <label className="block text-sm font-semibold mb-2" htmlFor="name">
          {userData.username}
        </label>
      </div>
      <div className="bg-white p-6">
        <label className="block text-sm font-medium mb-2">
          Bio:
          <span className="text-blue-400 font-normal">
            {" "}
            {userData.bio || ""}
          </span>
        </label>
        <label className="block text-sm font-medium mb-2">
          Location:{" "}
          <span className="text-blue-400 font-normal">
            {" "}
            {userData.location}
          </span>
        </label>
        <label className="block text-sm font-medium mb-2">
          Gender:{" "}
          <span className="text-blue-400 font-normal"> {userData.gender}</span>
        </label>
        <label className="block text-sm font-medium mb-2">
          Joined:{" "}
          <span className="text-blue-400 font-normal">
            {month + " " + year}
          </span>
        </label>
      </div>
    </>
  );
}

export default Trending;
