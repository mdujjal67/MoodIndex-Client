import React from 'react';
import { FaClipboardCheck, FaChartLine, FaHistory } from 'react-icons/fa';

const Features = () => {
    const featureList = [
        { icon: <FaClipboardCheck />, title: "Self-Assessments", desc: "Clinically validated tests for Anxiety, Depression, and more." },
        { icon: <FaChartLine />, title: "Progress Tracking", desc: "Visualize your mental health journey with dynamic data charts." },
        { icon: <FaHistory />, title: "History Logs", desc: "Review past results to see how your mood changes over time." }
    ];

    return (
        <div className="max-w-6xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-bold text-center text-[#1BA9B5] mb-12">Key Features</h1>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                {featureList.map((f, i) => (
                    <div key={i} className="p-8 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all">
                        <div className="text-4xl text-[#1BA9B5] flex justify-center mb-4">{f.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                        <p className="text-gray-600">{f.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Features;