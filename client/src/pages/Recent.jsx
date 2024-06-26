import React, { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { IF } from "./url";
function Recent() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("api/blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="items-center justify-center p-2 mb-8">
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
            {blogs.map((blog,index) => (
              <Link to={`/postdetails/${blog._id}`} key={blog._id}>
              <div
                key={index}
                className="md:flex shadow-md border-2  border-gray-100 hover:border-blue-200 mt-4 hover:shadow-lg hover:shadow-zinc-300 cursor-pointer p-4 mb-4 sm:p-2"
              >
                <div className="blog-img mb-4 md:w-[35%] h-[220px]  sm:w-[75%] ">
                  <img
                    src={IF + blog.image}
                    className="blog-img h-full w-full object-cover "
                  />
                </div>
                <div className="blog-prev mb-4 md:ml-4 flex-col md:w-[65%]">
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <div className="mb-2 leading-relaxed">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blog.blogbody.slice(0, 300) + " ...Read more",
                      }}
                    />
                  </div>

                    <span className="font-semibold text-blue-400 cursor-pointer flex items-center">
                      <img
                        src="https://cdn-icons-png.freepik.com/512/168/168725.png" // Replace with the actual path to your avatar image
                        alt="Avatar"
                        className="inline-block h-8 w-8 object-cover rounded-full mr-2"
                      />
                      {blog.author}
                    </span>

                </div>
              </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default Recent;

