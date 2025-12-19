import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { FaUser } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext)
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Prioritize the stable URL if you find it in the user object
  const stablePhotoURL = user?.reloadUserInfo?.photoUrl || user?.photoURL;

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire("Logout Successful!");
      }).catch((error) => {
        console.log(error)
      });
  }

  const baseClass =
    "font-[Open_Sans] inline-block p-2 rounded-lg transition-colors duration-300 cursor-pointer";
  const activeClass = "bg-[#1BA9B5] text-white font-semibold";
  const hoverClass = "hover:bg-[#1BA9B5] hover:text-white hover:font-semibold";

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const closeDropdown = () => setOpenDropdown(null);

  // Determine active parent links
  const isAssessmentsActive = location.pathname.startsWith("/assessments");
  const isResourcesActive =
    location.pathname.startsWith("/resources") ||
    location.pathname.startsWith("/blogs") ||
    location.pathname.startsWith("/education-awareness") ||
    location.pathname.startsWith("/faqs");

  const isAboutActive =
    location.pathname.startsWith("/team-members") ||
    location.pathname.startsWith("/about-project") ||
    location.pathname.startsWith("/mission-vision");

  const isContactActive =
    location.pathname.startsWith("/help-center") ||
    location.pathname.startsWith("/contact-support") ||
    location.pathname.startsWith("/accessibility-support");

  const navLinks = (
    <>
      {/* HOME */}
      <li className="mx-1">
        <NavLink
          to="/"
          className={({ isActive }) => `${baseClass} ${isActive ? activeClass : hoverClass}`}
          onClick={closeDropdown}
        >
          Home
        </NavLink>
      </li>

      {/* SELF-ASSESSMENTS */}
      <li className="relative dropdown dropdown-hover mx-1 group">
        <NavLink
          to="/assessments"
          className={`${baseClass} ${hoverClass} inline-flex gap-1 items-center ${isAssessmentsActive ? activeClass : ""
            }`}
        >
          Self-Assessments
          <svg
            className="w-3 h-3 mt-0.5 transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </NavLink>

        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-lg w-52 z-10 absolute left-0 top-full mt-0"
        >
          <li className="my-0.5">
            <NavLink
              to="/assessments/anxiety-test"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass} p-2 block`
              }
            >
              Anxiety Test
            </NavLink>
          </li>
          <li className="my-1">
            <NavLink
              to="/assessments/depression-test"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass} p-2 block`
              }
            >
              Depression Test
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/assessments/addiction-test"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass} p-2 block`
              }
            >
              Addiction Test
            </NavLink>
          </li>
          <li className="my-1">
            <NavLink
              to="/assessments/bipolar-test"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass} p-2 block`
              }
            >
              Bipolar Test
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/assessments"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass} p-2 block`
              }
            >
              View All Tests
            </NavLink>
          </li>
        </ul>
      </li>

      {/* RESOURCES */}
      <li className="relative dropdown dropdown-hover mx-1 group">
        <NavLink
          to="/resources"
          className={`${baseClass} ${hoverClass} inline-flex gap-1 items-center ${isResourcesActive ? activeClass : ""
            }`}
        >
          Resources
          <svg
            className="w-3 h-3 mt-0.5 transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </NavLink>

        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-lg w-52 z-10 absolute left-0 top-full mt-0"
        >
          <li className="my-1">
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass} p-2 block`
              }
            >
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/education-awareness"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass} p-2 block`
              }
            >
              Education & Awareness
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faqs"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass} p-2 block`
              }
            >
              FAQs
            </NavLink>
          </li>
        </ul>
      </li>

      {/* ABOUT */}
      <li className="relative dropdown dropdown-hover mx-1 group">
        <div
          tabIndex={0}
          role="button"
          className={`${baseClass} ${hoverClass} inline-flex gap-1 items-center ${isAboutActive ? activeClass : ""
            }`}
        >
          About
          <svg
            className="w-3 h-3 mt-0.5 transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-lg w-52 z-10 absolute left-0 top-full mt-0"
        >
          <li>
            <NavLink
              to="/team-members"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass} p-2 block`
              }
            >
              Team Members
            </NavLink>
          </li>
          <li className="my-1">
            <NavLink
              to="/about-project"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass} p-2 block`
              }
            >
              About the Project
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mission-vision"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass} p-2 block`
              }
            >
              Mission & Vision
            </NavLink>
          </li>
        </ul>
      </li>

      {/* CONTACT */}
      <li className="relative dropdown dropdown-hover mx-1 group">
        <div
          tabIndex={0}
          role="button"
          className={`${baseClass} ${hoverClass} inline-flex gap-1 items-center ${isContactActive ? activeClass : ""
            }`}
        >
          Contact
          <svg
            className="w-3 h-3 mt-0.5 transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-lg w-52 z-10 absolute left-0 top-full mt-0"
        >

          <li className="my-1">
            <NavLink
              to="/contact-support"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass} p-2 block`
              }
            >
              Contact Support
            </NavLink>
          </li>

          {/* <li>
            <NavLink
              to="/help-center"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass} p-2 block`
              }
            >
              Help Center
            </NavLink>
          </li> */}

          <li>
            <NavLink
              to="/accessibility-support"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass} p-2 block`
              }
            >
              Accessibility Support
            </NavLink>
          </li>
        </ul>
      </li>

      {/* AVATAR */}
      {/* ✅ AUTHENTICATION SECTION WITH LOADING HANDLER */}
      {/* ✅ AUTHENTICATION SECTION - FIXED LOGIC */}

    </>
  );
  const navEndMenu = (<>
    {loading && user ? (
      <li className="pl-10 flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
      </li>
    ) : user ? (
      <li className="relative dropdown dropdown-end mx-1 group pl-10">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 h-10 rounded-full">
            {stablePhotoURL ? (
              <img
                className="rounded-full w-full h-full object-cover"
                src={stablePhotoURL}
                alt="User"
              />
            ) : (
              <FaUser className="text-4xl text-gray-400" />
            )}
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 absolute right-0 top-full mt-3 w-52 p-2 shadow"
        >
          <li><Link to="/profile" className={`${baseClass} ${hoverClass} p-2 block`}>Profile</Link></li>
          <li><Link to="/assessment-history" className={`${baseClass} ${hoverClass} p-2 block mt-1`}>Assessment History</Link></li>
          <li>
            <Link
              to="/help-center"
              className={`${baseClass} ${hoverClass} p-2 block mt-1`}
            >
              Help Center
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className={`${baseClass} ${hoverClass} p-2 block text-left w-full`}
            >
              Logout
            </button>
          </li>
        </ul>
      </li>
    ) : (
      /* This will now show immediately when user is null */
      <div className="ml-4 flex items-center">
        <button
          onClick={() => navigate('/login')}
          className="btn btn-sm rounded-lg text-white bg-[#1BA9B5] hover:bg-gray-500 hover:text-white"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="btn btn-sm rounded-lg text-white ml-2 bg-[#1BA9B5] hover:bg-gray-500 hover:text-white"
        >
          Register
        </button>
      </div>
    )}
  </>)

  return (
    <div className="navbar bg-base-100 shadow-sm justify-between">

      {/* MOBILE */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={() => toggleDropdown("mobile")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow`}
          >
            {navLinks}
          </ul>

        </div>

        {/* LOGO */}
        <a
          href="/"
          className="flex items-center gap-2 font-bold text-2xl lg:px-2 pr-2 cursor-pointer rounded-lg bg-white text-[#0A77FF]"
        >
          <span>
            <img
              src="https://i.ibb.co.com/gbX301qT/Mood-Index-logo3.png"
              alt=""
              className="flex lg:h-20 lg:w-16"
            />
          </span>
          <span className="health-blue">Mood</span>
          <span className="sort-green -mx-2 text-[#1BA9B5]">Index</span>
        </a>
        <div className="lg:hidden">
          {navEndMenu}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        <div>
          {navEndMenu}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
