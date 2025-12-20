import React, { useEffect } from "react";


const MissionVisionPage = () => {

    // dynamic title
    useEffect((() => {
        document.title = "MoodIndex | Mission & Vision"
    }), []);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* --- Header Section --- */}
                <div className="text-center">
                    <h1 className="text-4xl font-serif font-bold tracking-tight text-indigo-900 sm:text-5xl">
                        Our Mission & Vision
                    </h1>
                    <p className="mt-3 max-w-2xl mx-auto text-gray-600 sm:mt-4">
                        Guiding principles and the future we are committed to building.
                    </p>
                </div>

                <div className="mt-12 space-y-16">

                    {/* --- Mission Section --- */}
                    <section>
                        <h2 className="text-3xl font-serif font-bold text-center text-[#1BA9B5] mb-6">
                            <span role="img" aria-label="Target">🎯</span> Our Mission
                        </h2>
                        <div className="bg-white shadow-xl rounded-lg overflow-hidden p-8 border-t-4 border-[#1BA9B5]">
                            <p className=" text-gray-700 mb-6 leading-relaxed">
                                Our mission is to **democratize mental health support** by providing a comprehensive, secure, and empowering digital environment. We strive to be the accessible first step on every individual's journey toward mental well-being.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                <MissionCard
                                    title="To Empower"
                                    description="Give individuals the tools and knowledge needed to proactively manage their emotional and psychological health."
                                    icon="💪"
                                />
                                <MissionCard
                                    title="To Connect"
                                    description="Bridge the gap between individuals seeking help and the resources they need, fostering a supportive community."
                                    icon="🤝"
                                />
                                <MissionCard
                                    title="To Innovate"
                                    description="Constantly research and integrate ethical, effective, and evidence-based digital solutions into our platform."
                                    icon="✨"
                                />
                            </div>
                        </div>
                    </section>

                    {/* --- Vision Section --- */}
                    <section>
                        <h2 className="text-3xl font-bold text-center text-[#1BA9B5] mb-6">
                            <span role="img" aria-label="Telescope">🔭</span> Our Vision
                        </h2>
                        <div className="bg-white shadow-xl rounded-lg overflow-hidden p-8 border-t-4 border-[#1BA9B5]">
                            <p className=" text-gray-700 leading-relaxed">
                                We envision a world where high-quality mental health support is **universally accessible and utilized without stigma.** Our platform will grow to be recognized as a leading, trusted, global resource that seamlessly integrates into the daily lives of its users. We aim to fundamentally change the perception of mental healthcare from a crisis intervention model to a proactive, integrated component of overall wellness.
                            </p>
                        </div>
                    </section>

                    {/* --- Core Values Section --- */}
                    <section>
                        <h2 className="text-3xl font-bold text-center text-[#1BA9B5] mb-6">
                            <span role="img" aria-label="Diamond">💎</span> Core Values
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 shadow-xl rounded-lg overflow-hidden">
                                <thead className="bg-indigo-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                            Value
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                            Definition
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <ValueRow value="Empathy" definition="Putting the user's emotional experience first in all design and content choices." />
                                    <ValueRow value="Integrity" definition="Upholding strict ethical and professional standards in all data handling and content curation." />
                                    <ValueRow value="Accessibility" definition="Committing to a user interface and service model that is easy to navigate for all users." />
                                    <ValueRow value="Progress" definition="Encouraging and facilitating continuous personal growth and recovery for every user." />
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

// --- Helper Components ---

// Card for Mission Objectives (UPDATED with hover effect)
const MissionCard = ({ title, description, icon }) => (
    <div className="p-6 bg-indigo-50 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </div>
);

// Row for Core Values Table
const ValueRow = ({ value, definition }) => (
    <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {value}
        </td>
        <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">
            {definition}
        </td>
    </tr>
);

export default MissionVisionPage;