// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import ResultChart from '../../ResultChart/ResultChart';

// const questions = [
//   "I feel nervous or on edge.", "I have trouble relaxing.", "I worry about many things.",
//   "I have difficulty concentrating.", "I experience restlessness.", "I feel irritable.",
//   "I experience sudden feelings of panic.", "I have difficulty sleeping because of anxiety.",
//   "I avoid situations due to worry.", "I feel tense in social settings.",
//   "I experience muscle tension.", "I have racing thoughts.",
//   "I feel overwhelmed by responsibilities.", "I experience stomach discomfort from anxiety.",
//   "I feel a sense of impending doom."
// ];

// const options = [
//   { label: 'Never', value: 0 },
//   { label: 'Rarely', value: 1 },
//   { label: 'Sometimes', value: 2 },
//   { label: 'Often', value: 3 },
//   { label: 'Very often', value: 4 },
// ];

// const AnxietyTest = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [scores, setScores] = useState([]);
//   const [isFinished, setIsFinished] = useState(false);

//   const handleAnswer = (value) => {
//     const newScores = [...scores];
//     newScores[currentStep] = value; // Store/Update score at specific index
//     setScores(newScores);

//     if (currentStep < questions.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       setIsFinished(true);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const totalScore = scores.reduce((acc, curr) => acc + (curr || 0), 0);

//   const getResultData = (score) => {
//     if (score <= 14) return { level: "Low Anxiety", advice: "Your results suggest low levels of anxiety. This is within the normal range for most people." };
//     if (score <= 29) return { level: "Mild Anxiety", advice: "You are experiencing mild anxiety. Focus on sleep hygiene and regular physical activity." };
//     if (score <= 44) return { level: "Moderate Anxiety", advice: "Your score indicates moderate anxiety. It is recommended to consult a counselor or GP." };
//     return { level: "High Anxiety", advice: "You are experiencing high levels of anxiety. Please seek professional clinical support as soon as possible." };
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans text-slate-800">
//       <div className="max-w-5xl mx-auto">
//         {!isFinished ? (
//           <>
//             <AnimatePresence mode="wait">
//               <motion.div 
//                 key={currentStep}
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-16 text-center mb-10"
//               >
//                 <h2 className="text-3xl md:text-5xl font-bold text-indigo-900 mb-4">Question {currentStep + 1}</h2>
//                 <div className="w-16 h-1 bg-indigo-900/10 mx-auto mb-10 rounded-full"></div>
                
//                 <p className="text-xl md:text-2xl text-gray-700 mb-12 min-h-20">
//                   {questions[currentStep]}
//                 </p>
                
//                 <div className="flex flex-wrap justify-center gap-4">
//                   {options.map((opt) => (
//                     <button
//                       key={opt.label}
//                       onClick={() => handleAnswer(opt.value)}
//                       className="px- py-4 cursor-pointer bg-gray-50 hover:bg-indigo-900 hover:text-white border border-gray-200 rounded-xl transition-all font-semibold min-w-[140px] shadow-sm active:scale-95"
//                     >
//                       {opt.label}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Back Button */}
//                 {currentStep > 0 && (
//                   <button 
                  
//                     onClick={handlePrevious}
//                     className="mt-10 cursor-pointer text-gray-400 hover:text-indigo-900 transition-colors text-sm font-bold flex items-center justify-center gap-2 mx-auto"
//                   >
//                     ← BACK TO PREVIOUS
//                   </button>
//                 )}
//               </motion.div>
//             </AnimatePresence>

//             {/* Progress Bar */}
//             <div className="max-w-xl mx-auto text-center">
//               <div className="relative w-full h-3 bg-gray-200 rounded-full mb-4">
//                 <motion.div 
//                   className="absolute left-0 top-0 h-full bg-indigo-900 rounded-full"
//                   initial={{ width: 0 }}
//                   animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
//                 >
//                   <div className="absolute right-0 -top-2 w-7 h-7 bg-white border-4 border-indigo-900 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg">
//                     {currentStep + 1}
//                   </div>
//                 </motion.div>
//               </div>
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
//                 Question {currentStep + 1} of {questions.length}
//               </p>
//             </div>
//           </>
//         ) : (
//           <ResultChart score={totalScore} result={getResultData(totalScore)}></ResultChart>
//         )}

//         {/* Support Footer */}
//         <div className="mt-20 grid md:grid-cols-2 gap-12 border-t border-gray-200 pt-12">
//           <div className="bg-white p-6 rounded-xl">
//             <h3 className="text-xl font-bold text-indigo-900 mb-2">Need to talk?</h3>
//             <p className="text-3xl font-black text-red-600 mb-4">0203 936 2549</p>
//             <p className="text-gray-600 text-sm leading-relaxed">
//               Confidential support answered by assistant psychologists to discuss your treatment options.
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-xl">
//             <h3 className="text-xl font-bold text-indigo-900 mb-2">Take another test</h3>
//             <button className="text-lg font-bold text-red-600 underline mb-4 block hover:text-red-700">View all clinical tests</button>
//             <p className="text-gray-600 text-sm leading-relaxed">
//               Online quizzes for ADHD, autism, depression, and PTSD. None take longer than 5 minutes.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnxietyTest;