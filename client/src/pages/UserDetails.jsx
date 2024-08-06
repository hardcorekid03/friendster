import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetchUser from "../hooks/useFetchUser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthContext } from "../hooks/useAuthContext";
import api from "../api/Api";

function UserDetails() {
  const { user } = useAuthContext();
  const { userData, userImg } = useFetchUser();
  const [originalFormData, setOriginalFormData] = useState({}); // Store original formData
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    avatar: null,
    username: "",
    email: "",
    birthdate: null,
    gender: "",
    location: "",
    bio: "",
  });

  useEffect(() => {
    // Check if userData and user are available before updating formData
    if (userData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        username: userData.username || "",
        email: userData.email || "",
        gender: userData.gender || "",
        location: userData.location || "",
        bio: userData.bio || "",
        birthdate: userData.birthdate ? new Date(userData.birthdate) : null,
      }));
    }

    // Save original formData when entering edit mode
    if (isEditing) {
      setOriginalFormData({ ...formData });
    }
  }, [userData, isEditing, user]);

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
      // delete previous image before uploading new image
      const blogImage = userImg;
      const deletePreviousImage = async (blogImage) => {
        const imageUrl = blogImage;
        if (imageUrl) {
          const imageName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
          try {
            const imageResponse = await api.delete(
              `/api/upload/uploadProfile/${imageName}`,
              {
                headers: { Authorization: `Bearer ${user.token}` },
              }
            );

            if (imageResponse.status !== 200) {
              throw new Error(
                `Failed to delete the image: ${imageResponse.statusText}`
              );
            }
            console.log(`Deleted previous image: ${imageName}`);
          } catch (err) {
            console.error("Error deleting previous image:", err);
          }
        } else {
          console.log("No valid image URL to delete");
        }
      };

      if (blogImage) {
        await deletePreviousImage(blogImage);
      }

      // delete previous image before uploading new image

      // Perform API request to save formData
      const response = await api.patch(`/api/user/${user.id}`, formData);
      console.log("Form data saved:", response.data.username);
      setIsEditing(false); // Exit edit mode
      navigate(`/profile/${user.id}`);
    } catch (error) {
      console.error("Error saving form data:", error);
      // Handle error state or display an error message to the user
    }
  };

  const discardChanges = () => {
    fileInputRef.current.value = ""; // Clear the file input
    setFormData({ ...originalFormData, avatar: null }); // Reset formData to original and clear avatar
    setIsEditing(false); // Exit edit mode
  };

  const fileInputRef = useRef(null);

  return (
    <>
      <section className="md:col-span-12 mb-8 lg:p-6 p-4">
        <div className="items-center justify-center p-4 bg-white  dark:text-spot-light dark:bg-spot-dark2 rounded-lg">
          <div className="items-center p-4">
            <div className="flex items-center justify-between">
              <h3 className="mb-4 text-md font-bold">Update Profile Details</h3>
              <h3
                className={`mb-4 text-md font-bold cursor-pointer 

                  ${isEditing ? "text-red-600" : "hover:text-blue-400"}`}
                onClick={isEditing ? discardChanges : handleEditClick}
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
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500 dark:text-spot-light dark:bg-spot-dark2 dark:focus:bg-spot-dark  dark:border-spot-light  dark:focus:border-spot-green"
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
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 focus:outline-none outline-blue-500 dark:text-spot-light dark:bg-spot-dark2 dark:focus:bg-spot-dark  dark:border-spot-light  dark:focus:border-spot-green"
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
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 focus:outline-none outline-blue-500 dark:text-spot-light dark:bg-spot-dark2 dark:focus:bg-spot-dark  dark:border-spot-light  dark:focus:border-spot-green"
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
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 focus:outline-none outline-blue-500 dark:text-spot-light dark:bg-spot-dark2 dark:focus:bg-spot-dark  dark:border-spot-light  dark:focus:border-spot-green"
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
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 focus:outline-none outline-blue-500 dark:text-spot-light dark:bg-spot-dark2 dark:focus:bg-spot-dark  dark:border-spot-light  dark:focus:border-spot-green"
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
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 focus:outline-none outline-blue-500 dark:text-spot-light dark:bg-spot-dark2 dark:focus:bg-spot-dark  dark:border-spot-light  dark:focus:border-spot-green"
                    value={formData.location}
                    onChange={handleInputChange}
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
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 focus:outline-none outline-blue-500 dark:text-spot-light dark:bg-spot-dark2 dark:focus:bg-spot-dark  dark:border-spot-light  dark:focus:border-spot-green"
                    rows="5"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  ></textarea>
                </div>
              </div>
              <div className="flex flex-col md:flex-row  gap-4 mb-8 md:mb-0">
                <button
                  type="submit"
                  className={`px-4 py-2 text-white transition ${
                    isEditing
                      ? "bg-blue-500 hover:bg-blue-700 dark:bg-spot-green dark:hover:bg-spot-green/80 "
                      : "bg-gray-400 cursor-not-allowed dark:bg-gray-400  "
                  } `}
                  onClick={handleSaveChanges}
                  disabled={!isEditing}
                >
                  Save changes
                </button>

                <button
                  type="submit"
                  className="bg-white border-gray-300 block transition border hover:bg-gray-200 text-gray-700 py-2 px-4 dark:border-none dark:text-white dark:bg-spot-dark3 dark:hover:bg-spot-dark3/80"
                >
                  <Link
                    to={`/profile/${user.id}`}
                    className="w-full h-full block text-inherit no-underline"
                  >
                    Go back
                  </Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserDetails;
