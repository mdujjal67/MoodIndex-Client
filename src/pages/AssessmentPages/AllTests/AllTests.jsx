// src/components/MentalHealthTests.jsx
import React, { useState } from 'react';

// --- Data Definition (Based on your image/description) ---
const mentalHealthTestsData = [
  { id: 1, title: "DEPRESSION TEST", description: "For people who may be experiencing symptoms of depression, including persistent sadness, loss of interest, and fatigue.", link: "/test/depression" },
  { id: 2, title: "ADHD TEST", description: "For people of all ages who have trouble focusing, remembering things, completing tasks, and/or sitting still.", link: "/assessments/adhd-test" },
  { id: 3, title: "ANXIETY TEST", description: "For those experiencing excessive worry, nervousness, or panic that interferes with daily life.", link: "/assessments/anxiety-test" },
  { id: 4, title: "OCD TEST", description: "For individuals with recurrent, unwanted thoughts (obsessions) and/or repetitive behaviors (compulsions).", link: "/assessments/ocd-test" },
  { id: 5, title: "BIPOLAR TEST", description: "For people experiencing significant mood swings, including periods of elevated mood (mania) and periods of depression.", link: "/test/bipolar" },
  { id: 6, title: "PSYCHOSIS & SCHIZOPHRENIA TEST", description: "For individuals experiencing distortions of reality, such as hallucinations or delusions.", link: "/test/psychosis-schizophrenia" },
  { id: 7, title: "EATING DISORDER TEST", description: "For those with unhealthy relationships with food, body image concerns, and disordered eating patterns.", link: "assessments/eating-disorder-test" },
  { id: 8, title: "PTSD TEST", description: "For individuals who have experienced trauma and are showing symptoms like flashbacks, nightmares, or avoidance.", link: "/test/ptsd" },
  { id: 9, title: "ADDICTION TEST", description: "For people concerned about problematic substance use or compulsive behaviors impacting their life.", link: "/assessments/addiction-test" },
  { id: 10, title: "GAMBLING ADDICTION TEST", description: "For individuals struggling with compulsive gambling behaviors and their impact on personal and financial well-being.", link: "/assessments/gambling-addiction-test" },
  { id: 11, title: "POSTPARTUM DEPRESSION TEST (NEW & EXPECTING PARENTS)", description: "For new or expecting parents experiencing symptoms of depression or anxiety during pregnancy or after childbirth.", link: "/test/postpartum-depression" },
  { id: 12, title: "PARENT TEST: YOUR CHILD'S MENTAL HEALTH", description: "A screening tool for parents to assess potential mental health concerns in their children.", link: "/test/child-mental-health" },
  { id: 13, title: "YOUTH MENTAL HEALTH TEST", description: "For young individuals (ages 12-25) to screen for common mental health concerns and identify areas for support.", link: "/test/youth-mental-health" },
];


const MentalHealthTests = () => {
  // State to track which test card is currently open. 
  // We store the ID of the open test, or null if none are open.
  const [openTestId, setOpenTestId] = useState(null);

  const toggleTest = (id) => {
    setOpenTestId(openTestId === id ? null : id);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Universal Screen Header */}
        <div className="text-center mb-10">
          <div className="inline-block px-8 py-3 bg-[#1BA9B5] text-white rounded-full text-lg font-semibold tracking-wide shadow-xl">
            TRY THE UNIVERSAL MENTAL HEALTH SCREEN
          </div>
        </div>

        {/* Tests Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {mentalHealthTestsData.map(test => {
            const isOpen = test.id === openTestId;
            const isBlue = test.id % 2 === 0; // Simple alternating color based on ID

            // Tailwind classes for consistency and styling
            const baseBg = isBlue ? 'bg-[#20b2aa]' : 'bg-[#1e88e5]'; // Custom colors for alternating look
            const expandedBg = 'bg-[#e0f7fa]';
            const cardClasses = `relative p-4 rounded-xl shadow-md cursor-pointer transition-all duration-300 ease-in-out 
                                 ${isOpen ? expandedBg : baseBg + ' text-white'}`;
            const buttonClasses = "mt-4 inline-block px-4 py-2 bg-[#1BA9B5] text-white rounded-lg hover:bg-[#158e98] transition duration-300 shadow-md";

            return (
              <div
                key={test.id}
                className={cardClasses}
                onClick={() => toggleTest(test.id)}
              >
                {/* Card Header (Always visible) */}
                <div className="flex justify-between items-center font-bold text-lg">
                  <span className={`${isOpen ? 'text-gray-900' : 'text-white'}`}>{test.title}</span>
                  <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'text-gray-700 transform rotate-45' : 'text-white'}`}>
                    {/* Shows + or X (which looks like a minus sign rotated) */}
                    {isOpen ? '✕' : '+'}
                  </span>
                </div>

                {/* Expandable Content (Conditionally rendered) */}
                {isOpen && (
                  <div className="mt-4 text-gray-700 text-sm">
                    <p className="mb-4 text-sm">{test.description}</p>
                    <a 
                        href={test.link} 
                        onClick={(e) => e.stopPropagation()} // Prevents collapsing the card when button is clicked
                        className={buttonClasses}
                    >
                      TAKE TEST
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MentalHealthTests;