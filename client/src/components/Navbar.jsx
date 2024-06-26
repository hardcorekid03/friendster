import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const {logout} = useLogout()

  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout()
  }
  if (!user) {
    return null;
  }

  return (
    <div className="shadow-md w-full fixed top-0 left-0 mb-4 z-[99]">
      <div className="md:flex items-center justify-between bg-white  md:px-10 px-10">
        {/* logo section */}
        <div className="cursor-pointer flex items-center gap-1">
          <Link to="/">
            <img src={logo} style={{ height: 72 }} className="h-10" />
          </Link>
        </div>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <XMarkIcon /> : <Bars3Icon />}
        </div>
        {/* linke items */}   
        <ul
          className={`cursor-pointer md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          <Link to="/">
          <li className="text-gray-800 text-sm hover:text-blue-400 duration-2000 md:ml-8 md:my-0 mt-7 font-semibold">
            HOME
          </li>
          </Link>
          <Link to="/profile">
          <li className="text-gray-800 text-sm hover:text-blue-400 duration-2000 md:ml-8 md:my-0 my-2 font-semibold">
            PROFILE
          </li>
          </Link>
          <Link to="/">
          <li className="text-gray-800 text-sm hover:text-blue-400 duration-2000 md:ml-8 md:my-0 my-2 font-semibold"  onClick={handleLogout}>
            LOGOUT
          </li>
          </Link>
        </ul>
        {/* button */}
      </div>
    </div>
  );
};

export default Navbar;
