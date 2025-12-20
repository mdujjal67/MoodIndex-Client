import React from 'react';

const AccessibilityPage = () => {
    return (
        <div className="max-w-3xl mx-auto px-6 py-20 text-gray-800">
      <h1 className="text-4xl font-bold text-indigo-900 mb-6">Accessibility Statement</h1>
      <p className="text-lg mb-8 text-gray-600">
        MoodIndex is committed to ensuring digital accessibility for everyone, including those experiencing cognitive, visual, or motor challenges.
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Our Standards</h2>
          <p>We aim to comply with **WCAG 2.1 Level AA** standards across our entire platform.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Key Features</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>High-contrast text for better readability.</li>
            <li>Full keyboard navigation support (Tab & Enter).</li>
            <li>No timed sessions for mental health assessments.</li>
            <li>Clear emergency contact access (999).</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl mt-10">
          <h2 className="text-xl font-bold mb-2 text-[#0A77FF]">Feedback</h2>
          <p className="text-sm">
            We welcome your feedback. If you encounter any barriers, please contact our support team to discuss treatment options or site improvements.
          </p>
        </div>
      </section>
    </div>
    );
};

export default AccessibilityPage;