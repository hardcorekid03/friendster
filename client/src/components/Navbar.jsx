import React, { useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import Trending from "../pages/Trending";
import ThemeToggleButton from "./ThemeToggleButton";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/images/nav-logo.svg";

export function NavbarDefault() {
  const { user } = useAuthContext();
  const { theme, toggleTheme } = useTheme(); // Use the context
  const [openNav, setOpenNav] = React.useState(false);
  const { logout } = useLogout();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleLogout = () => {
    logout();
  };
  if (!user) {
    return null;
  }
  const handleReload = () => {
    window.location.reload();
  };

  const navList = (
    <ul className="text-gray-500 mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row justify-center items-center lg:gap-6 dark:text-spot-light ">
      <Link to="/">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="flex items-center justify-center gap-x-2 p-2 font-medium hover:text-blue-500 dark:hover:text-spot-green dark:hover:bg-spot-dark/30 dark:hover:rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
          <span className="flex items-center">Home</span>
        </Typography>
      </Link>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center justify-center gap-x-2 p-2 font-medium hover:text-blue-500 dark:hover:text-spot-green dark:hover:bg-spot-dark/30 dark:hover:rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
            clipRule="evenodd"
          />
        </svg>

        <Link to="/" className="flex items-center">
          Trending
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center justify-center gap-x-2 p-2 font-medium hover:text-blue-500 dark:hover:text-spot-green dark:hover:bg-spot-dark/30 dark:hover:rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
            clipRule="evenodd"
          />
        </svg>

        <Link to="/" className="flex items-center">
          Recent
        </Link>
      </Typography>
      <Link to={`/profile/${user.id}`}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="flex items-center justify-center gap-x-2 p-2 font-medium hover:text-blue-500 dark:hover:text-spot-green dark:hover:bg-spot-dark/30 dark:hover:rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 "
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>

          <span className="flex items-center">Profile</span>
        </Typography>
      </Link>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 dark:bg-spot-dark2 dark:border-spot-dark2 rounded-lg ">
      <div className="container mx-auto flex items-center justify-between text-gray-700  md:px-0 px-2">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-bold dark:hover:text-spot-green dark:text-spot-light"
          onClick={handleReload}
        >
          Prendster
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          <Button variant="text" size="sm" className="hidden lg:inline-block">
            <ThemeToggleButton />
          </Button>
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block bg-gray-100 text-gray-700"
            onClick={handleLogout}
          >
            <span>Sign Out</span>
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden dark:text-spot-light"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav} className="text-gray-700 ">
        <div className="container mx-auto  ">
          <Trending />
          <div className="flex items-center gap-x-1 pt-4 ">
            <Button
              fullWidth
              variant="text"
              size="sm"
              onClick={toggleTheme}
              className="bg-gray-200 text-gray-700 hover:bg-spot-dark3 hover:text-white dark:bg-spot-light dark:hover:bg-spot-dark3 dark:hover:text-spot-light  dark:text-spot-dark "
            >
              {theme === "light" ? (
                <span className="group inline-flex items-center justify-center space-x-2">
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </svg>
                  <span>Dark Mode</span>
                </span>
              ) : (
                <span className="group inline-flex items-center justify-center space-x-2">
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                  <span>Light Mode</span>
                </span>
              )}
            </Button>

            <Button
              fullWidth
              variant="text"
              size="sm"
              className="hover:bg-spot-dark3 hover:text-white bg-gray-200 text-gray-700 dark:bg-spot-light/50 dark:hover:bg-spot-dark3 dark:hover:text-white dark:text-white "
              onClick={handleLogout}
            >
              <span className="group inline-flex items-center justify-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
                </svg>

                <span>Sign Out</span>
              </span>
            </Button>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}
export default NavbarDefault;
