import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetchUsers from "../hooks/useFetchUsers";
import { differenceInYears, parseISO, format } from "date-fns";
import defaultAvatar from "../assets/images/avatar.jpg";

function People() {
  const { userData } = useFetchUsers();
  const calculateAge = (dob) => {
    const birthDate = parseISO(dob); // Parse the date string to a Date object
    const today = new Date();
    return differenceInYears(today, birthDate);
  };

  const handleAvatarError = (event) => {
    event.target.src = defaultAvatar;
  };

  return (
    <section className="md:col-span-12 text-gray-600 body-font dark:text-spot-light mb-20 md:mb-2  ">
      <div className="container px-5 py-4 mx-auto ">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 dark:text-spot-green ">
            Our Members
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base lead">
            Engaged and passionate contributors who enrich our community with
            diverse perspectives and insights.
          </p>
        </div>
        <div className="flex flex-wrap -m-2  ">
          {userData.map((member, index) => (
            <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full ">
              <Link to={`/profile/${member._id}`}>
                <div className="cursor-pointer h-full flex items-center border-spot-light border p-4 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:bg-spot-dark2 dark:hover:border-spot-green dark:hover:bg-spot-dark3/10">
                  <img
                    alt="team"
                    className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                    src={member.userimage}
                    onError={handleAvatarError}
                  />
                  <div className="flex-grow">
                    <span className="text-gray-900 title-font font-medium dark:text-spot-light ">
                      {member.username}{" "}
                      <h2 className="text-xs">
                        {member?.birthdate && (
                          <>
                            {calculateAge(member.birthdate)} {member.gender}{" "}
                          </>
                        )}
                      </h2>
                    </span>
                    <p className="text-gray-500 text-sm">
                      {member.location || "bio not found"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default People;
