import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import useFetchUser from "../hooks/useFetchUser";
import { IFF } from "./url";
import defaultImage from "../assets/images/dafaultImage.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useSaveChanges from "../hooks/useSaveChanges";

function UserDetails() {
  const { userData } = useFetchUser();
  const [originalFormData, setOriginalFormData] = useState({}); // Store original formData
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    avatar: null,
    username: "",
    email: "",
    birthdate: "",
    gender: "",
    location: "",
    bio: "",
  });

  useEffect(() => {
    // Set formData to userData initially
    setFormData({
      ...formData,
      username: userData.username,
      email: userData.email,
      gender: userData.gender,
      location: userData.location,
      bio: userData.bio,
      birthdate: userData.birthdate ? new Date(userData.birthdate) : null,
    });

    // Save original formData when entering edit mode
    if (isEditing) {
      setOriginalFormData({ ...formData });
    }
  }, [userData, isEditing]);

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      birthdate: date,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Handle form submission here
    setIsEditing(false);
  };

  const discardChanges = () => {
    fileInputRef.current.value = ""; // Clear the file input
    setFormData({ ...originalFormData, avatar: null }); // Reset formData to original and clear avatar
    setIsEditing(false); // Exit edit mode
  };

  const fileInputRef = useRef(null);

  return (
    <>
      <section className="md:col-span-12 md:mb-8 lg:p-6 sm:p-4">
        <div className="items-center justify-center p-4 bg-white ">

          <div className="relative flex items-center justify-center flex-col ">
            <div className="absolute w-[150px] h-[150px] bottom-1 md:left-10 sm:left-50 bg-transparent text-white px-3 py-1 rounded ">
              <img
                className="h-full w-full border-4 shadow border-white object-cover"
                alt="hero"
                src="https://media.tenor.com/i8ZeIWcfYYYAAAAM/caesar-the-clown.gif"
              />
            </div>
            <div className="mb-4 w-[100%] h-[350px] p-4 sm:p-2">
              <img
                className="h-full w-full object-cover"
                alt="hero"
                src={IFF + userData.userbanner}
                onError={handleImageError}
              />
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
            <h3 className="text-md font-semibold hover:text-blue-400 cursor-pointer ">
              Settings
            </h3>
          </div>

          <div className="items-center p-4">
            <div className="flex items-center justify-between">
              <h3 className="mb-4 text-md font-bold">Update Profile Details</h3>
              <h3
                className={`mb-4 text-md font-bold cursor-pointer 

                  ${isEditing ? "text-red-600" : "hover:text-blue-400"}`}
                onClick={isEditing ? () => navigate("/profile") : handleEditClick}
              >
                {isEditing ? "Cancel" : "Edit Details"}
              </h3>
            </div>
            <form >
              <div className="grid gap-4 mb-4 sm:grid-cols-12 sm:gap-6 sm:mb-5">
                <div className="sm:col-span-12">
                  <label
                    htmlFor="avatar"
                    className="block mb-2 text-sm font-medium "
                  >
                    Upload Avatar
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
                    placeholder="Type product name"
                    onChange={handleInputChange}
                    required=""
                    disabled={!isEditing}
                    ref={fileInputRef} // Add this line
                  />
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium "
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Product brand"
                    required=""
                    disabled={!isEditing}
                  />
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium "
                  >
                    E-mail
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
                    value={formData.email}
                    onChange={handleInputChange}
                    required=""
                    disabled={!isEditing}
                  />
                </div>

                <div className="sm:col-span-4 ">
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium "
                  >
                    Birthdate
                  </label>
                  <DatePicker
                    wrapperClassName="w-full"
                    id="birthdate"
                    name="birthdate"
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
                    selected={formData.birthdate}
                    onChange={handleDateChange}
                    dateFormat="MMMM dd, yyyy" // Adjust date format as needed
                    showYearDropdown
                    scrollableYearDropdown
                    disabled={!isEditing}
                  />
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium "
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
                    value={formData.gender}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="location"
                    className="block mb-2 text-sm font-medium "
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Ex. 12"
                    required=""
                    disabled={!isEditing}
                  />
                </div>
                <div className="sm:col-span-12">
                  <label
                    htmlFor="bio"
                    className="block mb-2 text-sm font-medium "
                  >
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    rows="8"
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
                    placeholder="Write something here..."
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  ></textarea>
                </div>
              </div>
              <div className="flex  sm:flex-row items-center gap-1 ">
                <button
                  type="submit"
                  className="w-full sm:w-auto text-white inline-flex bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center"
                onClick={handleSaveChanges}
                disabled={!isEditing}

                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="w-full sm:w-auto text-white inline-flex items-center bg-red-600 hover:text-white border border-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm px-5 py-2.5 text-center"
                  disabled={!isEditing}
                  onClick={discardChanges}
                >
                  <svg
                    className="w-5 h-5 mr-1 -ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Discard Changes
                </button>
              </div>
            </form>
          </div>

          <div className="items-center p-4 sm:p-2 border-b-2 mb-4"></div>
        </div>
      </section>
    </>
  );
}

export default UserDetails;
