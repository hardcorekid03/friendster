import { IFFF } from "./url";
import useFetchUser from "../hooks/useFetchUser";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import defaultAvatar from "../assets/images/avatar.jpg"

function Trending() {
  const { userData } = useFetchUser();
  const { user } = useAuthContext();

  const date = new Date(userData.createdAt || Date.now());
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const userImage = IFFF + userData.userimage;
  const handleImageError = (event) => {
    event.target.src = defaultAvatar;
  };

  return (
    <>
      <div
        className="p-4 bg-gray-200 shadow-lg flex flex-col items-center w-full  border dark:border-spot-dark2 dark:bg-spot-dark2"
      >
        <div className="flex justify-center border-2 shadow-sm border-white  w-[100px] h-[100px] mb-4 rounded-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            alt="hero"
            src={userImage}
            onError={handleImageError}
          />
        </div>
        <Link
          to={`/profile/${user.id}`}
          className="block text-sm font-semibold mb-2 hover:text-blue-500 dark:text-spot-light dark:hover:text-spot-green"
        >
          @{userData.username}
        </Link>
        <label className="block text-sm font-medium">
          <span className="text-gray-700 font-normal dark:text-spot-light">
            {" "}
            {userData.bio || ""}
          </span>
        </label>
      </div>
      <div className="bg-white p-6 dark:bg-spot-dark dark:text-spot-light border-2 dark:border-spot-dark2">
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
    </>
  );
}

export default Trending;
