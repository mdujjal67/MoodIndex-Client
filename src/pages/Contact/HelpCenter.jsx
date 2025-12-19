import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const HelpCenter = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "MoodIndex | Help-Center";
    }, []);

    const handleUnderDevelopment = (e) => {
        e.preventDefault();
        navigate('/under-development');
    };

    const helpItems = [
        { name: "Billing", path: "/billing", dev: true },
        { name: "Support", path: "/faqs", dev: false },
        { name: "Account", path: "/profile", dev: false },
        { name: "Features", path: "/features", dev: false },
        { name: "Contact us", path: "/contact-us", dev: false },
        { name: "My orders", path: "/my-orders", dev: true },
        { name: "Enterprise", path: "/enterprise", dev: true },
        { name: "Privacy", path: "/privacy", dev: false },
        { name: "Developers", path: "/developers", dev: false },
    ];

    const filteredItems = helpItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white">
            <section className="py-12">
                <div className="container flex flex-col items-center p-4 mx-auto md:p-8">
                    <h1 className="text-3xl font-serif font-bold leading-none text-center sm:text-4xl text-[#00396a]">
                        Help Center
                    </h1>

                    {/* SEARCH INPUT */}
                    <div className="relative mt-8 mb-12">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Type to search..."
                            className="w-full py-3 pl-12 pr-4 text-sm rounded-full border border-gray-200 sm:w-96 focus:outline-none focus:ring-1 focus:ring-[#1BA9B5] bg-gray-50 transition-all"
                        />
                    </div>

                    {/* CLEAN DYNAMIC GRID */}
                    <div className="w-full max-w-5xl mx-auto">
                        {filteredItems.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 -space-x-px -space-y-px">
                                {filteredItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.path}
                                        onClick={item.dev ? handleUnderDevelopment : null}
                                        className="group relative flex items-center justify-center p-8 sm:py-14 border border-gray-200 bg-white overflow-hidden"
                                    >
                                        {/* The Animated Background Layer */}
                                        <div className="absolute inset-0 bg-[#1BA9B5] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>

                                        {/* The Content with Zoom Effect */}
                                        <span className="relative z-10 text-gray-700 font-medium text-lg text-center transform transition-all duration-300 group-hover:scale-110 group-hover:text-[#1BA9B5]">
                                            {item.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-400">No results found for "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HelpCenter;