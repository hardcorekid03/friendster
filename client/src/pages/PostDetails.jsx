import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import { IF, URL } from "./url";

function PostDetails() {
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(URL + `api/blogs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setBlogDetails(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [id]);
  console.log(id);

  return (
    <>
      <div className="items-center justify-center p-4 sm:p-2 ">
        <div className="flex items-center justify-between p-4 sm:p-2">
          <h3 className="text-xl font-semibold ">Post Details</h3>
          <Link
            to="/"
            className="text-xl font-semibold hover:text-gray-700 cursor-pointer h-8 w-8 justify-center"
          >
            <ArrowLeftIcon className="h-full w-full" />
          </Link>
        </div>
        <div className="container mx-auto flex  py-4 items-center justify-center flex-col ">
          {loading ? (
            <p>Loading...</p>
          ) : (
            blogDetails && (
              <>
                <div className=" mb-4 w-[100%] md:h-[400px] h-[250px] p-4 sm:p-2">
                  <img
                    className="h-full w-full object-cover"
                    alt="hero"
                    src={IF + blogDetails.image}
                  />
                </div>
                <div className="p-4 sm:p-2">
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                    {blogDetails.title}
                  </h1>
                  <div className="mb-2 leading-relaxed">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blogDetails.blogbody,
                      }}
                    />
                  </div>
                  <span className="font-semibold text-blue-700 cursor-pointer">
                    by: @hardcorekid03
                  </span>
                  <div className="flex justify-center"></div>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default PostDetails;
