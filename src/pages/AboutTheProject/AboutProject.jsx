import React from 'react';

const AboutProjectPage = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* --- Header Section --- */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            💡 About Us: The Project
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-xl text-gray-500 sm:mt-4">
            Building a Bridge to Better Mental Health
          </p>
        </div>

        {/* --- Project Overview --- */}
        <div className="mt-12 bg-indigo-50 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-[#1BA9B5] mb-4">
            The Foundation of Our Initiative
          </h2>
          <p className=" text-gray-700 leading-relaxed">
            Our platform is being developed as a vital initiative for a **BSc thesis project**, driven by the goal of making mental health support **accessible, affordable, and immediate** for everyone, regardless of their location or circumstance. We recognize the growing need for flexible mental health resources in the digital age and aim to provide a high-quality, scalable solution.
          </p>
        </div>
        
        {/* --- Core Objectives Section --- */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Core Objectives
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <ObjectiveCard 
              icon="🌍"
              title="1. Accessibility" 
              description="To overcome geographical and financial barriers that often prevent individuals from seeking support."
            />
            <ObjectiveCard 
              icon="✨"
              title="2. Innovation" 
              description="To leverage the latest digital technologies to offer high-quality, scalable mental health solutions."
            />
            <ObjectiveCard 
              icon="📚"
              title="3. Education & Empowerment" 
              description="To provide reliable, evidence-based content that de-stigmatizes and empowers users."
            />
            <ObjectiveCard 
              icon="🔒"
              title="4. Privacy & Security" 
              description="To ensure a safe harbor for all users. Data security and confidentiality are paramount."
            />
          </div>
        </div>

        {/* --- Features and Scope --- */}
        <div className="mt-16 bg-gray-50 p-8 rounded-xl shadow-inner">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Platform Features (Current & Future Scope)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FeatureItem title="Interactive Tools" description="Guided journaling, mood tracking, and stress-reduction exercises." />
            <FeatureItem title="Resource Library" description="Curated articles, videos, and self-help guides created or reviewed by professionals." />
            <FeatureItem title="Community Support" description="Future Scope: Moderated forums or group sessions to foster a sense of connection." />
          </div>

          <blockquote className="mt-8 pt-4 border-t border-gray-300 text-center text-gray-600 italic">
             "As a thesis project, this platform serves as both a proof-of-concept and a foundation for future expansion. We are dedicated to continuous refinement based on user experience and psychological research."
          </blockquote>
        </div>

      </div>
    </div>
  );
};

// --- Helper Components ---

// Card for Core Objectives
const ObjectiveCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// Item for Features List
const FeatureItem = ({ title, description }) => (
  <div className="flex space-x-3 items-start">
    <svg className="flex-shrink-0 h-6 w-6 text-indigo-500 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    <div>
      <h4 className="text-lg font-medium text-gray-900">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

export default AboutProjectPage;