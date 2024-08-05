import { IFFF, IFF } from "./url";
import useFetchUser from "../hooks/useFetchUser";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import defaultAvatar from "../assets/images/avatar.jpg";

function Trending() {
  const { userData } = useFetchUser();
  const { user } = useAuthContext();

  const date = new Date(userData.createdAt || Date.now());
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const userImage = IFFF + userData.userimage;
  const userBanner = IFF + userData.userbanner;

  const handleImageError = (event) => {
    event.target.src = defaultAvatar;
  };

  return (
    <div className="border shadow dark:border-spot-dark2 dark:bg-spot-dark2">
      <div className="relative p-4 bg-gray-200 shadow-lg flex flex-col items-center w-full  ">
        {/* Background Image and Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center  "
          style={{ backgroundImage: `url(${userBanner})` }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex justify-center border-2 shadow-sm border-white w-[100px] h-[100px] mb-4 rounded-full overflow-hidden">
            <img
              className="h-full w-full object-cover z-[90]"
              alt="hero"
              src={userImage}
              onError={handleImageError}
            />
          </div>
          <Link
            to={`/profile/${user.id}`}
            className="block text-white bg-black px-2 py-1 text-sm font-semibold mb-2 hover:text-blue-500 dark:text-spot-light dark:hover:text-spot-green"
          >
            @{userData.username}
          </Link>
          <label className="block text-sm font-medium">
            <span className="text-gray-100 bg-black px-2 font-normal dark:text-spot-light">
              {userData.bio || ""}
            </span>
          </label>
        </div>
      </div>

      <div className="bg-white p-6 dark:bg-spot-dark dark:text-spot-light  dark:border-spot-dark2">
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
    </div>
  );
}

export default Trending;
