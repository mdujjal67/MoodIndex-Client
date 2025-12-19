import React, { useContext, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLink } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { AuthContext } from '../../Contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { sendEmailVerification } from 'firebase/auth';
import Swal from 'sweetalert2';

const SignUp = () => {
    const { createUser, googleLogin, logOut } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(null);
    const [passwordError, setPasswordError] = useState('');
    // ⭐️ 1. Add Email Error State
    const [emailError, setEmailError] = useState('');

    // dynamic title
    useEffect((() => {
        document.title = "MoodIndex | Register"
    }), []);

    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

    const handleSignUp = async (e) => {
    e.preventDefault();
    const targetForm = e.target;
    
    const name = targetForm.name.value;
    const email = targetForm.email.value;
    const password = targetForm.password.value;
    const photoURL = targetForm.photoURL.value;

    setPasswordError('');
    setEmailError('');

    if (!passwordRegex.test(password)) {
        setPasswordError('Password must be 8+ characters long...');
        return;
    }

    try {
        // 1. Create User in Firebase
        const result = await createUser(email, password);
        const user = result.user;

        // 2. Send Verification Email
        await sendEmailVerification(user);

        // 3. Show Alert
        await Swal.fire({
            title: 'Verify your email',
            text: 'A verification link has been sent to your email. Please verify before logging in.',
            icon: 'info',
            confirmButtonColor: '#1BA9B5',
        });

        // 4. 🔥 THE FIX: Match your backend's PUT route
        const userData = {
            name,
            email,
            photoURL,
            role: 'user'
        };

        // Notice the URL change: added /${email} and changed method to PUT
        const res = await fetch(`http://localhost:9000/users/${email}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userData)
        });

        // 5. Success Logic
        if (res.ok) {
            console.log("User successfully synced to MongoDB via PUT");
            targetForm.reset(); 
            await logOut();
            navigate('/login');
            toast.success('Registration successful! Please login.');
        } else {
            console.error("Database sync failed");
            toast.error("Database error occurred.");
        }

    } catch (error) {
        console.error("Signup Error:", error);
        if (error.code === 'auth/email-already-in-use') {
            setEmailError('This email is already registered.');
        } else {
            toast.error('Registration failed. Please try again.');
        }
    }
};

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user)
            })
    };

    return (
        <div>
            <div className="hero lg:min-h-screen bg-gray-50 container mb-20 mx-auto py-10">
                <div className="hero-content flex-col lg:flex-row flex gap-10 lg:gap-20">
                    <div className="lg:w-1/2 lg:flex hidden">
                        <img src='https://i.ibb.co.com/bRG42YwT/sign-up-illustration-svg-download-png-6430773.webp' alt="" className="w-[400px]" />
                    </div>
                    <div className="card lg:ml-20 lg:w-1/2 w-[300px] shadow-lg border bg-base-100">
                        <h1 className="text-2xl text-center font-bold mt-5">Please! Register</h1>
                        <form onSubmit={handleSignUp} className="card-body pb-2 w-full">

                            <div className="form-control relative">
                                <input type="name" name="name" placeholder="Full Name" className="input input-bordered border-[#00396a] mb-3 rounded-full pl-10" required />
                                <FaRegUser className="absolute left-4 top-3 text-gray-500" />
                            </div>

                            {/* ⭐️ 3. Updated Email field with Error Message */}
                            <div className="form-control relative mb-3 w-full">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    className={`input input-bordered rounded-full pl-10 ${emailError ? 'border-red-500' : 'border-[#00396a]'}`}
                                    required
                                />
                                <HiOutlineMail className="absolute left-4 top-3 text-gray-500" />
                                {emailError && (
                                    <p className="text-[12px] text-red-500 ml-4 mt-1">
                                        {emailError}
                                    </p>
                                )}
                            </div>

                            <div className="form-control relative w-full">
                                <input type="link" name="photoURL" placeholder="Photo URL" className="input input-bordered border-[#00396a] mb-3 rounded-full pl-10" required />
                                <IoMdLink className="font-bold absolute left-4 top-3 text-gray-500" />
                            </div>

                            <div className="form-control relative w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className={`input input-bordered rounded-full pl-10 ${passwordError ? 'border-red-500' : 'border-[#00396a]'}`}
                                    required
                                />
                                <MdPassword className="absolute left-4 top-3 text-gray-500" />
                                <a className="relative" href="#" onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}>
                                    <span className="absolute right-4 top-1">
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </a>
                                {passwordError && (
                                    <div className="text-[11px] text-red-500 mt-1 leading-tight wrap-break-words lg:max-w-60 pl-2">
                                        {passwordError}
                                    </div>
                                )}
                                {/* <label className="label">
                                    <Link to='/forgot-password' className="pt-1 label-text-alt link link-hover text-xs ml-1">Forgot password?</Link>
                                </label> */}
                            </div>
                            <p className=" text-center sm:px-6 dark:text-gray-600 col-span-2 text-[14px]">Already have an account?
                                <Link to="/login" rel="noopener noreferrer" className="underline hover:link font-semibold text-[14px] text-[#00396a] ml-1">Login</Link>
                            </p>

                            <div className="form-control mt-3">
                                <button className="btn w-full border-none bg-[#00396a] hover:bg-gray-400 text-white rounded-full">Sign Up</button>
                            </div>
                        </form>

                        <div className="flex items-center -mt-3">
                            <hr className="w-full ml-8" />
                            <p className="px-4 text-[#00000082]">Or </p>
                            <hr className="w-full mr-8" />
                        </div>

                        <div className=" mt-4 px-8 pb-6 w-full">
                            <button onClick={handleGoogleLogin} className="btn w-full border-none bg-[#00396a] hover:bg-gray-400 text-white rounded-full">
                                <FcGoogle className=" text-[24px]" />
                                <span>Continue with Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;