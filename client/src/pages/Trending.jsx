import React, { useState, useEffect } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import avatar from "../assets/images/avatar.png";

function Trending() {
  const { user } = useAuthContext();
  const [userData, setUserdata] = useState([]);


  useEffect(() => {
    
    const fetchUser = async () => {
      try {    
        const response = await fetch(`api/user/${user.id}`, 
        {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await response.json();
        setUserdata(data);

      } catch (error) {
        console.error(error);
      } 
    };
    if(user){
      fetchUser();

    
    }
  }, [user]);
  const date = new Date(userData.createdAt);
  const month = date.toLocaleString('default', { month: 'long' }); // Full month name
  const year = date.getFullYear();

  return (
    <>
      <div className="p-4 bg-zinc-300 shadow-lg flex flex-col items-center w-full">
        <div className="flex justify-center  w-[100px] h-[100px] mb-4 rounded-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            alt="hero"
            src={userData.image || avatar}
          />
        </div>
        <label className="block text-sm font-semibold mb-2" htmlFor="name">
          {/* {user.username} */}
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
