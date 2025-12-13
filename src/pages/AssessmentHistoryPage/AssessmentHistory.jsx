import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoaderData } from 'react-router-dom';

const AssessmentHistory = ({ userScores = {} }) => {
  const allTestsData = useLoaderData();
  const [selectedTest, setSelectedTest] = useState(null);

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 p-4 font-sans">
      
      {/* LEFT SIDE: THE TEST LIST */}
      <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-indigo-900 mb-6">Assessment History</h2>
        <div className="space-y-4">
          {allTestsData.map((test) => {
            const score = userScores[test.slug] || 0;
            // ✅ Percentage is now used for the mini-bar below
            const percentage = (score / test.maxScore) * 100;
            const status = test.thresholds.find(t => score <= t.max) || test.thresholds[0];
            const isSelected = selectedTest?.slug === test.slug;

            return (
              <motion.div
                key={test.id}
                onClick={() => setSelectedTest(test)}
                whileHover={{ x: 5 }}
                className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                  isSelected ? 'border-indigo-600 bg-indigo-50/50' : 'border-transparent bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{test.icon}</span>
                    <span className="font-bold text-indigo-900 text-sm">{test.title}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: status.color }}>
                    {score} / {test.maxScore}
                  </span>
                </div>

                {/* ✅ USE OF PERCENTAGE: Mini progress bar in the list */}
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className="h-full"
                    style={{ backgroundColor: status.color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* RIGHT SIDE: THE DYNAMIC GRAPH DETAIL */}
      <div className="w-full lg:w-1/2">
        <AnimatePresence mode="wait">
          {selectedTest ? (
            <motion.div
              key={selectedTest.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl border border-indigo-50 p-8 sticky top-8"
            >
              <div className="text-center mb-6">
                <span className="text-5xl">{selectedTest.icon}</span>
                <h3 className="text-2xl font-black text-indigo-900 mt-4 uppercase tracking-tight">
                  {selectedTest.title}
                </h3>
              </div>

              {/* SVG GAUGE CHART */}
              <div className="relative flex justify-center items-center my-10">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96" cy="96" r="80"
                    stroke="#f3f4f6" strokeWidth="12"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="96" cy="96" r="80"
                    stroke="currentColor" strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={502.4}
                    initial={{ strokeDashoffset: 502.4 }}
                    animate={{ strokeDashoffset: 502.4 - (502.4 * (userScores[selectedTest.slug] || 0)) / selectedTest.maxScore }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="text-indigo-600"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-5xl font-black text-indigo-900">{userScores[selectedTest.slug] || 0}</span>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Score</p>
                </div>
              </div>

              {/* SEVERITY INDICATORS */}
              <div className="space-y-2">
                {selectedTest.thresholds.map((t, idx) => {
                  const score = userScores[selectedTest.slug] || 0;
                  const isActive = (idx === 0 && score <= t.max) || 
                                   (score <= t.max && score > selectedTest.thresholds[idx-1]?.max);
                  
                  return (
                    <div 
                      key={t.level}
                      className={`p-4 rounded-xl border flex justify-between items-center transition-all ${
                        isActive ? 'bg-white shadow-lg translate-x-2' : 'opacity-30 grayscale'
                      }`}
                      style={{ borderColor: isActive ? t.color : 'transparent' }}
                    >
                      <div>
                        <span className="block font-bold text-sm" style={{ color: t.color }}>{t.level}</span>
                        {isActive && <p className="text-[11px] text-gray-500 mt-1 italic leading-relaxed">"{t.advice}"</p>}
                      </div>
                      <span className="text-[10px] font-bold bg-gray-50 px-2 py-1 rounded text-gray-400">MAX {t.max}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <div className="h-full min-h-[400px] flex items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
              <div>
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-5xl mb-4">📈</motion.div>
                <h3 className="text-lg font-bold text-indigo-900/40">Select a test result to see detailed analytics</h3>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AssessmentHistory;