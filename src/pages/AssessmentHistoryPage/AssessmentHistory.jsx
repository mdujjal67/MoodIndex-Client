import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext'; 

const AssessmentHistory = ({ userScores = {} }) => {
    const allTestsData = useLoaderData();
    const { user } = useContext(AuthContext); 
    const navigate = useNavigate();

    // dynamic title
    useEffect((() => {
        document.title = "MoodIndex | Assessment-history"
    }), []);
    
    const [userHistory, setUserHistory] = useState([]); 
    const [selectedTest, setSelectedTest] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:9000/results/${user.email}`)
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch results');
                    return res.json();
                })
                .then(data => {
                    const latestScoresMap = data.reduce((map, result) => {
                        if (!map[result.testSlug] || new Date(result.timestamp) > new Date(map[result.testSlug].timestamp)) {
                            map[result.testSlug] = result;
                        }
                        return map;
                    }, {});
                    
                    setUserHistory(Object.values(latestScoresMap));
                    setIsLoading(false); 
                })
                .catch(error => {
                    console.error("Error fetching history:", error);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false); 
        }
    }, [user]); 

    const getLatestResult = (slug) => {
        return userHistory.find(r => r.testSlug === slug);
    };
    
    // Helper to find the status object (including color)
    const getTestStatus = (test, score) => {
        return test.thresholds.find(t => score <= t.max) || test.thresholds[0];
    };

    // Correctly initialized after the helper functions to avoid ReferenceError
    const hasAnyResults = allTestsData.some(test => getLatestResult(test.slug));

    if(isLoading){
        return <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col gap-4 w-52 text-red-500">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div> 
        </div>
      </div>  
    }


    return (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 p-4 font-sans">
            
            {/* LEFT SIDE: THE TEST LIST */}
            <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6">Assessment History</h2>
                <div className="space-y-4">
                    {hasAnyResults ? (
                        allTestsData.map((test) => {
                            const latestResult = getLatestResult(test.slug);
                            
                            // Only show tests the user has actually taken
                            if (!latestResult) return null; 
                            
                            const score = latestResult.score; // Use the score from the DB
                            const percentage = (score / test.maxScore) * 100;
                            const status = getTestStatus(test, score); // Re-using this helper
                            const isSelected = selectedTest?.slug === test.slug;

                            return (
                                <motion.div
                                    key={test.id}
                                    onClick={() => setSelectedTest({ ...test, latestResult })}
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

                                    {/* Mini progress bar in the list */}
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
                        })
                    ) : (
                        <div className="text-center py-12 px-6 bg-indigo-50/30 rounded-2xl border-2 border-dashed border-indigo-100">
                            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="text-5xl mb-4">📋</motion.div>
                            <h3 className="text-lg font-bold text-indigo-900 mb-2">No Assessments Yet</h3>
                            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                Take an assessment to unlock detailed insights into your well-being and track your progress.
                            </p>
                            <button 
                                onClick={() => navigate('/assessments')} 
                                className=" px-6 py-2.5 rounded-xl font-semibold cursor-pointer text-white bg-[#1BA9B5] hover:bg-gray-500 hover:text-white transition-all shadow-lg shadow-indigo-200"
                            >
                                Start First Test
                            </button>
                        </div>
                    )}
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
                            {/* --- New logic for detail status --- */}
                            {(() => {
                                const detailScore = selectedTest.latestResult.score;
                                const detailStatus = getTestStatus(selectedTest, detailScore);
                                const gaugeColor = detailStatus.color;
                                
                                return (
                                    <>
                                        <div className="text-center mb-6">
                                            <span className="text-5xl">{selectedTest.icon}</span>
                                            <h3 className="text-2xl font-black text-indigo-900 mt-4 uppercase tracking-tight">
                                                {selectedTest.title}
                                            </h3>
                                        </div>

                                        {/* SVG GAUGE CHART - DYNAMIC COLOR APPLIED HERE */}
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
                                                    animate={{ strokeDashoffset: 502.4 - (502.4 * (detailScore || 0)) / selectedTest.maxScore }}
                                                    transition={{ duration: 1.5, ease: "circOut" }}
                                                    // Dynamic color is applied via inline style
                                                    style={{ color: gaugeColor, strokeLinecap: "round" }}
                                                />
                                            </svg>
                                            <div className="absolute text-center">
                                                <span className="text-5xl font-black text-indigo-900">{detailScore || 0}</span>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Score</p>
                                            </div>
                                        </div>

                                        {/* SEVERITY INDICATORS */}
                                        <div className="space-y-2">
                                            {selectedTest.thresholds.map((t) => {
                                                const isActive = selectedTest.latestResult.level === t.level;
                                                
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
                                                            {isActive && <p className="text-[11px] text-gray-500 mt-1 italic leading-relaxed">"{selectedTest.latestResult.advice}"</p>}
                                                        </div>
                                                        <span className="text-[10px] font-bold bg-gray-50 px-2 py-1 rounded text-gray-400">MAX {t.max}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                );
                            })()}
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