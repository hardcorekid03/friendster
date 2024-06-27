import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from "../assets/images/logo.png";

function Signup() {
  const [birthdate, setBirthdate] = useState(null);
  const [gender, setGender] = useState("");

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <section className="md:col-span-12 lg:p-6 sm:p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:max-w-md  ">
        <div className="text-center mb-4">
          <img src={logo} alt="logo" className="w-40 inline-block" />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3  outline-blue-500"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3  outline-blue-500"
                  placeholder="Enter email"
                />
              </div>
            </div>
            <div>
              <div className="flex mt-2 justify-between gap-1">
                <div>
                  <label
                    htmlFor="birthdate"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Birthdate
                  </label>
                  <DatePicker
                    id="birthdate"
                    selected={birthdate}
                    onChange={(date) => setBirthdate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="birthdate"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={handleGenderChange}
                    className="text-gray-800  bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
                  placeholder="Enter password"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Re-enter Password
              </label>
              <div className="mt-2">
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
                  placeholder="Re-enter password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Signup;
