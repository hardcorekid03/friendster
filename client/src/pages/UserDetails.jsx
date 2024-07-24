import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useFetchUser from "../hooks/useFetchUser";
import { IFF, IFFF } from "./url";
import defaultImage from "../assets/images/dafaultImage.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthContext } from "../hooks/useAuthContext";
import api from "../api/Api";

function UserDetails() {
  const { user } = useAuthContext();
  const { userData } = useFetchUser();
  const [originalFormData, setOriginalFormData] = useState({}); // Store original formData
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);


  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    avatar: null,
    username: "",
    email: "",
    birthdate: "",
    gender: "",
    location: "",
    bio: "",
    });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIsImageUploaded(true);
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (!user) {
      setIsEditing(false);
      return;
    }

    if (selectedFile) {
      const data = new FormData();
      const alphanumericKey = Math.random().toString(36).slice(2, 9);
      const filename = `user-${alphanumericKey}-${Date.now()}-banner-${
        selectedFile.name
      }`;

      data.append("img", filename);
      data.append("file", selectedFile);
      formData.userimage = filename;
      try {
        const imgUpload = await api.post("/api/upload/uploadProfile", data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(imgUpload.data);
        setIsImageUploaded(false);
      } catch (err) {
        console.log("Error uploading image:", err);
      }
    }

    try {
      // Perform API request to save formData
      const response = await api.patch(`/api/user/${user.id}`, formData);
      console.log("Form data saved:", response.data);
      setIsEditing(false); // Exit edit mode
      navigate(`/profile/${user.id}`);
    } catch (error) {
      console.error("Error saving form data:", error);
      // Handle error state or display an error message to the user
    }

    const blog = {};
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
          <div className="items-center p-4">
            <div className="flex items-center justify-between">
              <h3 className="mb-4 text-md font-bold">Update Profile Details</h3>
              <h3
                className={`mb-4 text-md font-bold cursor-pointer 

                  ${isEditing ? "text-red-600" : "hover:text-blue-400"}`}
                onClick={
                  isEditing ? () => navigate(`/profile/${user.id}`) : handleEditClick
                }
              >
                {isEditing ? "Cancel" : "Edit Details"}
              </h3>
            </div>
            <form>
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
                    onChange={handleFileChange}
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
                  className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 inline-flex items-center"
                  onClick={handleSaveChanges}
                  disabled={!isEditing}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="bg-white border-gray-300 border hover:bg-gray-200 py-2 px-4 inline-flex items-center"
                  disabled={!isEditing}
                  onClick={discardChanges}
                >
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
