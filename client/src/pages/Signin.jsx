import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

function Signin() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(identifier, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <section className="md:col-span-12 lg:p-6 sm:p-4 flex items-center justify-center ">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:max-w-md dark:bg-spot-dark2 ">
          <div className="text-center mb-4">
            {/* <img src={logo} alt="logo" className="w-40 inline-block" /> */}
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-spot-light">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-spot-light"
                >
                  {/* Username or Email */}
                </label>
                <div className="mt-2">
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    autoComplete="identifier"
                    required
                    className="border  text-gray-800 border-gray-300 bg-white w-full text-sm px-4 py-3  focus:outline-none outline-blue-500 dark:text-spot-light dark:bg-spot-dark2 dark:focus:bg-spot-dark  dark:border-spot-light  dark:focus:border-spot-green"
                    placeholder="Enter username or email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-spot-light"
                >
                  {/* Password */}
                </label>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="border  text-gray-800 focus:outline-none border-gray-300 bg-white w-full text-sm px-4 py-3 outline-blue-500 dark:text-spot-light dark:bg-spot-dark2 dark:focus:bg-spot-dark  dark:border-spot-light  dark:focus:border-spot-green"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  dark:bg-spot-green dark:hover:bg-spot-green/80"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500 dark:text-spot-light">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-spot-green"
              >
                Sign up
              </Link>
            </p>

            <div className="error mt-5 ">
              {error && (
                <div className=" border border-red-500 p-4 w-full flex justify-center items-center">
                  <p className="error text-red-500 ">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signin;
