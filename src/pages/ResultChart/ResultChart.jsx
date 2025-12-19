import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ResultChart = ({ score, result, maxScore }) => {
    // Logic to calculate needle position based on specific test's max score
    const percentage = Math.min((score / maxScore) * 100, 100);
    const navigate = useNavigate()

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center border-t-8 border-indigo-900"
        >
            <h2 className="text-3xl font-bold mb-2 text-indigo-900">Your Clinical Summary</h2>
            <div className="text-7xl font-black text-indigo-900 my-4">
                {score} <span className="text-xl text-gray-400 font-normal">/ {maxScore}</span>
            </div>

            <h3 className="text-2xl font-bold uppercase tracking-tight mb-8" style={{ color: result.color }}>
                {result.level}
            </h3>

            {/* Visual Severity Scale */}
            <div className="relative mb-12">
                <div className="flex h-4 w-full rounded-full overflow-hidden bg-gray-100 shadow-inner">
                    {/* The bar is now colored by the result found in JSON */}
                    <div className="h-full bg-green-500 w-[25%]"></div>
                    <div className="h-full bg-yellow-400 w-[25%]"></div>
                    <div className="h-full bg-orange-500 w-[25%]"></div>
                    <div className="h-full bg-red-600 w-[25%]"></div>
                </div>

                {/* Pointer / Needle */}
                <div
                    className="absolute top-2 transition-all duration-1000 ease-out"
                    style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
                >
                    <div className="w-1 h-8 bg-indigo-900 mx-auto"></div>
                    <div className="w-3 h-3 bg-indigo-900 rounded-full shadow-md"></div>
                </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg text-left border-l-4 border-indigo-900 mb-8">
                <h4 className="text-indigo-900 font-bold mb-2">Clinical Advice:</h4>
                <p className="text-indigo-900 leading-relaxed italic">"{result.advice}"</p>
            </div>

            <button
                onClick={() => window.location.reload()}
                className="px-10 py-4 cursor-pointer bg-indigo-900 text-white rounded-full font-bold hover:bg-indigo-800 transition-all shadow-lg active:scale-95"
            >
                Retake Assessment
            </button>
            <button
                onClick={() => navigate('/assessment-history')}
                className="px-10 mt-5 lg:mt-0 lg:ml-10 py-4 cursor-pointer bg-indigo-900 text-white rounded-full font-bold hover:bg-indigo-800 transition-all shadow-lg active:scale-95"
            >
                View Assessment History
            </button>
        </motion.div>
    );
};

export default ResultChart;