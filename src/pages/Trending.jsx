import React from "react";

function Trending() {
  const user = false;
  return (
    <>
      <div className="p-4 bg-zinc-300 shadow-lg flex flex-col items-center w-full">
        <div className="flex justify-center  w-[100px] h-[100px] mb-4 rounded-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            alt="hero"
            src="https://cdn-icons-png.freepik.com/512/168/168725.png"
          />
        </div>
        <label className="block text-sm font-semibold mb-2" htmlFor="name">
          @hardcorekid03
        </label>
      </div>

      <div className="bg-white p-6">
        <label className="block text-sm font-medium mb-2">
          Bio: <span className="text-blue-400 font-normal"> Lies for the liars</span>
        </label>
        <label className="block text-sm font-medium mb-2">
          Location: <span className="text-blue-400 font-normal"> System32</span>
        </label>
        <label className="block text-sm font-medium mb-2">
          Gender: <span className="text-blue-400 font-normal"> Male</span>
        </label>
        <label className="block text-sm font-medium mb-2">
          Joined: <span className="text-blue-400 font-normal"> 2009</span>
        </label>
      </div>
    </>
  );
}

export default Trending;
