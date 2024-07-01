import {useEffect } from "react";
import { format } from 'date-fns';
import { useAuthContext } from "../hooks/useAuthContext";
import avatar from "../assets/images/avatar.png"

function Trending() {
  const { user } = useAuthContext();

  useEffect(() => {
    // Fetch additional user data if needed
    // For now, we just use the user data from the context
    // console.log(user);
  }, [user]);

  if (!user) return <p>Loading...</p>;
  const formattedDate = format(new Date(user.createdAt), 'MMMM yyyy');

  return (
    <>
      <div className="p-4 bg-zinc-300 shadow-lg flex flex-col items-center w-full">
        <div className="flex justify-center  w-[100px] h-[100px] mb-4 rounded-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            alt="hero"
            src= {user.image || avatar }
          />
        </div>
        <label className="block text-sm font-semibold mb-2" htmlFor="name">
          {user.username}
        </label>
      </div>
      <div className="bg-white p-6">
        <label className="block text-sm font-medium mb-2">
          Bio: 
          <span className="text-blue-400 font-normal"> {user.bio || ""}</span>
        </label>
        <label className="block text-sm font-medium mb-2">
          Location:{" "}
          <span className="text-blue-400 font-normal"> {user.location}</span>
        </label>
        <label className="block text-sm font-medium mb-2">
          Gender: <span className="text-blue-400 font-normal"> {user.gender}</span>
        </label>
        <label className="block text-sm font-medium mb-2">
          Joined: <span className="text-blue-400 font-normal"> {formattedDate}</span>
        </label>
      </div>
    </>
  );
}

export default Trending;
