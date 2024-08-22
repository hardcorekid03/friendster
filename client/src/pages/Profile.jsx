import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import defaultImage from "../assets/images/dafaultImage.jpg";
import defaultAvatar from "../assets/images/avatar.jpg";
import UserPost from "./postdetails/UserPost";
import UserDetails from "./UserDetails";
import { differenceInYears, parseISO, format } from "date-fns";
import useFetchUser from "../hooks/useFetchUser";
import useFetchBlogs from "../hooks/useFetchBlogs";
import useFetchUserFavorite from "../hooks/useFetchUserFavorite";
import api from "../api/Api";
import ImageModal from "../components/ImageModal";
import app from "../config/firebase";
import toast, { Toaster } from "react-hot-toast";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

function Profile() {
  const { user } = useAuthContext();
  const { userData, imageSrc, setImageSrc } = useFetchUser();
  const [userDetails, setUserDetails] = useState(null);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("blogs");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [originalImageSrc, setOriginalImageSrc] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [errors, setErrors] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const {
    blogs: myBlogs,
    loading: myLoading,
    setLoading: blogSet,
    handleImageError: blogError,
    favorites: blogFavorites,
    handleFavorite: blogHandle,
  } = useFetchBlogs();
  const {
    blogs: myFavs,
    loading: favLoading,
    setLoading: favSet,
    handleImageError: favError,
    favorites: favFavorites,
    handleFavorite: favHandle,
  } = useFetchUserFavorite();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getData = () => {
    if (activeTab === "blogs") {
      return {
        data: myBlogs,
        loading: myLoading,
        setLoading: blogSet,
        error: blogError,
        favorites: blogFavorites,
        handleFavorite: blogHandle,
      };
    } else if (activeTab === "favorites") {
      return {
        data: myFavs,
        loading: favLoading,
        setLoading: favSet,
        error: favError,
        favorites: favFavorites,
        handleFavorite: favHandle,
      };
    }
  };

  const { data, loading, error, favorites, handleFavorite, setLoading } =
    getData();

  const fetchUserDetails = async () => {
    try {
      const response = await api.get(`/api/user/${id}`);
      const data = response.data;
      setUserDetails(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserDetails();
    }
  }, [id, user]);

  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const avatar = id ? userDetails?.userimage : userData.userimage;
  const userBanner = id ? userDetails?.userbanner : userData.userbanner;

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (!user) {
      setLoading(false);
      return;
    }

    let finalImageURL = imageURL;
    const blog = {};

    if (selectedFile) {
      try {
        if (userDetails.userbanner) {
          // Delete the existing image if it exists
          const imageUrl = userDetails.userbanner;
          const imagePath = imageUrl.split("/o/")[1]?.split("?")[0]; // Extract the path from the URL

          if (imagePath) {
            // Create a reference to the image in Firebase Storage
            const storage = getStorage(app); // Ensure Firebase app is initialized
            const imageRef = ref(
              storage,
              decodeURIComponent(imagePath.replace("images%2F", "images/"))
            );
            // Delete the image from Firebase Storage
            await deleteObject(imageRef);
          }
        }

        setLoading(true);
        const alphanumericKey = Math.random().toString(36).slice(2, 9);
        const filename = `banner-${alphanumericKey}-${Date.now()}`;
        const storage = getStorage(app);
        const storageRef = ref(storage, "images/banners/" + filename);
        await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(storageRef);
        finalImageURL = downloadURL; // Update the finalImageURL with the uploaded image URL
        blog.userbanner = finalImageURL;
      } catch (error) {
        setErrors("Failed to upload image.");
        setLoading(false);
        return;
      }
    }

    try {
      let response;
      if (id) {
        response = await api.patch(`/api/user/${user.id}`, blog, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      } else {
        response = await api.post("/api/blogs", blog, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      }

      if (response.status === 200) {
        console.log(finalImageURL);
        setIsImageUploaded(false);
        setSelectedFile(null);
        setOriginalImageSrc(imageSrc);
        setHasChanges(true);
        toast.success("Upload Successful!");
      }
    } catch (error) {
      setErrors(error.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

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
    event.target.src = defaultAvatar;
  };

  const handleImageClick = (src) => {
    setModalImageSrc(src);
    setIsImageModalOpen(true);
  };

  const profileData = id ? userDetails : userData;

  const calculateAge = (dob) => {
    const birthDate = parseISO(dob); // Parse the date string to a Date object
    const today = new Date();
    return differenceInYears(today, birthDate);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      >
        <img
          src={modalImageSrc}
          className="object-contain w-full h-full"
          alt="modal content"
          onError={handleAvatarError}
        />
      </ImageModal>
      <section className="md:col-span-12 md:mb-8 lg:p-6 sm:p-4 mb-4 md:mb-2">
        <div className="items-center justify-center p-4 dark:bg-spot-dark2 text-spot-light">
          <div className="relative flex items-center justify-center flex-col">
            {user && user.id === id && (
              <div
                className="absolute flex top-3 right-3 hover:bg-spot-dark2 text-spot-light px-3 py-1 rounded"
                onClick={handleSVGClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 cursor-pointer"
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
            )}
            <div
              className="cursor-pointer absolute w-[150px] h-[150px] lg:h-[180px] lg:w-[180px] -bottom-2 md:left-10 sm:left-50 bg-transparent text-spot-light px-3 py-1 rounded"
              onClick={() => handleImageClick(avatar)}
            >
              <img
                className="h-full w-full border-2 shadow border-spot-light object-cover border-zinc-100"
                alt="avatar"
                src={avatar || defaultAvatar}
                onError={handleAvatarError}
              />
            </div>
            <div
              className="mb-4 w-[100%] md:h-[350px] h-[200px] xl:h-[400px]"
              onClick={() => handleImageClick(userBanner)}
            >
              {hasChanges ? (
                <img
                  className="h-full w-full object-cover"
                  alt="banner"
                  src={imageSrc || defaultImage}
                  onError={handleImageError}
                />
              ) : (
                <img
                  className="h-full w-full object-cover"
                  alt="banner"
                  src={userBanner || defaultImage}
                  onError={handleImageError}
                />
              )}
            </div>
          </div>

          <div className="dark:bg-spot-dark2 p-4 border mb-4 md:flex md:justify-between mt-6 text-gray-700 dark:text-spot-light">
            <div className="items-center justify-center t">
              <h3 className="font-semibold text-xl text-gray-700 dark:text-spot-green">
                @{profileData?.username}{" "}
                <span className="text-sm text-gray-700 dark:text-spot-light">
                  |{" "}
                  {profileData?.birthdate && (
                    <>
                      {calculateAge(profileData.birthdate)}{" "}
                      {profileData?.gender}{" "}
                    </>
                  )}
                </span>
              </h3>
              <h3 className="text-sm font-semibold">
                Location:{" "}
                <span className="text-md font-normal text-gray-700 dark:text-spot-light">
                  {profileData?.location}
                </span>
              </h3>
              <h3 className="text-sm font-semibold">
                Joined:{" "}
                <span className="text-md font-normaltext-gray-700 dark:text-spot-light">
                  {profileData?.createdAt &&
                    `${format(
                      new Date(profileData?.createdAt),
                      "MMMM dd, yyyy"
                    )} `}
                </span>
              </h3>
              <h3 className="text-sm font-semibold">
                <span className="text-md font-normal italic text-gray-700 dark:text-spot-light">
                  "{profileData?.bio || "error 404: bio not found"}"
                </span>
              </h3>
            </div>

            <div className="text-xs flex flex-col items-center md:flex-row ">
              {isImageUploaded && (
                <>
                  <button
                    className=" whitespace-nowrap items-center justify-center md:mr-2 mb-1 md:mb-0 mr-0 w-full md:w-w-1/2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 inline-flex  dark:bg-spot-green dark:hover:bg-spot-green/80 "
                    onClick={handleSaveChanges}
                    disabled={loading}
                  >
                    {loading ? "Uploading..." : "Save Post"}
                  </button>
                  <button
                    className="bg-white whitespace-nowrap items-center justify-center w-full md:w-1/2 border-gray-300 border hover:bg-gray-200 text-gray-700  py-2 px-4 inline-flex  dark:border-none dark:text-white dark:bg-spot-dark3 dark:hover:bg-spot-dark3/80"
                    onClick={handleDiscardChanges}
                  >
                    Discard Changes
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 sm:p-2 border-b mb-4">
            <div
              className={` cursor-pointer  ${
                activeTab === "blogs"
                  ? " text-blue-500 dark:text-spot-green"
                  : "text-gray-700 border-transparent hover:text-blue-500 dark:hover:text-spot-green dark:text-spot-light"
              }`}
              onClick={() => handleTabChange("blogs")}
            >
              <h3 className="text-md font-semibold  ">Posts</h3>
            </div>
            <div
              className={`cursor-pointer ${
                activeTab === "favorites"
                  ? " text-blue-500 dark:text-spot-green"
                  : "text-gray-700 border-transparent hover:text-blue-500 dark:hover:text-spot-green dark:text-spot-light"
              }`}
              onClick={() => handleTabChange("favorites")}
            >
              <h3 className="text-md font-semibold  ">Favorites</h3>
            </div>
            <div
              className={`cursor-pointer ${
                activeTab === "settings"
                  ? "text-blue-500 dark:text-spot-green"
                  : "text-gray-700 border-transparent hover:text-blue-500 dark:hover:text-spot-green dark:text-spot-light"
              }`}
              onClick={() => handleTabChange("settings")}
            >
              {user && user.id === id && (
                <Link
                  to={`/userdetails/${user.id}`}
                  className="flex justify-center items-center dark:hover:text-spot-green"
                >
                  <h3 className="text-md font-semibold hover:text-spot-green">
                    {/* Settings */}
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between p-4 sm:p-2 ">
            <input
              className="border p-2  text-gray-800 focus:outline-none border-gray-300 bg-white w-full text-sm px-4 py-3 outline-blue-500 dark:text-spot-light dark:bg-spot-dark2 dark:focus:bg-spot-dark  dark:border-spot-light  dark:focus:border-spot-green"
              placeholder="Write something...."
            />
          </div>

          <div className="items-center p-4 sm:p-2  mb-4 border-spot-dark">
            {activeTab === "blogs" && (
              <UserPost
                loading={loading}
                handleImageError={handleImageError}
                data={data}
                error={error}
                favorites={favorites}
                handleFavorite={handleFavorite}
              />
            )}

            {activeTab === "favorites" && (
              <UserPost
                loading={loading}
                handleImageError={handleImageError}
                data={data}
                error={error}
                favorites={favorites}
                handleFavorite={handleFavorite}
              />
            )}

            {activeTab === "settings" && <UserDetails avatar={avatar} />}
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
