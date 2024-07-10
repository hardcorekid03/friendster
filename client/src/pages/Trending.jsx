import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import api from '../api/Api'; // Import the Axios instance
import { IFF } from "./url";

function Trending() {
  const { user } = useAuthContext();
  const [userData, setUserdata] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        return;
      }

      try {
        const response = await api.get(`/api/user/${user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (response.status !== 200) {
          throw new Error("Failed to fetch user data");
        }

        const data = response.data;
        setUserdata(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [user]);

  const date = new Date(userData.createdAt || Date.now());
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const baseUrl = IFF + userData.userbanner;

  return (
    <>
      <div className="p-4 bg-zinc-300 shadow-lg flex flex-col items-center w-full"
          //  style={{ backgroundImage: `url(${baseUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="flex justify-center  w-[100px] h-[100px] mb-4 rounded-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            alt="hero"
            src={IFF + userData.userbanner || "https://media.tenor.com/i8ZeIWcfYYYAAAAM/caesar-the-clown.gif"}
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
