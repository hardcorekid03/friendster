import React from "react";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Signup() {
  // const { logout } = useLogout();
  const { signup, error, isLoading } = useSignup();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [birthdateString, setbirthdateString] = useState(null);
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      // toast.error("Passwords do not match");
      return;
    }

    await signup({
      username,
      email,
      password,
      birthdateString: birthdateString.toISOString().split("T")[0], // Format birthdateString to "YYYY-MM-DD"
      location,
      gender,
    });

    if (!error) {
      toast.error(error.message);
    }
  };

  // const handleLogout = () => {
  //   logout();
  // };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <section className="md:col-span-12 lg:p-6 sm:p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:max-w-md">
          <div className="text-center mb-4">
            {/* <img src={logo} alt="logo" className="w-40 inline-block" /> */}
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a new account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex mt-2 justify-between gap-1">
                <div>
                  <label
                    htmlFor="birthdateString"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    birthdateString
                  </label>
                  <DatePicker
                    id="birthdateString"
                    selected={birthdateString}
                    onChange={(date) => setbirthdateString(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={handleGenderChange}
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Location
                </label>
                <div className="mt-2">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    autoComplete="location"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password2"
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
                    className={`text-gray-800 bg-white border ${
                      password !== password2
                        ? "border-red-500"
                        : "border-gray-300"
                    } w-full text-sm px-4 py-3 outline-blue-500`}
                    placeholder="Re-enter password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                  {password !== password2 && (
                    <p className="text-red-500 text-xs mt-1">
                      Passwords do not match
                    </p>
                  )}
                  {password === password2 && password2 !== "" && (
                    <p className="text-green-500 text-xs mt-1">
                      Passwords match
                    </p>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing un..." : "Sign up"}
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

            <div className="error mt-5">
              {error && <p className="error">{error}</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
