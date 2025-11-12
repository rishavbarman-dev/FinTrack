import React, { useContext, useState } from "react";
import loginCardImage from "../assets/images/white_login_background.png";
import usernameIcon from "../assets/images/username.png";
import passwordIcon from "../assets/images/password.png";
import eyeIcon from "../assets/images/password_show.png";
import eyeOffIcon from "../assets/images/password_hide.png";
import loginIcon from "../assets/images/login_icon_white.png";
import waveBackground from "../assets/images/background_left_login.png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { UserContext } from "@/context/UserContext";
import toast from "react-hot-toast";
import GlobalLoader from "@/utils/GlobalLoader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { updateUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Input validation before API call
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const loadingToast = toast.loading("Signing in...");
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);

        toast.dismiss(loadingToast);
        toast.success(`Welcome back, ${user?.name || "User"}! 🎉`);
        navigate("/dashboard");
      } else {
        toast.dismiss(loadingToast);
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      toast.dismiss();

      if (error.response) {
        if (error.response.status === 401)
          toast.error("Invalid email or password.");
        else if (error.response.status === 404)
          toast.error("Account not found. Please sign up first.");
        else
          toast.error(error.response.data?.message || "Something went wrong.");
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Unexpected error occurred. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <GlobalLoader />}
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
              Login
            </h1>

            {/* Email */}
            <div className="mb-5 relative">
              <label
                htmlFor="email"
                className="block mb-2 text-gray-800 font-medium capitalize"
              >
                Email
              </label>
              <img
                src={usernameIcon}
                alt="Email"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 mt-4"
              />
              <input
                type="text"
                id="email"
                placeholder="Username or Email"
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
              <Link
                to="/forgot-password"
                className="text-indigo-600 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
              <Link
                to="/signup"
                className="text-indigo-600 hover:underline text-sm"
              >
                New User!
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="flex items-center justify-center w-40 py-3 rounded-md text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-purple-500 hover:to-indigo-600 transition"
            >
              <img src={loginIcon} alt="Login" className="w-5 h-5 mr-2" />
              <span>Login</span>
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
    </>
  );
};

export default Login;
