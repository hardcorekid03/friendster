import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import useTitleAndSlug from "../hooks/useTitleAndSlug";
import toast, { Toaster } from "react-hot-toast";
import api from "../api/Api"; // Adjust the path as per your file structure
import defaultImage from "../assets/images/dafaultImage.jpg";
import { useAuthContext } from "../hooks/useAuthContext";
import debounce from "lodash/debounce"; // Import debounce from lodash
import { IF } from "./url";

function CreatePost() {
  const { user } = useAuthContext();
  const { id } = useParams();

  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [blogbody, setBlogbody] = useState("");
  const [image, setImage] = useState(null);
  const { title, setTitle, slug, handleTitleChange, resetTitleAndSlug } =
    useTitleAndSlug();
  const [error, setError] = useState("");

  const debouncedHandleChange = useRef(
    debounce((event) => {
      if (event.target.files[0]) {
        setSelectedFile(event.target.files[0]);
        setImage(event.target.files[0]); // Update the image state with the new file
      }
    }, 300)
  ).current;

  useEffect(() => {
    if (id && user) {
      // If there's an ID, fetch the blog details for editing
      const fetchBlogDetails = async () => {
        try {
          const response = await api.get(`/api/blogs/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          const data = response.data;
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
      slug,
      blogbody,
    };

    if (selectedFile) {
      const data = new FormData();
      const alphanumericKey = Math.random().toString(36).slice(2, 9);
      const filename = `blog-${alphanumericKey}-${Date.now()}${
        selectedFile.name
      }`;
      data.append("img", filename);
      data.append("file", selectedFile);
      blog.image = filename;
      try {
        const imgUpload = await api.post("/api/upload/", data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log(imgUpload.data);
      } catch (err) {
        console.log(err);
      }
    } else if (id && image) {
      blog.image = image;
    }

    try {
      let response;
      if (id) {
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
      setError(error.response.data.error);
      toast.error("All fields are required");
    }
  };

  return (
    <>
      <section className="md:col-span-12 md:mb-8 lg:p-6 sm:p-4">
        <div className="p-4 bg-white mb-8">
          <div>
            <Toaster />
          </div>
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
                onChange={debouncedHandleChange} // Use debounced handler
              />
            </div>

            {/* Conditional rendering */}

            <div className="relative cursor-pointer flex items-center justify-center bg-gray-00 border-dashed border-2 border-gray-300 hover:border-blue-300 hover:shadow w-[100%] md:h-[250px] h-[250px] p-2">
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
                  src={IF + image} // Assuming `IF` resolves to the correct image path
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
              className="w-full border border-gray-300 focus:border-blue-500 focus:outline-none focus:border-opacity-100 px-4 py-2"
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

          <div className="px-2 py-8 mt-10 ">
            <button
              className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 px-4 inline-flex items-center"
              onClick={handleSubmit}
            >
              <svg
                className="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span className="">Save Post</span>
            </button>

            <button
              className="bg-white border-gray-300 border hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 inline-flex items-center"
              onClick={handleCancel}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="fill-current w-4 h-4 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              <span>Cancel</span>
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
