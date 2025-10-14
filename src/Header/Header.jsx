import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const allUser = useSelector((state) => state.app.user);
  const authStatus = useSelector((state) => state.app.status);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItem = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      path: "/allpost",
      name: "All Post",
      all: (
        <span className="bg-white text-cyan-600 rounded-full px-2 py-0.5 text-xs font-semibold">
          ({allUser?.length || 0})
        </span>
      ),
      active: true,
    },
    {
      path: "/addpost",
      name: "Add Post",
      active: authStatus,
    },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <header className="bg-cyan-600 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Title */}
        <div
          className="text-white font-bold text-lg md:text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          UserPortal
        </div>


        <button
          className="text-white md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

   
        <nav
          className={`${
            menuOpen
              ? "flex flex-col absolute top-full left-0 w-full bg-cyan-600 shadow-md md:hidden"
              : "hidden"
          } md:flex md:flex-row md:static md:w-auto items-center gap-4 md:gap-8 transition-all duration-300`}
        >
          {navItem.map(
            (item, index) =>
              item.active && (
                <div
                  key={index}
                  className={`flex items-center justify-between md:justify-center gap-2 px-4 py-2 md:rounded-md transition-colors cursor-pointer ${
                    location.pathname === item.path
                      ? "bg-cyan-700"
                      : "hover:bg-cyan-500"
                  }`}
                  onClick={() => handleNavClick(item.path)}
                >
                  <span className="text-white font-medium text-sm md:text-base">
                    {item.name}
                  </span>
                  {item.all && item.all}
                </div>
              )
          )}

          {!authStatus && (
            <>
              <button
                className="text-white font-medium text-sm md:text-base hover:bg-blue-500 px-4 py-2 rounded-md transition"
                onClick={() => handleNavClick("/login")}
              >
                Login
              </button>
              <button
                className="text-white font-medium text-sm md:text-base hover:bg-blue-500 px-4 py-2 rounded-md transition"
                onClick={() => handleNavClick("/signup")}
              >
                Sign Up
              </button>
            </>
          )}
          {authStatus && <LogoutBtn />}
        </nav>
      </div>
    </header>
  );
}

export default Header;
