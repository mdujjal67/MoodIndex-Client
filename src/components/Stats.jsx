import React from 'react';

const Stats = () => {
    return (
        <div>
            <section className="p-6 bg-gray-100 text-gray-800">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold font-serif">Our Impact at a Glance</h2>
                    <p className="text-gray-600">A quick look at how our platform helps users</p>
                </div>

                <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3 gap-4">
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leading-none lg:text-6xl">5K+</p>
                        <p className="text-sm sm:text-base">Users Supported</p>
                    </div>

                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leading-none lg:text-6xl">12+</p>
                        <p className="text-sm sm:text-base">Self-Assessment Tools</p>
                    </div>

                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leading-none lg:text-6xl">98%</p>
                        <p className="text-sm sm:text-base">User Satisfaction</p>
                    </div>

                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leading-none lg:text-6xl">120+</p>
                        <p className="text-sm sm:text-base">Mental-Health Articles</p>
                    </div>

                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leading-none lg:text-6xl">30+</p>
                        <p className="text-sm sm:text-base">Verified Expert Resources</p>
                    </div>

                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leading-none lg:text-6xl">3+</p>
                        <p className="text-sm sm:text-base">Accessibility Modes</p>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default Stats;