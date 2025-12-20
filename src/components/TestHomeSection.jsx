import React from 'react';
import { Link } from 'react-router';

const TestHomeSection = () => {
    return (
        <div>
            <section className="p-4 lg:p-8 my-20 py-20 dark:bg-gray-100 dark:text-gray-800">
                <div className="container mx-auto space-y-12">

                    {/* Section Title */}
                    <h2 className="text-4xl text-indigo-900 font-serif font-bold text-center mb-14 mt-4">
                        Quick Self-Check
                    </h2>

                    {/* Card 1 */}
                    <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row hover:shadow-xl transition duration-500 transform hover:-translate-y-2">
                        <img
                            src="https://i.ibb.co.com/QvVPPFPf/134817147-56a7948c3df78cf7729754b7.jpgy"
                            alt="Anxiety Test"
                            className="h-80 dark:bg-gray-500 aspect-video"
                        />
                        <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-50">
                            <span className="text-xs uppercase dark:text-white bg-green-600 p-1 rounded-md max-w-[35px]">Free</span>
                            <h3 className="text-3xl font-bold font-serif">Anxiety Test</h3>
                            <p className="my-4 dark:text-gray-600">
                                Take this short test to assess your anxiety levels and get personalized tips.
                            </p>
                            <Link to='/assessments/anxiety-test'>
                                <button
                                    type="button"
                                    className="btn self-start px-4 py-2 text-white bg-[#1BA9B5] hover:bg-gray-500 hover:text-white rounded-mg transition-colors"
                                >
                                    Take Test
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row-reverse hover:shadow-xl transition duration-500 transform hover:-translate-y-2">
                        <img
                            src="https://i.ibb.co.com/k633n2v6/Who-Is-Most-Prone-To-Depression-1.jpg"
                            alt="Depression Test"
                            className="h-80 dark:bg-gray-500 aspect-video"
                        />
                        <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-50">
                            <span className="text-xs uppercase dark:text-white bg-green-600 p-1 rounded-md max-w-[35px]">Free</span>
                            <h3 className="text-3xl font-bold font-serif">Depression Test</h3>
                            <p className="my-4 dark:text-gray-600">
                                Understand your mood patterns with this simple depression assessment test.
                            </p>
                            <Link to='/assessments/depression-test'>
                                <button
                                    type="button"
                                    className="btn self-start px-4 py-2 text-white bg-[#1BA9B5] hover:bg-gray-500 hover:text-white rounded-mg transition-colors"
                                >
                                    Take Test
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row mb-6 hover:shadow-xl transition duration-500 transform hover:-translate-y-2">
                        <img
                            src="https://i.ibb.co.com/spLzpMrq/hero-shutterstock-2525475415.jpg"
                            alt="Stress Test"
                            className="h-80 dark:bg-gray-500 aspect-video"
                        />
                        <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-50">
                            <span className="text-xs uppercase dark:text-white bg-green-600 p-1 rounded-md max-w-[35px]">Free</span>
                            <h3 className="text-3xl font-bold font-serif">Addiction Test</h3>
                            <p className="my-4 dark:text-gray-600">
                                Quickly assess your stress levels and discover practical coping strategies.
                            </p>
                            <Link to='/assessments/addiction-test'>
                                <button
                                    type="button"
                                    className="btn self-start px-4 py-2 text-white bg-[#1BA9B5] hover:bg-gray-500 hover:text-white rounded-mg transition-colors"
                                >
                                    Take Test
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default TestHomeSection;