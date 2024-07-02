import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";


function Signin() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(identifier, password);

    if (error) {
      toast.error(error);

    }
  };


  return (
    <>
      <div>
        <Toaster />
      </div>
      <section className="md:col-span-12 lg:p-6 sm:p-4 flex items-center justify-center ">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:max-w-md">
          <div className="text-center mb-4">
            {/* <img src={logo} alt="logo" className="w-40 inline-block" /> */}
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Signin to your account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username or Email
                </label>
                <div className="mt-2">
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    autoComplete="identifier"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 outline-blue-500"
                    placeholder="Enter username or email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
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
                <button
                  type="submit"
                  className="flex w-full justify-center bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
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

export default Signin;