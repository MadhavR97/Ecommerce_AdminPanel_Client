import React, { use, useEffect, useRef, useState } from 'react'
import logo from '../assets/Images/logo.svg'
import { TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function OtpVerification() {

    const API_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate()
    const { state } = useLocation();
    const email = state?.email;

    const Input1 = useRef(null)
    const Input2 = useRef(null)
    const Input3 = useRef(null)
    const Input4 = useRef(null)
    const Input5 = useRef(null)
    const Input6 = useRef(null)

    const [obj, setObj] = useState({
        first: '',
        second: '',
        third: '',
        fourth: '',
        fifth: '',
        sixth: ''
    })

    useEffect(() => {
        Input1.current.focus()

        if (obj.first.length == 1) {
            Input2.current.focus()

            if (obj.second.length == 1) {
                Input3.current.focus()

                if (obj.third.length == 1) {
                    Input4.current.focus()

                    if (obj.fourth.length == 1) {
                        Input5.current.focus()

                        if (obj.fifth.length == 1) {
                            Input6.current.focus()
                        }
                    }
                }
            }
        }
    }, [obj])

    const handleChange = (e) => {
        setObj({ ...obj, [e.target.name]: e.target.value })
    }

    const handleDown = (e) => {
        if (e.key == 'Backspace' && e.target.value == '') {
            if (e.target.name == 'sixth') {
                Input5.current.focus()
            }
            else if (e.target.name == 'fifth') {
                Input4.current.focus()
            }
            else if (e.target.name == 'fourth') {
                Input3.current.focus()
            }
            else if (e.target.name == 'third') {
                Input2.current.focus()
            }
            else if (e.target.name == 'second') {
                Input1.current.focus()
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API_URL}/otpVerification`, { email, obj });

            toast.success(res.data.message);

            if (res.data.success) {
                navigate('/reset-password', {
                    state: { email }
                });
            }
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className='w-full h-full flex items-center justify-center bg-[#EEF2F6] p-5'>
            <div className='p-8 rounded-2xl bg-white w-full max-w-md shadow border border-gray-100'>
                <div className='flex justify-center items-start mb-6'>
                    <img
                        src={logo}
                        alt="Logo"
                        className='w-20'
                    />
                </div>

                <div className='text-center mb-8'>
                    <h1 className='text-xl md:text-2xl font-bold text-gray-800 mb-2'>OTP Verification</h1>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                        We have sent a 6-digit OTP to your email address. Please enter it below to reset your password.
                    </p>
                </div>

                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-3">
                        <input
                            type="text"
                            name="first"
                            className="w-8 h-8 text-center text-xs font-bold bg-gray-50 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                            ref={Input1}
                            onChange={handleChange}
                            onKeyDown={handleDown}
                            maxLength={1}
                        />
                        <input
                            type="text"
                            name="second"
                            className="w-8 h-8 text-center text-xs font-bold bg-gray-50 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                            ref={Input2}
                            onChange={handleChange}
                            onKeyDown={handleDown}
                            maxLength={1}
                        />
                        <input
                            type="text"
                            name="third"
                            className="w-8 h-8 text-center text-xs font-bold bg-gray-50 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                            ref={Input3}
                            onChange={handleChange}
                            onKeyDown={handleDown}
                            maxLength={1}
                        />
                        <div className="w-4 flex items-center justify-center">
                            <span className="text-gray-400 font-bold">-</span>
                        </div>
                        <input
                            type="text"
                            name="fourth"
                            className="w-8 h-8 text-center text-xs font-bold bg-gray-50 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                            ref={Input4}
                            onChange={handleChange}
                            onKeyDown={handleDown}
                            maxLength={1}
                        />
                        <input
                            type="text"
                            name="fifth"
                            className="w-8 h-8 text-center text-xs font-bold bg-gray-50 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                            ref={Input5}
                            onChange={handleChange}
                            onKeyDown={handleDown}
                            maxLength={1}
                        />
                        <input
                            type="text"
                            name="sixth"
                            className="w-8 h-8 text-center text-xs font-bold bg-gray-50 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                            ref={Input6}
                            onChange={handleChange}
                            onKeyDown={handleDown}
                            maxLength={1}
                        />
                    </div>

                    <button
                        type='submit'
                        className='mt-5 w-full bg-[rgb(94,53,177)] hover:bg-[rgb(81,45,150)] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[rgb(94,53,177)] focus:ring-opacity-50 cursor-pointer'
                    >
                        Verify OTP
                    </button>

                    <div className='text-center'>
                        <button
                            type='button'
                            onClick={() => navigate('/forgot-password')}
                            className='text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer'
                        >
                            ← Change Email
                        </button>
                    </div>
                </form>
            </div>

            <ToastContainer />
        </div>
    )
}

export default OtpVerification 
