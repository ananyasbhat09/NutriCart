
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const name = email.split("@")[0];

    // Save the user's name in the browser
    localStorage.setItem("nutricartUser", name);

    setUserName(name);
    setLoggedIn(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-5">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-green-700 text-center mb-2">
          Nutri-Cart
        </h1>

        {!loggedIn ? (
          <>
            <p className="text-gray-500 text-center mb-8">
              Welcome back! Please login.
            </p>

            <form onSubmit={handleLogin} className="space-y-6">

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 bg-white outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Password
                </label>

                <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full p-3 text-gray-800 bg-white outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-3 text-green-700 font-medium"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
              >
                Login
              </button>

            </form>

            <p className="text-center text-gray-500 mt-6">
              Don't have an account?{" "}
              <span className="text-green-700 font-semibold">
                Sign up
              </span>
            </p>
          </>
        ) : (
          <div className="text-center mt-8">
            <div className="text-5xl mb-4">✓</div>

            <h2 className="text-2xl font-bold text-green-700 mb-3">
              Login Successful!
            </h2>

            <p className="text-gray-600 mb-6">
              Welcome, {userName}! You have successfully logged in.
            </p>

            <Link
              href="/"
              className="block w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
            >
              Go to Home
            </Link>
          </div>
        )}

        {!loggedIn && (
          <div className="text-center mt-6">
            <Link href="/" className="text-green-700 hover:underline">
              ← Back to Home
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
