import React, { useState, useEffect, useRef } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Trending from "./Trending";
import defaultImage from "../assets/images/dafaultImage.jpg";
import UserPost from "./postdetails/UserPost";
import useFetchUser from "../hooks/useFetchUser";
import useFetchBlogs from "../hooks/useFetchBlogs";
import useSaveChanges from "../hooks/useSaveChanges";
import { IFF } from "./url";

function Profile() {
  const { user } = useAuthContext();
  const { userData, imageSrc, setImageSrc } = useFetchUser();
  const { blogs, loading, setLoading } = useFetchBlogs();

  const [originalImageSrc, setOriginalImageSrc] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { handleSaveChanges, hasChanges, setHasChanges } = useSaveChanges(
    user,
    imageSrc,
    selectedFile,
    setIsImageUploaded,
    setSelectedFile,
    setOriginalImageSrc,
    setLoading
  );

  useEffect(() => {
    if (userData && userData.bannerImage) {
      setOriginalImageSrc(IFF + userData.bannerImage);
      setImageSrc(userData.bannerImage);
    }
  }, [userData]);

  const handleSVGClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setIsImageUploaded(true);
        setHasChanges(true);
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDiscardChanges = () => {

    window.location.reload();
    //    setImageSrc(originalImageSrc); // Reset to original image
    // setIsImageUploaded(false); // Reset upload flag
    // setHasChanges(false); // Reset changes flag
  };

  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <>
      <section className="md:col-span-9 md:mb-8 lg:p-6 sm:p-4">
        <div className="items-center justify-center p-4 bg-white ">
          <div className="flex items-center justify-between p-4 sm:p-2">
            <h3 className="text-xl font-semibold ">User Profile</h3>
            <Link
              to="/"
              className="text-xl font-semibold hover:text-gray-700 cursor-pointer h-8 w-8 justify-center"
            >
              <ArrowLeftIcon className="h-full w-full" />
            </Link>
          </div>
          <div className="relative container mx-auto flex  bg-gray-400py-4 items-center justify-center flex-col ">
            <div
              className="absolute flex top-3 right-3 hover:bg-gray-700  text-white px-3 py-1 rounded  "
              onClick={handleSVGClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 cursor-pointer  "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <div className="absolute w-[150px] h-[150px]   bottom-1  md:left-10 sm:left-50 bg-transparent text-white px-3 py-1 rounded ">
              <img
                className="h-full w-full border-4 shadow border-white  object-cover"
                alt="hero"
                src="https://media.tenor.com/i8ZeIWcfYYYAAAAM/caesar-the-clown.gif"
              />
            </div>
            <div className=" mb-4 w-[100%] h-[300px] p-4 sm:p-2">
              {hasChanges ? (
                <img
                  className="h-full w-full object-cover"
                  alt="hero"
                  src={imageSrc}
                  onError={handleImageError}
                />
              ) : (
                <img
                  className="h-full w-full object-cover"
                  alt="hero"
                  src={IFF + imageSrc}
                  onError={handleImageError}
                />
              )}
            </div>
          </div>
          {isImageUploaded && (
            <div className=" flex items-center justify-center  md:justify-end   text-xs  ">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              <button
                className="bg-white border-gray-300 border hover:bg-gray-200 font-bold py-2 px-4 rounded ml-2"
                onClick={handleDiscardChanges}
              >
                Discard Changes
              </button>
            </div>
          )}
          <div className="flex items-center justify-between p-4 sm:p-2 border-b-2 mb-4">
            <h3 className="text-md font-semibold hover:text-blue-400 cursor-pointer ">
              Timeline
            </h3>
            <h3 className="text-md font-semibold hover:text-blue-400 cursor-pointer ">
              My Posts
            </h3>
            <h3 className="text-md font-semibold hover:text-blue-400 cursor-pointer ">
              Favorites
            </h3>
            <h3 className="text-md font-semibold hover:text-blue-400 cursor-pointer ">
              Settings
            </h3>
          </div>
          <div className="flex items-center justify-between p-4 sm:p-2 ">
            <input
              className="w-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:border-opacity-100 px-4 py-2"
              placeholder="Write something...."
            />
          </div>

          <div className="items-center p-4 sm:p-2 border-b-2 mb-4">
            <UserPost
              loading={loading}
              blogs={blogs}
              handleImageError={handleImageError}
            />
          </div>
        </div>
      </section>
      <section className="sm:block hidden md:col-span-3 md:mb-8 lg:p-6 sm:p-0 md:p-4 ">
        <Trending />
      </section>
    </>
  );
}

export default Profile;
