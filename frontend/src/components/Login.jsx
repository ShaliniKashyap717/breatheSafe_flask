
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        formData
      );
      const { token, name, email } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ email, name }));

      setUser({ email, name });

      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const googleAuth = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/google`, "_self");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-100/20 to-blue-100/20"></div>
        <img
          src="/front.png"
          alt="Clean Air Environment"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/10 to-transparent"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 lg:p-12 bg-white/80 backdrop-blur-sm">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src="/breathsafe.jpeg"
              alt="BreathSafe Logo"
              className="mx-auto h-16 w-auto mb-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Sign in to monitor air quality</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 bg-white/90 hover:bg-white hover:shadow-sm"
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 bg-white/90 hover:bg-white hover:shadow-sm"
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-xl hover:from-teal-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg font-medium"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Google Login */}
            <button
              className="w-full h-12 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md font-medium text-gray-700 cursor-pointer flex items-center justify-center gap-3 transition-all duration-300 hover:bg-gray-50 transform hover:scale-[1.02]"
              onClick={googleAuth}
            >
              <img
                className="w-5 h-5"
                src="/images/google.png"
                alt="google icon"
              />
              <span>Continue with Google</span>
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-teal-600 font-medium cursor-pointer hover:text-teal-700 hover:underline transition-colors duration-200"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
