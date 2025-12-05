import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResourcesPage = () => {
  const navigate = useNavigate();

  const resources = [
    {
      id: 1,
      title: "Blogs",
      description: "Read expert-written and evidence-based mental health insights tailored to everyday life.",
      icon: "📝",
      path: "/blogs"
    },
    {
      id: 2,
      title: "Education & Awareness",
      description: "Explore structured learning materials, guides, and awareness content to understand mental well-being better.",
      icon: "📚",
      path: "/education-awareness"
    },
    {
      id: 3,
      title: "FAQs",
      description: "Quick answers to the most common mental health questions and platform usage guidance.",
      icon: "❓",
      path: "/faqs"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* --- Header Section --- */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            📘 Explore Mental Health Resources
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-xl text-gray-500 sm:mt-4">
            Evidence-based articles, guides, and answers — all in one place.
          </p>
        </div>

        {/* --- Intro Section --- */}
        <div className="mt-12 bg-indigo-50 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-[#1BA9B5] mb-4">
            Your Trusted Learning Companion
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our resource library is designed to support your mental health journey through structured content, 
            easy navigation, and actionable information. Each section provides trusted knowledge to help you 
            make informed decisions about your well-being.
          </p>
        </div>

        {/* --- Resource Cards Section --- */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Available Resources
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {resources.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(item.path)}
                className="cursor-pointer flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <button className="mt-4 px-4 cursor-pointer hover:bg-gray-500 py-2 bg-[#1BA9B5] text-white text-sm rounded-lg transition">
                  Explore →
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResourcesPage;
