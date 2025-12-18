import React, { useContext } from 'react';
import Swal from "sweetalert2";
import { AuthContext } from '../../Contexts/AuthContext'; // Ensure this path is correct

const Contact = () => {
    // 1. Get the current user from AuthContext
    const { user } = useContext(AuthContext);

    const handleContactedUser = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const message = form.message.value;

        const contactedUser = { email, message };

        // Send data to the server 
        fetch('http://localhost:9000/contactedUser', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(contactedUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Message Sent!',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                    form.reset();
                }
            })
            .catch(error => {
                console.error("Error:", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong. Please try again.',
                    icon: 'error'
                });
            });
    };

    return (
        <div className="mb-[100px] mt-">
            <section className="py-14 dark:bg-gray-100 bg-gray-100 dark:text-gray-900 mx-auto container rounded-xl">
                <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
                    
                    {/* Contact Information Side */}
                    <div className="py-6 md:py-0 md:px-6">
                        <h1 className="text-4xl font-bold">Get in touch</h1>
                        <p className="pt-2 pb-4">Fill in the form to send your opinion</p>
                        <div className="space-y-4">
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                </svg>
                                <span>ABC, banani, Dhaka</span>
                            </p>
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                </svg>
                                <span>123456789</span>
                            </p>
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                </svg>
                                <span>contact@moodindex.com</span>
                            </p>
                        </div>
                    </div>
                    
                    {/* Form Side */}
                    <form onSubmit={handleContactedUser} noValidate="" className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
                        <label className="block">
                            <span className="mb-1 block font-medium">Email address</span>
                            <input 
                                type="email" 
                                name="email" 
                                // Pre-fill with user email if available
                                defaultValue={user?.email || ''} 
                                // Lock the field if user is logged in
                                readOnly={!!user?.email} 
                                placeholder="Your Email" 
                                required 
                                className={`block w-full rounded-md shadow-sm py-3 pl-3 mt-2 outline-none focus:ring focus:ring-opacity-100 focus:dark:ring-violet-600 border ${user?.email ? 'bg-gray-200 cursor-not-allowed border-gray-300' : 'bg-white border-gray-300'}`} 
                            />
                            {user?.email && (
                                <p className="text-xs text-blue-600 mt-1">Logged in as {user.email}</p>
                            )}
                        </label>
                        <label className="block">
                            <span className="mb-1 block font-medium">Message</span>
                            <textarea 
                                rows="5" 
                                name="message" 
                                placeholder="Your Message" 
                                required 
                                className="block w-full rounded-md border border-gray-300 focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 bg-white dark:bg-gray-200 pl-3 pt-3 mt-2 outline-none"
                            ></textarea>
                        </label>
                        <input 
                            type="submit" 
                            name="submit" 
                            value="Send Message" 
                            className="btn w-full bg-[#00396a] hover:bg-gray-400 text-white rounded-full border-none font-bold uppercase transition-colors duration-300" 
                        />
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Contact;