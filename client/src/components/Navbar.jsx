import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import logo from "../assets/images/nav-logo.svg";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };
  if (!user) {
    return null;
  }

  return (
    <div className="w-full fixed top-0 left-0 mb-4 z-[99]">
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
          className={`flex flex-row bg-white cursor-pointer justify-center items-center md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          <Link to="/">
            <li className="text-gray-800 text-sm hover:text-blue-400 duration-2000 md:ml-8 md:my-0 mt-7 font-semibold flex ">
              <div className="flex flex-col text-xs group border-b-2 border-transparent hover:border-blue-500 items-center justify-center">
                <svg
                  className="text-gray-700 group-hover:text-blue-500 size-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
                Home
              </div>
            </li>
          </Link>
          <Link to="/profile">
            <li className="text-gray-800 text-sm hover:text-blue-400 duration-2000 md:ml-8 md:my-0 mt-7 font-semibold flex ">
              <div className="flex flex-col text-xs group border-b-2 border-transparent hover:border-blue-500 items-center justify-center">
                <svg
                  className="text-gray-700 group-hover:text-blue-500 size-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                Profile
              </div>
            </li>
          </Link>
          <Link to="/">
            <li
              className="text-gray-800 text-sm hover:text-blue-400 duration-2000 md:ml-8 md:my-0 mt-7 font-semibold flex "
              onClick={handleLogout}
            >
              <div className="flex flex-col text-xs group border-b-2 border-transparent hover:border-blue-500 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-gray-700 group-hover:text-blue-500 size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                Logout
              </div>
            </li>
          </Link>
        </ul>
        {/* button */}
      </div>
    </div>
  );
};

export default Navbar;
