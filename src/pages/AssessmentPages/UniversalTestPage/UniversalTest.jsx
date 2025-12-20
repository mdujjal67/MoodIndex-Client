import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoaderData, useNavigate } from 'react-router-dom';
import ResultChart from '../../ResultChart/ResultChart';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthContext';

const options = [
    { label: 'Never', value: 0 },
    { label: 'Rarely', value: 1 },
    { label: 'Sometimes', value: 2 },
    { label: 'Often', value: 3 },
    { label: 'Very often', value: 4 },
];

const UniversalTest = () => {
    const testData = useLoaderData();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [currentStep, setCurrentStep] = useState(0);
    const [scores, setScores] = useState([]);
    const [isFinished, setIsFinished] = useState(false);

    // Ensure testData contains title, questions, thresholds, maxScore, and slug
    const { title, questions, thresholds, maxScore, slug } = testData;

    // Dynamic Title
    useEffect(() => {
        if (testData?.title) {
            document.title = `MoodIndex | ${testData.title}`;
        }
    }, [testData]);

    const getResultData = (score) => {
        // Dynamically find the correct threshold from JSON
        return thresholds.find(t => score <= t.max) || thresholds[thresholds.length - 1];
    };

    // --- FUNCTION: Save result to Database ---
    const saveResultToDB = async (score, resultData, testDetails) => {
        if (!user || !user.email) {
            toast.error("You must be logged in to save results.");
            return;
        }

        const resultRecord = {
            userEmail: user.email,
            testTitle: testDetails.title,
            testSlug: testDetails.slug,
            score: score,
            maxScore: testDetails.maxScore,
            level: resultData.level,
            advice: resultData.advice,
            timestamp: new Date(),
        };

        try {
            const response = await fetch('https://mood-index-server.vercel.app/results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resultRecord),
            });

            if (response.ok) {
                // Successful save
            } else {
                toast.error('Failed to save assessment result.');
            }
        } catch (error) {
            console.error('Error saving result:', error);
            toast.error('Network error during save.');
        }
    };
    // ---------------------------------------------

    const handleAnswer = (value) => {
        const newScores = [...scores];
        newScores[currentStep] = value;
        setScores(newScores);

        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsFinished(true);

            // ⭐️ CALL SAVE FUNCTION ON FINISH
            const finalScore = newScores.reduce((acc, curr) => acc + (curr || 0), 0);
            const resultData = getResultData(finalScore);

            saveResultToDB(finalScore, resultData, { title, maxScore, slug });
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const totalScore = scores.reduce((acc, curr) => acc + (curr || 0), 0);


    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans text-slate-800">
            <div className="max-w-5xl mx-auto">
                {!isFinished ? (
                    <>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-16 text-center mb-10"
                            >
                                <h3 className="text-indigo-400 font-bold uppercase tracking-widest text-sm mb-2">{title}</h3>
                                <h2 className="text-3xl md:text-5xl font-bold text-indigo-900 mb-4">Question {currentStep + 1}</h2>
                                <div className="w-16 h-1 bg-indigo-900/10 mx-auto mb-10 rounded-full"></div>

                                <p className="text-xl md:text-2xl text-gray-700 mb-12 min-h-20">
                                    {questions[currentStep]}
                                </p>

                                <div className="flex flex-wrap justify-center gap-4">
                                    {options.map((opt) => (
                                        <button
                                            key={opt.label}
                                            onClick={() => handleAnswer(opt.value)}
                                            className="px-8 py-4 cursor-pointer bg-gray-50 hover:bg-indigo-900 hover:text-white border border-gray-200 rounded-xl transition-all font-semibold min-w-[140px] shadow-sm active:scale-95"
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>

                                {currentStep > 0 && (
                                    <button
                                        onClick={handlePrevious}
                                        className="mt-10 cursor-pointer text-gray-400 hover:text-indigo-900 transition-colors text-sm font-bold flex items-center justify-center gap-2 mx-auto"
                                    >
                                        ← BACK TO PREVIOUS
                                    </button>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress Bar */}
                        <div className="max-w-xl mx-auto text-center">
                            <div className="relative w-full h-3 bg-gray-200 rounded-full mb-4">
                                <motion.div
                                    className="absolute left-0 top-0 h-full bg-indigo-900 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                                />
                            </div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                Question {currentStep + 1} of {questions.length}
                            </p>
                        </div>
                    </>
                ) : (
                    <ResultChart
                        score={totalScore}
                        result={getResultData(totalScore)}
                        maxScore={maxScore}
                    />
                )}

                {/* Footer Part */}
                <div className="mt-20 grid md:grid-cols-2 gap-12 border-t border-gray-200 pt-12">
                    {/* Emergency & Support Section */}
                    <div className="bg-white p-6 rounded-xl border border-red-50 shadow-sm">
                        <h3 className="text-xl font-bold text-indigo-900 mb-2">Immediate Help</h3>
                        <div className="flex items-baseline gap-4 mb-4">
                            <a href="tel:999" className="block text-4xl font-black text-red-600 hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2">
                                999
                            </a>
                            <span className="text-sm font-bold text-red-500 uppercase tracking-wider">Emergency Line</span>
                        </div>
                        <div className="space-y-3">
                            <p className="text-gray-700 font-semibold text-sm">
                                Confidential support answered by assistant psychologists:
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Reach out to discuss your treatment options and screening results in a safe, non-profit environment.
                            </p>
                        </div>
                    </div>

                    {/* Navigation Section */}
                    <div className="bg-white p-6 rounded-xl border border-indigo-50 shadow-sm">
                        <h3 className="text-xl font-bold text-indigo-900 mb-2">Continue Screening</h3>
                        <button
                            onClick={() => navigate('/assessments')}
                            className="text-lg font-bold cursor-pointer hover:text-indigo-700 text-[#1BA9B5] underline mb-4 block transition-colors"
                        >
                            View all clinical tests
                        </button>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Free clinical tools for ADHD, autism, depression, and PTSD. These validated screens help you understand your mental health in under 5 minutes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversalTest;