import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <section className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="max-w-md text-center">
                        <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
                            <span className="sr-only">Error</span>404
                        </h2>
                        <p className="text-2xl font-semibold md:text-3xl">
                            Sorry, we couldn't find this page.
                        </p>
                        <p className="mt-4 mb-8 dark:text-gray-600">
                            But don't worry, you can find plenty of other things on our homepage.
                        </p>

                        <div className="flex gap-4 justify-center">
                            {/* Go Back Button */}
                            <button
                                onClick={() => navigate(-1)}
                                className="px-5 py-2 font-semibold bg-[#1BA9B5] hover:border hover:text-[#158e98] text-white hover:bg-white transition duration-300 shadow-lg rounded-xl cursor-pointer"
                            >
                                Go Back
                            </button>

                            {/* Back to Homepage */}
                            <a
                                rel="noopener noreferrer"
                                href="/"
                                className="px-5 py-2 font-semibold bg-[#1BA9B5] hover:border hover:text-[#158e98] text-white hover:bg-white transition duration-300 shadow-lg rounded-xl cursor-pointer"
                            >
                                Back to Homepage
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ErrorPage;
