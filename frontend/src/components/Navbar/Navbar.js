import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import logoSVG from "../../assets/flash-cards.svg";

import API from "../../API/API";

export default function Navbar({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    API.logout().then((res) => {
      setUser();
      navigate("/");
      localStorage.removeItem("flashcardData");
      localStorage.removeItem("userData");
      localStorage.removeItem("cardsData");
    });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (!user) {
      navigate("/");
    } else setUser(user);
  }, [setUser]);
  return (
    <header className="py-2 border-b border-gray-300 dark:bg-gray-700">
      <div className="flex items-center justify-between xl:max-w-7xl xl:mx-auto max-w-full px-[8%] flex-wrap w-full">
        <img id="logo" src={logoSVG} alt="Logo" /> {/* size css in index.css */}
        <FiMenu
          className="block w-6 h-6 cursor-pointer md:hidden dark:text-gray-400"
          onClick={() => {
            setOpen(!open);
          }}
        />
        <nav
          className={`w-full md:flex md:items-center md:w-auto ${
            open ? "block" : "hidden"
          }`}
        >
          <ul className="text-base text-gray-600 md:flex md:justify-between">
            <li>
              <Link
                className="block py-2 font-semibold md:px-5 hover:text-blue-700 dark:text-gray-400"
                to="/"
              >
                Home
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  className="block py-2 font-semibold md:px-5 hover:text-blue-700 dark:text-gray-400"
                  to="/cardgroups"
                >
                  All Decks
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <Link
                  className="block py-2 font-semibold md:px-5 hover:text-blue-700 dark:text-gray-400"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <Link
                  className="block py-2 font-semibold md:px-5 hover:text-blue-700 dark:text-gray-400"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link
                  className="block py-2 font-semibold md:px-5 hover:text-blue-700 dark:text-gray-400"
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
            )}
            {user && (
              <li>
                <a
                  className="block py-2 font-semibold text-red-500 md:px-5 hover:text-blue-700"
                  onClick={logout}
                >
                  Logout
                </a>
              </li>
            )}
            {/* <li className="py-2 md:pt-2">
              <CgDarkMode className="block w-6 h-6 cursor-pointer dark:text-gray-400" onClick={toggleTheme}/>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
