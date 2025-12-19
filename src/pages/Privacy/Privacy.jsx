import React, { useEffect } from 'react';

const Privacy = () => {

    useEffect((() => {
        document.title = "MoodIndex | Privacy"
    }), []);

    return (
        <div className="max-w-4xl mx-auto py-16 px-6 leading-relaxed">
            <h1 className="text-4xl font-bold text-[#1BA9B5] mb-6 text-center">Privacy Policy</h1>
            <div className="space-y-6 text-gray-700">
                <section>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800 border-b pb-1">Data Protection</h2>
                    <p>For this platform, your data is stored securely using Firebase Authentication and MongoDB. We do not sell or share your assessment results with third parties.</p>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800 border-b pb-1">Account Deletion Policy</h2>
                    <p>Users have full control over their data. However, for security and data integrity within this thesis scope:</p>
                    <ul className="list-disc ml-6 mt-2">
                        <li><strong>Google Sign-In:</strong> Accounts can be deleted at any time.</li>
                        <li className="text-orange-600"><strong>Email/Password:</strong> Accounts can only be deleted 30 days after registration.</li>
                    </ul>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800 border-b pb-1">Anonymity</h2>
                    <p>Assessment results are private. No identifying information is used in the aggregate data analysis for research purposes.</p>
                </section>
            </div>
        </div>
    );
};
export default Privacy;