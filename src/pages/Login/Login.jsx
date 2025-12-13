import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';


const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] =useState(null);
    const{signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e) =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log({email, password});

        signIn(email, password)
        .then(result => {
            const user = result.user
                console.log(user)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login successful",
                    showConfirmButton: false,
                    timer: 2000
                });
                // reset();
                form.reset();
                
                // setLoginError('');
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setLoginError('Wrong Email ID or Password! Please enter correct information.')
                toast.error('Please try again!', error)
                // navigate('/');
                form.reset();
            });
    }
    return (
        <div>
            <div className="hero min-h-screen bg-gray-50 container mb-20 mx-auto py-10">
                <div className="hero-content flex-col lg:flex-row flex gap-10 lg:gap-20">
                    <div className="lg:w-1/2">
                        <img src='https://i.ibb.co.com/NdDvCS7S/Login-removebg-preview.png' alt="" className="w-[400px]" />
                    </div>
                    <Toaster position="top-center" reverseOrder={false} />
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
                                    <Link to='/forgot-password' className="pt-1 label-text-alt link link-hover text-xs">Forgot password?</Link>
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

export default Login;