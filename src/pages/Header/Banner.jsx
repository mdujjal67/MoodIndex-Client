import React from 'react';

const Banner = () => {
    return (
        <div>
            <div
                className="hero h-screen max-h-[650px] overflow-hidden"
                style={{
                    backgroundImage:
                        "url(https://i.ibb.co.com/GfRNXKzS/what-does-depression-look-like-in-men.jpg)",
                }}
            >
                <div className="hero-overlay bg-opacity-70"></div>

                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-[600px]">
                        <h1 className="mb-5 text-5xl font-bold font-serif">
                            Welcome to MoodIndex
                        </h1>

                        <p className="mb-6 text-lg font-sans">
                            Track your emotional wellbeing, take guided self-assessments, 
                            and explore accessible tools designed to support people with 
                            diverse needs and abilities.
                        </p>

                        <div className="flex justify-center gap-4 flex-wrap">
                            {/* Primary CTA — matches nav hover color */}
                            <a
                                href="#self-assessments"
                                className="btn bg-[#1BA9B5]  text-white border-none hover:btn-outline hover:bg-white hover:text-[#1BA9B5]"
                            >
                                Start Self-Assessments
                            </a>

                            {/* Secondary CTA */}
                            <a
                                href="#resources"
                                className="btn btn-outline text-white border-white hover:bg-white hover:text-[#1BA9B5]"
                            >
                                Browse Resources
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
