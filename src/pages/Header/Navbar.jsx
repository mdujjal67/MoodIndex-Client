import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {

    const navLinks = (
        <>
            {/* Home (NO DROPDOWN) */}
            <Link to='/'><li className='mx-1'>
                <a className='font-[Open_Sans] inline-block hover:bg-[#1BA9B5] hover:text-white hover:font-semibold p-2 rounded-lg transition-colors duration-300 cursor-pointer'>
                    Home
                </a>
            </li></Link>

            {/* Self-Assessments DROPDOWN */}
            <li className="relative dropdown dropdown-hover mx-1 group">
                <div tabIndex={0} role="button"
                    className="font-[Open_Sans] inline-flex items-center gap-1 p-2 rounded-lg 
               hover:bg-[#1BA9B5] hover:text-white hover:font-semibold 
               transition-colors duration-300 cursor-pointer">
                    Self-Assessments
                    <svg className="w-3 h-3 mt-0.5 transition-transform duration-300 
                    group-hover:rotate-180"
                        fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                <ul tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-lg w-52 z-10 absolute left-0 top-full mt-0">
                    <li className='hover:bg-[#1BA9B5] hover:text-white hover:font-semibold rounded-lg'><a>Anxiety Test</a></li>
                    <li className='hover:bg-[#1BA9B5] hover:text-white hover:font-semibold rounded-lg'><a>Depression Test</a></li>
                    <li className='hover:bg-[#1BA9B5] hover:text-white hover:font-semibold rounded-lg'><a>Addiction Test</a></li>
                    <li className='hover:bg-[#1BA9B5] hover:text-white hover:font-semibold rounded-lg'><a>Bipolar Test</a></li>
                    <li className='hover:bg-[#1BA9B5] hover:text-white hover:font-semibold rounded-lg'><a>View All Tests</a></li>
                </ul>
            </li>


            {/* Resources DROPDOWN */}
            <li className="relative dropdown dropdown-hover mx-1 group">
                <div
                    tabIndex={0}
                    role="button"
                    className="font-[Open_Sans] inline-flex items-center gap-1 p-2 rounded-lg 
               hover:bg-[#1BA9B5] hover:text-white hover:font-semibold 
               transition-colors duration-300 cursor-pointer"
                >
                    Resources
                    {/* Arrow Icon */}
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
                    <Link to='/blogs'>
                        <li className="hover:bg-[#1BA9B5] hover:text-white hover:font-semibold rounded-lg">
                            <a>Blogs</a>
                        </li>
                    </Link>
                    <li className="hover:bg-[#1BA9B5] hover:text-white hover:font-semibold rounded-lg">
                        <a>Education & Awareness</a>
                    </li>
                    <Link to='/faqs'><li className="hover:bg-[#1BA9B5] hover:text-white hover:font-semibold rounded-lg">
                        <a>FAQs</a>
                    </li></Link>
                </ul>
            </li>


            {/* About DROPDOWN */}
            <li className="relative dropdown dropdown-hover mx-1 group">
                <div
                    tabIndex={0}
                    role="button"
                    className="font-[Open_Sans] inline-flex items-center gap-1 p-2 rounded-lg 
               hover:bg-[#1BA9B5] hover:text-white hover:font-semibold 
               transition-colors duration-300 cursor-pointer"
                >
                    About
                    {/* Arrow Icon */}
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
                    <Link to='/team-members'>
                        <li className="hover:bg-[#1BA9B5] hover:text-white hover:font-semibold rounded-lg">
                            <a>Team Members</a>
                        </li>
                    </Link>
                    <li className="hover:bg-[#1BA9B5] hover:text-white hover:font-semibold rounded-lg">
                        <a>About the Project</a>
                    </li>
                    <li className="hover:bg-[#1BA9B5] hover:text-white hover:font-semibold rounded-lg">
                        <a>Mission & Vision</a>
                    </li>
                </ul>
            </li>



            {/* Contact DROPDOWN */}
            <li className="relative dropdown dropdown-hover mx-1 group">
                <div
                    tabIndex={0}
                    role="button"
                    className="font-[Open_Sans] inline-flex items-center gap-1 p-2 rounded-lg 
               hover:bg-[#1BA9B5] hover:text-white hover:font-semibold 
               transition-colors duration-300 cursor-pointer"
                >
                    Contact
                    {/* Arrow Icon */}
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
                    <Link to='/help-center'>
                        <li className="hover:bg-[#1BA9B5] hover:text-white hover:font-semibold rounded-lg">
                            <a>Help Center</a>
                        </li>
                    </Link>
                    <Link to='/contact-support'>
                        <li className="hover:bg-[#1BA9B5] hover:text-white hover:font-semibold rounded-lg">
                            <a>Contact Support</a>
                        </li>
                    </Link>
                    <Link to='accessibility-support'>
                        <li className="hover:bg-[#1BA9B5] hover:text-white hover:font-semibold rounded-lg">
                            <a>Accessibility Support</a>
                        </li>
                    </Link>
                </ul>
            </li>

        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm justify-between">

            {/* LEFT — MOBILE MENU */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>

                    {/* MOBILE DROPDOWN MENU */}
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>

                {/* LOGO */}
                <a href="/" className="flex items-center gap-2 font-bold text-2xl px-2 cursor-pointer rounded-lg bg-white text-[#0A77FF]">
                    <span><img src="https://i.ibb.co.com/gbX301qT/Mood-Index-logo3.png" alt="" className='flex min-h-14 min-w-14' /></span>
                    <span className="health-blue">Mood</span>
                    <span className="sort-green -mx-2">Index</span>
                </a>
            </div>

            {/* CENTER — DESKTOP MENU */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>

            {/* RIGHT — AVATAR MENU */}
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt="User"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                    <li><a className="justify-between">Profile <span className="badge">New</span></a></li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </div>

        </div>
    );
};

export default Navbar;
