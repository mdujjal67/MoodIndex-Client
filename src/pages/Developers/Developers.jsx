import React, { useEffect } from 'react';
import { FaReact, FaNodeJs, FaServer } from 'react-icons/fa';
import { SiFirebase, SiMongodb, SiTailwindcss, SiExpress, SiJsonwebtokens } from 'react-icons/si';

const Developers = () => {

    useEffect((() => {
        document.title = "MoodIndex | Developers"
    }), []);

    const techStack = [
        { name: "React", icon: <FaReact />, color: "text-blue-400" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-teal-400" },
        { name: "Firebase", icon: <SiFirebase />, color: "text-yellow-500" },
        { name: "Express.js", icon: <SiExpress />, color: "text-gray-600" },
        { name: "Node.js", icon: <FaNodeJs />, color: "text-green-500" },
        { name: "MongoDB", icon: <SiMongodb />, color: "text-green-600" }
    ];

    const dependencies = [
        "CORS (Cross-Origin Resource Sharing)",
        "Dotenv (Environment Variable Management)",
        "Nodemon (Development Workflow)",
        "React Hot Toast (Notifications)",
        "SweetAlert2 (Interactive Modals)",
        "React Router DOM (Client-side Routing)"
    ];

    return (
        <div className="max-w-5xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-bold text-center text-[#1BA9B5] mb-4">Technical Overview</h1>
            <p className="text-center text-gray-600 mb-12">Mood Index is a full-stack MERN application integrated with Firebase Auth.</p>
            
            {/* Main Stack */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
                {techStack.map((tech, i) => (
                    <div key={i} className="flex flex-col items-center p-6 border rounded-xl bg-white shadow-sm hover:border-[#1BA9B5] transition-colors">
                        <div className={`text-5xl mb-3 ${tech.color}`}>{tech.icon}</div>
                        <span className="font-semibold text-gray-700">{tech.name}</span>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Backend Logic Section */}
                <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <FaServer className="text-[#1BA9B5]" /> Backend Architecture
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        The backend is built with **Express.js** running on **Node.js**. It handles CRUD operations for user profiles and assessment history stored in **MongoDB**. 
                    </p>
                    <ul className="text-sm text-gray-400 space-y-1 italic">
                        <li>• RESTful API Design</li>
                        <li>• Secure Environment Variables via Dotenv</li>
                        <li>• JSON Data Parsing</li>
                    </ul>
                </div>

                {/* Middleware & Tools */}
                <div className="bg-white border p-8 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Dependencies & Tools</h3>
                    <div className="grid grid-cols-1 gap-2">
                        {dependencies.map((dep, i) => (
                            <div key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                                <span className="w-1.5 h-1.5 bg-[#1BA9B5] rounded-full"></span>
                                {dep}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Academic Context */}
            <div className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-xl">
                <p className="text-blue-800 text-sm text-center italic">
                    Note: This architecture was designed to demonstrate proficiency in handling asynchronous data flow between multiple cloud services (Firebase/ImgBB) and a private database (MongoDB).
                </p>
            </div>
        </div>
    );
};

export default Developers;