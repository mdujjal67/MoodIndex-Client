import React, { useContext, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { sendEmailVerification } from 'firebase/auth';


const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(null);
    const { signIn, googleLogin, logOut, setLoading, resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // dynamic title
    useEffect((() => {
        document.title = "MoodIndex | Login"
    }), []);

    // import { sendEmailVerification } from "firebase/auth"; 

const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
        .then(async (result) => {
            const loggedInUser = result.user;

            // 1. Get fresh data
            await loggedInUser.reload();

            // 2. Check verification
            if (!loggedInUser.emailVerified) {
                await logOut(); // Clears the Firebase session
                
                Swal.fire({
                    title: "Verify Your Email",
                    text: "Check your inbox. We've sent a link to verify your account.",
                    icon: "warning"
                });
                
                form.reset();
                // ⭐️ FIX: Explicitly stop any global loading here
                setLoading(false); 
                return; 
            }

            // 3. Success
            form.reset();
            navigate(from, { replace: true });
            Swal.fire({
                    title: "Login Successful",                 
                    icon: "success"
                });
        })
        .catch((error) => {
            setLoading(false); // ⭐️ FIX: Stop loading if password/email is wrong
            setLoginError('Invalid credentials');
            toast.error('Login failed');
        });
};

    //   for google login
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user;

                // ⭐️ NEW: Save/Update user in MongoDB
                const userData = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    role: 'user' // Default role
                };

                fetch(`http://localhost:9000/users/${user.email}`, {
                    method: 'PUT', // Use PUT for "Upsert" logic
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log("User synced with MongoDB:", data);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Login successful",
                            showConfirmButton: false,
                            timer: 2000
                        });
                        navigate(location?.state?.from || '/');
                    });
            })
            .catch(error => {
                toast.error("Google login failed");
                console.error(error);
            });
    };
    // ⭐️ NEW: Password Reset Logic with Database Update
    const handleForgotPassword = async () => {
        const { value: email } = await Swal.fire({
            title: "Reset Password",
            input: "email",
            inputLabel: "Enter your registered email address",
            inputPlaceholder: "example@mail.com",
            showCancelButton: true,
            confirmButtonColor: "#00396a",
            cancelButtonColor: "#d33",
        });

        if (email) {
            resetPassword(email)
                .then(async () => {
                    // Update Database to record the reset event
                    try {
                        await fetch(`http://localhost:9000/users/${email}`, {
                            method: 'PATCH',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify({ 
                                lastPasswordResetRequest: new Date().toISOString() 
                            })
                        });
                    } catch (dbErr) {
                        console.error("Failed to sync reset to DB", dbErr);
                    }

                    Swal.fire({
                        title: "Email Sent!",
                        text: "Please check your inbox for the password reset link.",
                        icon: "success"
                    });
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Error: Could not find an account with that email.");
                });
        }
    };



    return (
        <div>
            <div className="hero lg:min-h-screen bg-gray-50 container mb-20 mx-auto py-10">
                <div className="hero-content flex-col lg:flex-row flex gap-10 lg:gap-20">
                    <div className="lg:w-1/2 lg:flex hidden">
                        <img src='https://i.ibb.co.com/NdDvCS7S/Login-removebg-preview.png' alt="" className="w-[400px]" />
                    </div>
                    <div className="card lg:ml-20 lg:w-1/2 w-[300px] shadow-lg border bg-base-100">
                        <h1 className="text-2xl text-center font-bold mt-5"> Please! Login</h1>
                        <form onSubmit={handleLogin} className="card-body">

                            {/* This is for Email field */}
                            <div className="form-control relative">
                                <input type="email" name="email" placeholder="Your Email" className="input input-bordered border-[#00396a] -mt-1 mb-3 rounded-full pl-10" required></input>
                                <FaRegUser className=" absolute left-4 top-3 text-gray-500" />
                            </div>

                            {/* This is for Password field*/}
                            <div className="form-control relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="input input-bordered border-[#00396a] -mt-1 rounded-full pl-10" required />
                                <MdPassword className="absolute left-4 top-3 text-gray-500" />
                                <a className="relative" href="#">
                                    <span className="absolute right-4 top-1" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </a>
                                {/* input field error show */}
                                <div>
                                    {
                                        loginError && <p className="text-xs text-red-500">{loginError}</p>
                                    }
                                </div>

                                <label className="label">
                                    <button 
                                        type="button"
                                        onClick={handleForgotPassword}
                                        className="pt-1 label-text-alt link link-hover text-xs text-left"
                                    >
                                        Forgot password?
                                    </button>
                                </label>
                                <label className="">
                                    <p className="text-[14px] w-[220px] mx-auto mt-2 text-[#00000082]">Do not have an account? <Link to='/register' className="hover:link font-semibold text-[14px] text-[#00396a]">Register</Link>
                                    </p>
                                </label>
                            </div>
                            <div className="form-control mt-3">
                                <button type='submit' className="btn w-full border-none bg-[#00396a] hover:bg-gray-400 text-white rounded-full">Login</button>
                            </div>
                        </form>

                        {/* This is for social login buttons */}
                        <div className="flex items-center -mt-3">
                            <hr className="w-full ml-8" />
                            <p className="px-4 text-[#00000082]">Or</p>
                            <hr className="w-full mr-8" />
                        </div>
                        <div className=" mt-4 px-8 pb-6 w-full">
                            <button onClick={handleGoogleLogin} className="btn w-full border-none bg-[#00396a] hover:bg-gray-400 text-white rounded-full">
                                <FcGoogle className=" text-[24px]" />
                                <span>Continue with Google</span>
                            </button>
                            {/* <FcGoogle className="absolute top-3 left-[60px] text-[24px]" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;