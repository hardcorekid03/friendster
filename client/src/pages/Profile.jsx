import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import defaultImage from "../assets/images/dafaultImage.jpg";
import UserPost from "./postdetails/UserPost";
import { format } from "date-fns";
import useFetchBlogs from "../hooks/useFetchBlogs";
import useSaveChanges from "../hooks/useSaveChanges";
import { IFF, IFFF } from "./url";


function Profile() {
  const { user } = useAuthContext();
  const { blogs, loading, setLoading, authorData, imageSrc, setImageSrc } = useFetchBlogs();
  const { id } = useParams();

  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const avatar =  IFFF + authorData?.userimage;
  const userBanner =  IFF + authorData?.userbanner;

  const { handleSaveChanges, hasChanges, setHasChanges } = useSaveChanges(
    user,
    imageSrc,
    selectedFile,
    setIsImageUploaded,
    setSelectedFile,
    setLoading
  );

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
    setIsImageUploaded(false);
    setHasChanges(false);
    setSelectedFile(userBanner);
  };

  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  const handleAvatarError = (event) => {
    event.target.src =
      "https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg";
  };

  const profileData = authorData;
  const userProfile = profileData?._id;
  return (
    <>
      <section className="md:col-span-12 md:mb-8 lg:p-6 sm:p-4">
        <div className="items-center justify-center p-4 bg-white ">
          <div className="relative flex  items-center justify-center flex-col ">
            <div
              className="absolute flex top-3 right-3 hover:bg-gray-700  text-white px-3 py-1 rounded  "
              onClick={handleSVGClick}
            >
              {user && user.id === id && (
                <>
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
                </>
              )}
            </div>

            <div className="absolute  w-[150px] h-[150px] lg:h-[180px] lg:w-[180px] -bottom-2  md:left-10 sm:left-50 bg-transparent text-white px-3 py-1 rounded ">
              <img
                className="h-full w-full border-4 shadow border-white  object-cover  "
                alt="hero"
                src={avatar}
                onError={handleAvatarError}
              />
            </div>
            <div className=" mb-4 w-[100%] md:h-[350px] h-[200px] xl:h-[400px]">
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
                  src={userBanner}
                  onError={handleImageError}
                />
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 border mb-4 md:flex md:justify-between mt-6">
            <div className="userDetails items-center justify-center">
              <h3 className="font-semibold text-xl">
                @{authorData?.username}

              </h3>
              <h3 className="text-sm font-semibold">
                Location:{" "}
                <span className="text-md font-normal text-gray-800">
                  {authorData?.location}
                </span>
              </h3>
              <h3 className="text-sm font-semibold">
                Gender:{" "}
                <span className="text-md font-normal text-gray-800">
                  {authorData?.gender}
                </span>
              </h3>
              <h3 className="text-sm font-semibold">
                Joined:{" "}
                <span className="text-md font-normal text-gray-800">
                  {authorData?.createdAt &&
                    `${format(
                      new Date(authorData?.createdAt),
                      "MMMM dd, yyyy"
                    )} `}
                </span>
              </h3>
              <h3 className="text-sm font-semibold">
                Bio:{" "}
                <span className="text-md font-normal italic text-gray-800">
                  "{profileData?.bio || "error 404: bio not found"}"
                </span>
              </h3>
            </div>

            <div className="text-xs mt-4 md:mt-0 flex flex-col items-center md:flex-row md:items-center">
              {isImageUploaded && (
                <>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  w-full mb-2 md:mb-0 md:w-auto md:mr-2"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                  <button
                    className="bg-white border-gray-300 border hover:bg-gray-200 font-bold py-2 px-4  w-full md:w-auto"
                    onClick={handleDiscardChanges}
                  >
                    Discard Changes
                  </button>
                </>
              )}
            </div>
          </div>

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
            <Link to="/userdetails">
              <h3 className="text-md font-semibold hover:text-blue-400 cursor-pointer ">
                Settings
              </h3>
            </Link>
          </div>
          <div className="flex items-center justify-between p-4 sm:p-2 ">
            <input
              className="w-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:border-opacity-100 px-4 py-2"
              placeholder="Write something...."
            />
          </div>

          <div className="items-center p-4 sm:p-2 border-b-2 mb-4">
            <UserPost
              userProfile={userProfile}
              loading={loading}
              blogs={blogs}
              handleImageError={handleImageError}
            />
          </div>
        </div>
      </section>
      {/* <section className="sm:block hidden md:col-span-3 md:mb-8 lg:p-6 sm:p-0 md:p-4 ">
        <Trending />
      </section> */}
    </>
  );
}

export default Profile;
