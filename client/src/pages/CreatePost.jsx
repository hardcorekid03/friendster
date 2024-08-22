import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import useTitleAndSlug from "../hooks/useTitleAndSlug";
import toast, { Toaster } from "react-hot-toast";
import api from "../api/Api"; // Adjust the path as per your file structure
import defaultImage from "../assets/images/dafaultImage.jpg";
import { useAuthContext } from "../hooks/useAuthContext";
import app from "../config/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

function CreatePost() {
  const { user } = useAuthContext();
  const { id } = useParams();

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [blogbody, setBlogbody] = useState("");
  const [image, setImage] = useState(null);
  const { title, setTitle } = useTitleAndSlug();
  const [error, setError] = useState("");
  const [blogDetails, setBlogDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploading(true);
  };

  useEffect(() => {
    if (id && user) {
      // If there's an ID, fetch the blog details for editing
      const fetchBlogDetails = async () => {
        try {
          const response = await api.get(`/api/blogs/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          const data = response.data;
          setBlogDetails(data); // Set blog data without author details in case of error
          setBlogbody(data.blogbody);
          setTitle(data.title);
          setImage(data.image);
        } catch (error) {
          console.error("Error fetching blog details for editing:", error);
        }
      };

      fetchBlogDetails();
    }
  }, [id, user, setBlogbody, setTitle, setImage]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  const resetTitleAndSlug = () => {
    setTitle("");
  };

  const handleReset = () => {
    setSelectedFile(null);
    fileInputRef.current.value = null;
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleSvgClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setLoading(false);
      return;
    }
    const blog = {
      title,
      blogbody,
    };

    let finalImageURL = imageURL;

    if (selectedFile) {
      try {
        setLoading(true);
        const alphanumericKey = Math.random().toString(36).slice(2, 9);
        const filename = `blog-${alphanumericKey}-${Date.now()}`;

        const storage = getStorage(app);
        const storageRef = ref(storage, "images/blogs/" + filename);

        await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(storageRef);
        finalImageURL = downloadURL; // Update the finalImageURL with the uploaded image URL
        blog.image = finalImageURL;
      } catch (error) {
        setError("Failed to upload image.");
        toast.error("Failed to upload image.");
        setLoading(false);
        return;
      }
    }

    try {
      let response;
      if (id) {
        // Delete the existing image if it exists
        if (id && user && image && uploading) {
          const imageUrl = image;
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
        response = await api.patch(`/api/blogs/${id}`, blog, {
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
        resetTitleAndSlug();
        setBlogbody("");
        setError(null);
        setSelectedFile(null);
        fileInputRef.current.value = null;
        console.log("Blog posted!");
        toast.success("Blog added successfully");
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong.");
      toast.error("All fields are required");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <section className="md:col-span-12 md:mb-8 mb-12 lg:p-6 sm:p-4">
        <div className="p-4 bg-white mb-8 dark:bg-spot-dark2 dark:text-spot-light">
          <div className=" mb-2 p-2">
            <div className="hidden preview-img mb-2">
              <label className="text-sm text-gray-400 font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Upload Banner
              </label>
              <input
                className="flex w-full cursor-pointer bg-white text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:text-lg file:font-lg"
                type="file"
                accept="image/*"
                id="picture"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>

            {/* Conditional rendering */}

            <div className="relative cursor-pointer flex items-center justify-center bg-gray-00 border-dashed border-2 border-gray-300 hover:border-blue-300 hover:shadow w-[100%] md:h-[250px] h-[250px] p-2 dark:hover:border-spot-green">
              <div className="absolute top-2 right-2 bg-gray-400 text-white px-3 py-1 rounded ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 "
                  onClick={handleReset}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>

              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected File"
                  className="object-contain w-full h-full cursor-pointer"
                  onClick={handleSvgClick}
                  onError={handleImageError}
                />
              ) : image && id ? (
                <img
                  src={image} // Assuming `IF` resolves to the correct image path
                  alt="Selected File"
                  className="object-contain w-full h-full cursor-pointer"
                  onClick={handleSvgClick}
                  onError={handleImageError}
                />
              ) : (
                <div className="flex flex-col justify-center items-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-12 cursor-pointer"
                    onClick={handleSvgClick}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <h1 className="text-sm "> Upload Image</h1>
                </div>
              )}
            </div>
          </div>

          <div className="preview-img p-2">
            <input
              className="border  text-gray-800 focus:outline-none border-gray-300 bg-white w-full text-sm px-4 py-3 outline-blue-500 dark:text-spot-light dark:bg-spot-dark2 dark:focus:bg-spot-dark  dark:border-spot-light  dark:focus:border-spot-green"
              placeholder="Enter blog title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>

          <div className="p-2 w-[100%] md:h-[400px] h-[600px]">
            <ReactQuill
              value={blogbody}
              placeholder="Write a blog now..."
              onChange={(e) => setBlogbody(e)}
              className="h-full w-full"
            />
          </div>
          {/* <TiptapEditor /> */}
          <div className="px-2 py-8 mt-10 ">
            <button
              className="mr-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 inline-flex items-center dark:bg-spot-green dark:hover:bg-spot-green/80 "
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Save Post"}
            </button>

            <button
              className="bg-white border-gray-300 border hover:bg-gray-200 text-gray-700  py-2 px-4 inline-flex items-center dark:border-none dark:text-white dark:bg-spot-dark3 dark:hover:bg-spot-dark3/80"
              onClick={handleCancel}
            >
              <span>Cancel.</span>
            </button>
          </div>
        </div>
      </section>

      {/* <section className="sm:block hidden md:col-span-3 md:mb-8 lg:p-6 sm:p-0 md:p-4 ">
        <Trending />
      </section> */}
    </>
  );
}

export default CreatePost;
