// src/components/Stats.jsx
import React from 'react';
import Counter from './Counter'; // Import the Counter component

const Stats = () => {
    return (
        <div>
            <section className="p-6 bg-gray-100 text-gray-800">
                <div className="text-center my-8">
                    <h2 className="text-4xl font-bold font-serif">Our Impact at a Glance</h2>
                    <p className="text-gray-600">A quick look at how our platform helps users</p>
                </div>

                <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3 gap-4">
                    
                    {/* Stat 1: Users Supported (5,000+) */}
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <Counter endValue={5000} suffix="+" />
                        <p className="text-sm sm:text-base mt-2">Users Supported</p>
                    </div>

                    {/* Stat 2: Self-Assessment Tools (12+) */}
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <Counter endValue={12} suffix="+" />
                        <p className="text-sm sm:text-base mt-2">Self-Assessment Tools</p>
                    </div>

                    {/* Stat 3: User Satisfaction (98%) */}
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        {/* Example: Using precision for percentage if needed (e.g., 98.0%) */}
                        <Counter endValue={98} suffix="%" /> 
                        <p className="text-sm sm:text-base mt-2">User Satisfaction</p>
                    </div>

                    {/* Stat 4: Mental-Health Articles (120+) */}
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <Counter endValue={120} suffix="+" />
                        <p className="text-sm sm:text-base mt-2">Mental-Health Articles</p>
                    </div>

                    {/* Stat 5: Verified Expert Resources (30+) */}
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <Counter endValue={30} suffix="+" />
                        <p className="text-sm sm:text-base mt-2">Verified Expert Resources</p>
                    </div>

                    {/* Stat 6: Accessibility Modes (3+) */}
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <Counter endValue={3} suffix="+" />
                        <p className="text-sm sm:text-base mt-2">Accessibility Modes</p>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Stats;