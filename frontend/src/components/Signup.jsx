import React, { useContext, useState } from "react";
import loginCardImage from "../assets/images/white_login_background.png";
import usernameIcon from "../assets/images/username.png";
import passwordIcon from "../assets/images/password.png";
import eyeIcon from "../assets/images/password_show.png";
import eyeOffIcon from "../assets/images/password_hide.png";
import loginIcon from "../assets/images/login_icon_white.png";
import waveBackground from "../assets/images/background_left_login.png";
import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // signup api call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        firstName,
        lastName,
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user); // Update user context
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred during Signup. Please try again.");
      }
    }
  };

  return (
    <div className="flex w-screen h-screen bg-white overflow-hidden relative flex-col lg:flex-row">
      {/* Form Section */}
      <div
        className="flex flex-col justify-center items-center flex-1 h-full p-8 md:p-12 lg:p-16 bg-white bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url(${waveBackground})`,
        }}
      >
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md space-y-6 bg-transparent"
        >
          <h1 className="text-[2.9rem] font-bold text-left mb-2 bg-gradient-to-r from-gray-300 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
            Signup
          </h1>

          {/* First Name */}
          <div className="mb-5 relative">
            <label
              htmlFor="firstName"
              className="block mb-2 text-gray-800 font-medium capitalize"
            >
              First Name
            </label>
            <img
              src={usernameIcon}
              alt="First Name"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 mt-4"
            />
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-md text-base focus:outline-none"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-5 relative">
            <label
              htmlFor="lastName"
              className="block mb-2 text-gray-800 font-medium capitalize"
            >
              Last Name
            </label>
            <img
              src={usernameIcon}
              alt="Last Name"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 mt-4"
            />
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-md text-base focus:outline-none"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-5 relative">
            <label
              htmlFor="email"
              className="block mb-2 text-gray-800 font-medium capitalize"
            >
              Email
            </label>
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 mt-4">
              <Mail className="w-5 h-5" />
            </span>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-md text-base focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-5 relative">
            <label
              htmlFor="password"
              className="block mb-2 text-gray-800 font-medium capitalize"
            >
              Password
            </label>
            <img
              src={passwordIcon}
              alt="Password"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 mt-4"
            />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="*********"
              className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-md text-base focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <img
                src={showPassword ? eyeOffIcon : eyeIcon}
                alt={showPassword ? "Hide password" : "Show password"}
                className="w-5 h-5 mt-8"
              />
            </button>
          </div>

          <div className="flex justify-end space-x-3">
            {/* Forgot Password */}
            <div className="text-right mb-2">
              <Link
                to="/forgot-password"
                className="text-indigo-600 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>
            {/* Login */}
            <div className="text-right mb-2">
              <Link
                to="/login"
                className="text-indigo-600 hover:underline text-sm"
              >
                Already have an account?
              </Link>
            </div>
          </div>

          {/* Messages */}
          {errorMessage && (
            <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm mt-2">{successMessage}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="flex items-center justify-center w-40 py-3 rounded-md text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-purple-500 hover:to-indigo-600 transition"
          >
            <img src={loginIcon} alt="Login" className="w-5 h-5 mr-2" />
            <span>Signup</span>
          </button>
        </form>
      </div>

      {/* Image Section */}
      <div className="flex flex-1 justify-center items-center h-1/3 lg:h-full p-6 md:p-10 lg:p-12 bg-gradient-to-r from-white via-purple-400 to-indigo-600">
        <img
          src={loginCardImage}
          alt="Login Card"
          className="max-w-[70%] max-h-[70%] rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
