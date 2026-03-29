import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart3,
  Users,
  SearchCheck,
  User,
  Wind,
  LogOut,
} from "lucide-react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/home", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
    { name: "Community", path: "/community", icon: Users },
    { name: "Explore", path: "/explore", icon: SearchCheck },
  ];

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <nav className="bg-[#E6FFFA] shadow-md sticky top-0 z-50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
            {/* <Wind className="h-8 w-8 text-[#2C7A7B]" /> */}
            <span className="text-2xl font-bold text-[#2C7A7B] tracking-wide">
              BreatheSafe
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200
                      ${
                        isActive
                          ? "bg-gradient-to-r from-[#2C7A7B] to-[#4FD1C5] text-white shadow"
                          : "text-[#319795] hover:bg-[#E6FFFA] hover:text-[#2C7A7B]"
                      }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}

              {/* User Dropdown/Login */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-[#319795] hover:bg-[#E6FFFA] hover:text-[#2C7A7B] flex items-center gap-2 transition-all duration-200"
                  >
                    <User size={18} />
                    {user.name}
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg min-w-[140px] border border-[#EDF2F7] animate-fade-in">
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-[#2C7A7B] hover:bg-[#E6FFFA] rounded-xl transition-colors duration-200"
                      >
                        <LogOut size={16} className="mr-2 inline" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[#319795] hover:bg-[#E6FFFA] hover:text-[#2C7A7B] flex items-center gap-2 transition-all duration-200"
                >
                  <User size={18} />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style>
        {`
        .animate-fade-in {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
