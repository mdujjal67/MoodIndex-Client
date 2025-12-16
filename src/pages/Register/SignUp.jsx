import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLink } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { AuthContext } from '../../Contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
// import toast from "react-hot-toast";

const SignUp = () => {
    const { createUser, googleLogin } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(null);
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photoURL = form.photoURL.value;

        // create user in the firebase
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('Successfully Signed Up!');
                const creationTime = user?.metadata?.creationTime;

                //  Construct the full user data object to send to the database
                const userData = {
                    name,
                    email,
                    password,
                    photoURL,
                    role: 'user', // Default role for authorization (e.g., role: 'user/premiumUser/admin')
                    creationTime: creationTime
                };

                // send the full data to MongoDB
                fetch('http://localhost:9000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(data => {
                        // if (data.insertedId) {
                        //     Swal.fire({
                        //         position: "top-end",
                        //         icon: "success",
                        //         title: "Your work has been saved",
                        //         showConfirmButton: false,
                        //         timer: 1500
                        //     });
                        // }
                        console.log('After database save', data);
                         // reset();
                form.reset();

                // setLoginError('');
                navigate(from, { replace: true });
                    })
            })
            .catch((error) => {
                console.log(error)
                return toast.error('Please try again later!');
            });
    };

    //   for google login
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user)
            })
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

export default SignUp;