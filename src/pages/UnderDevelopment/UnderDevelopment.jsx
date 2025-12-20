import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UnderDevelopment = () => {
    const PRIMARY_COLOR = 'text-[#1BA9B5]'; 
    const BG_COLOR = 'bg-[#1BA9B5]';
    const navigate = useNavigate();

    // dynamic title
    useEffect((() => {
        document.title = "MoodIndex | Under-development"
    }), []);

    return (
        // 💡 Correction 1: Use min-h-screen to ensure the container spans the full viewport height
        // 💡 Correction 2: Use flex, items-center (vertical), and justify-center (horizontal)
        <div className="min-h-screen flex items-center justify-center py-12">
            <section className="dark:bg-gray-50 dark:text-gray-800 w-full">
                
                {/* Ensure the inner container uses a maximum width and centers itself */}
                <div className="container mx-auto max-w-7xl flex flex-col-reverse justify-center p-6 lg:flex-row lg:justify-between items-center gap-10">
                    
                    {/* ➡️ Left Content Section */}
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-xl lg:text-left">
                        
                        <h1 className="text-4xl font-extrabold leading-none sm:text-6xl text-indigo-900">
                            System Upgrade in <span className={PRIMARY_COLOR}>Progress</span> 🛠️
                        </h1>
                        
                        <p className="mt-6 mb-8 sm:mb-12 text-gray-600">
                            We're currently hard at work creating an amazing experience for you! This page is under active construction and will be ready very soon.
                        </p>

                        <div className="space-y-3 text-gray-700 lg:text-left text-center">
                            <p className="flex items-center justify-center lg:justify-start">
                                <span className={`${PRIMARY_COLOR} mr-2`}>✅</span> Exciting new features are coming.
                            </p>
                            <p className="flex items-center justify-center lg:justify-start">
                                <span className={`${PRIMARY_COLOR} mr-2`}>✨</span> Improved design and user experience.
                            </p>
                        </div>

                        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 mt-8 lg:justify-start">
                            {/* Go Back Button */}
                            <button
                                onClick={() => navigate(-1)}
                                className={`px-5 py-2 font-semibold ${BG_COLOR} hover:border hover:text-[#158e98] text-white hover:bg-white transition duration-300 shadow-lg cursor-pointer rounded-xl`}
                            >
                                Go Back
                            </button>
                            <Link 
                                to="/" 
                                className={`px-5 py-2 font-semibold bg-[#1BA9B5] hover:border hover:text-[#158e98] text-white hover:bg-white transition duration-300 shadow-lg rounded-xl`}
                            >
                                Back to Homepage
                            </Link>
                            <Link 
                                to="/contact-support" 
                                className="px-5 py-2 font-semibold border  hover:bg-gray-900 hover:text-white border-gray-300 text-gray-800  transition duration-300 rounded-xl"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>

                    {/* 🖼️ Right Image/Visual Section */}
                    <div className="flex items-center justify-center p-6 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        
                        <img 
                            src="https://i.ibb.co.com/YT7CwB6J/1-rm-Kht-Su2v-X4gd3jz-QB-iw.gif" 
                            alt="Illustration of a webpage under construction" 
                            className="object-contain h-full w-full max-w-md" 
                        /> 
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UnderDevelopment;