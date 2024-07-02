import React, { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { IF } from "./url";
import { format } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";
import Trending from "./Trending";

function Recent() {

  const { user } = useAuthContext();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("api/blogs",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    if(user){
      fetchBlogs();
    }
  }, [user]);

  return (
    <>
      <section className="md:col-span-9 md:mb-8 lg:p-6 sm:p-4">
        <div className="items-center justify-center p-4 mb-8 bg-white">
          <div className="flex items-center justify-between p-4 sm:p-2">
            <h3 className="text-xl font-semibold ">Recent Posts</h3>
            <Link
              to="/createpost"
              className="text-xl font-semibold hover:text-gray-700 cursor-pointer h-8 w-8 flex items-center justify-center"
            >
              <PencilSquareIcon className="h-full w-full" />
            </Link>
          </div>
          {loading ? (
            <div className="container py-5">
              <p> Loading... </p>
            </div>
          ) : (
            <>
              {blogs.map((blog, index) => (
                <div
                  key={index}
                  className="md:flex shadow-md bg-white rounded-lg border-0 border-gray-100 hover:border-blue-200 mt-4 hover:shadow-lg hover:shadow-zinc-300 cursor-pointer p-4 mb-4"
                >
                  <div className="blog-img mb-4 md:w-[35%] h-[220px]  sm:w-[75%] ">
                    <img
                      src={IF + blog.image}
                      alt={blog.title}
                      className="blog-img h-full w-full object-cover "
                    />
                  </div>
                  <div className="blog-prev mb-4 md:ml-4 flex-col md:w-[65%] ">
                    <Link to={`/postdetails/${blog._id}`} key={blog._id}>
                      <div className="mb-2 ">
                        <h3 className="text-lg font-semibold">{blog.title}</h3>

                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              blog.blogbody.slice(0, 250) + " ....Read more",
                          }}
                        />
                      </div>
                    </Link>
                    <div className="md:flex justify-between items-center ">
                      <span className="text-regular text-md text-blue-500 cursor-pointer flex items-center">
                        <img
                          src="https://cdn-icons-png.freepik.com/512/168/168725.png" // Replace with the actual path to your avatar image
                          alt="Avatar"
                          className="inline-block h-8 w-8 object-cover rounded-full mr-2"
                        />
                        {blog.author}
                      </span>
                      <span className="text-regular text-sm text-gray-400 cursor-pointer flex items-center ">
                        Posted:{" "}
                        {`${format(new Date(blog.createdAt), "MMM dd, yyyy")} `}
                      </span>
                    </div>
                    <div className="md:flex justify-end items-center mt-4 ">
                      <span className="text-regular text-sm text-gray-400 cursor-pointer flex items-center ">
                        Add to favorites
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
      <section className="sm:block hidden md:col-span-3 md:mb-8 lg:p-6 sm:p-0 md:p-4 ">
        <Trending />
      </section>
    </>
  );
}

export default Recent;
