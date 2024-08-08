import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const BottomNav = ({ filterMode, setFilterMode }) => {
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 shadow-lg  bg-zinc-50  dark:bg-spot-dark2 ">
      <div className="w-full p-2 sm:p-4">
        <div className="flex justify-around">
          {/* Home Icon */}
          <Link to="/">
            <div className="p-2">
              <div
                className="items-center justify-center flex flex-col p-2 sm:p-4 group border-t-2 border-transparent hover:border-blue-500 dark:hover:border-spot-green "
                onClickCapture={() => setFilterMode("all")}
              >
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 group-hover:text-blue-500 dark:text-spot-light dark:group-hover:text-spot-green"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
                <h1
                  className="text-xs hover:text-blue-500 dark:text-spot-light
                dark:group-hover:text-spot-green"
                >
                  Home{" "}
                </h1>
              </div>
            </div>
          </Link>
          {/* Profile Icon */}
          <Link to={`/profile/${user.id}`}>
            <div className="p-2">
              <div className="items-center justify-center flex flex-col p-2 sm:p-4 group border-t-2 border-transparent hover:border-blue-500 dark:hover:border-spot-green ">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 group-hover:text-blue-500 dark:text-spot-light dark:group-hover:text-spot-green"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <h1
                  className="text-xs hover:text-blue-500 dark:text-spot-light
                dark:group-hover:text-spot-green"
                >
                  Profile{" "}
                </h1>
              </div>
            </div>
          </Link>
          {/* Create Icon */}
          <Link to="/createpost">
            <div className="p-2">
              <div className="items-center justify-center flex flex-col p-2 sm:p-4 group border-t-2 border-transparent hover:border-blue-500 dark:hover:border-spot-green ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 group-hover:text-blue-500 dark:text-spot-light dark:group-hover:text-spot-green"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                    clipRule="evenodd"
                  />
                </svg>
                <h1
                  className="text-xs hover:text-blue-500 dark:text-spot-light
                dark:group-hover:text-spot-green"
                >
                  Write{" "}
                </h1>
              </div>
            </div>
          </Link>
          {/* Popular Icon */}
          <Link to="/">
            <div className="p-2">
              <div
                className="items-center justify-center flex flex-col p-2 sm:p-4 group border-t-2 border-transparent hover:border-blue-500 dark:hover:border-spot-green "
                onClickCapture={() => setFilterMode("favorites")}
              >
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 group-hover:text-blue-500 dark:text-spot-light dark:group-hover:text-spot-green"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z" />
                </svg>
                <h1
                  className="text-xs hover:text-blue-500 dark:text-spot-light
                dark:group-hover:text-spot-green"
                >
                  Popular{" "}
                </h1>
              </div>
            </div>
          </Link>

          {/* Settings Icon */}
          <Link to="/find-people">
            <div className="p-2">
              <div className="items-center justify-center flex flex-col p-2 sm:p-4 group border-t-2 text-gray-700 border-transparent hover:border-blue-500 dark:hover:border-spot-green ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 sm:w-8 sm:h-8 
                group-hover:text-blue-500 dark:text-spot-light
                dark:group-hover:text-spot-green"
                >
                  <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                </svg>
                <h1
                  className="text-xs hover:text-blue-500 dark:text-spot-light
                dark:group-hover:text-spot-green"
                >
                  Members{" "}
                </h1>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
