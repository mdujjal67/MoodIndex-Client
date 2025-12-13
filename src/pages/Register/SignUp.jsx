import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router';
import { IoMdLink } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { AuthContext } from '../../Contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
// import toast from "react-hot-toast";

const SignUp = () => {
    const { createUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] =useState(null);

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({email, password});
        // console.log(createUser)

        // create user in the firebase
        createUser(email, password)
            .then(result => {
                console.log(result.user)
                toast.success('Successfully Sign Up!')
                // reset();
            })
            .catch((error) => {
                console.log(error)
                return toast.error('This User Already Exists!');
            });

    };



    return (
        <div>
            <div className="hero min-h-screen bg-gray-50 container mb-20 mx-auto py-10">
                <div className="hero-content flex-col lg:flex-row flex gap-10 lg:gap-20">
                    <div className="lg:w-1/2">
                        <img src='https://i.ibb.co.com/bRG42YwT/sign-up-illustration-svg-download-png-6430773.webp' alt="" className="w-[400px]" />
                    </div>
                     <Toaster position="top-center" reverseOrder={false} />
                    <div className="card lg:ml-20 lg:w-1/2 w-[300px] shadow-lg border bg-base-100">
                        <h1 className="text-2xl text-center font-bold mt-5">Please! Register</h1>
                        <form onSubmit={handleSignUp} className="card-body">

                            {/* This is for Name field */}
                            <div className="form-control relative">
                                <input type="name" name="name" placeholder="Full Name" className="input input-bordered border-[#00396a] -mt-1 mb-3 rounded-full pl-10" required></input>
                                <FaRegUser className=" absolute left-4 top-3 text-gray-500" />
                            </div>
                            {/* This is for Email field */}
                            <div className="form-control relative">
                                <input type="email" name="email" placeholder="Your Email" className="input input-bordered border-[#00396a] -mt-1 mb-3 rounded-full pl-10" required></input>
                                <HiOutlineMail className=" absolute left-4 top-3 text-gray-500" />
                            </div>
                            {/* This is for photoURL field */}
                            <div className="form-control relative">
                                <input type="link" name="photoURL" placeholder="Photo URL" className="input input-bordered border-[#00396a] -mt-1 mb-3 rounded-full pl-10" required></input>
                                <IoMdLink className="font-bold absolute left-4 top-3 text-gray-500" />
                            </div>

                            {/* This is for Password field*/}
                            <div className="form-control relative">
                                <input
                                    // type={showPassword ? "text" : "password"}
                                    type='password'
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
                                    {/* {
                                                loginError && <p className="text-[12px] text-red-500">{loginError}</p>
                                            } */}
                                </div>

                                <label className="label">
                                    <Link to='/forgot-password' className="pt-1 label-text-alt link link-hover text-xs ml-1">Forgot password?</Link>
                                </label>
                                <label className="">
                                    <p className="text-[14px] w-[220px] font-semibold mx-auto mt-2 text-[#00000082]">Already Have An Account? <Link to='/login' className="hover:link font-semibold text-[14px] text-[#00396a]">Login</Link>
                                    </p>
                                </label>
                            </div>
                            <div className="form-control mt-3">
                                <button className="btn w-full border-none bg-[#00396a] hover:bg-gray-400 text-white rounded-full">Sign Up</button>
                            </div>
                        </form>

                        {/* This is for social login buttons */}
                        <div className="flex items-center -mt-3">
                            <hr className="w-full ml-8" />
                            <p className="px-4 text-[#00000082]">Or </p>
                            <hr className="w-full mr-8" />
                        </div>
                        <div className="form-control w-full mt-3 px-8 flex flex-row gap-5 mx-auto items-center pb-7">
                            {/* <div className="bg-gray-100 hover:bg-gray-200 w-8 h-8 items-center mx-auto rounded-full">
                                        <button><IoLogoGithub className="text-black text-[20px] ml-[6px] mt-[6px] mx-auto items-center" /></button>
                                    </div> */}
                            <div className="cursor-pointer bg-gray-100 hover:bg-gray-200 w-full items-center mx-auto rounded-full">
                                <button className='mx-auto p-2 cursor-pointer'><FcGoogle className="text-black text-[20px] ml-1.5 mt-1.5 mx-auto items-center" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;