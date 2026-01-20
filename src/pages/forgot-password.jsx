import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Images/logo.svg'
import axios from 'axios';
import { TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

function ForgotPassword() {

    const API_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate()
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API_URL}/forgotPassword`, { email });

            toast.success(res.data.message);

            if (res.data.success) {
                navigate('/otp-verification', {
                    state: { email }
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className='w-full h-screen bg-[#EEF2F6] flex items-center justify-center p-5'>
            <div className='p-8 rounded-2xl bg-white w-full max-w-md shadow border border-gray-100'>
                <div className='flex justify-center items-start mb-6'>
                    <img
                        src={logo}
                        alt="Logo"
                        className='w-20'
                    />
                </div>

                <div className='text-center mb-8'>
                    <h1 className='text-xl md:text-2xl font-bold text-gray-800 mb-2'>Forgot Password?</h1>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                        Enter your email address below and we'll send you otp to reset your password.
                    </p>
                </div>

                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div className='space-y-2'>
                        <TextField label="Email Address" variant="outlined" fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: '5px',
                                    height: 50,
                                }
                            }}
                            name='email'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-[rgb(94,53,177)] hover:bg-[rgb(81,45,150)] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[rgb(94,53,177)] focus:ring-opacity-50 cursor-pointer'
                    >
                        Send OTP
                    </button>

                    <div className='text-center pt-2'>
                        <button
                            type='button'
                            onClick={() => navigate('/')}
                            className='text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer'
                        >
                            ← Back to Sign In
                        </button>
                    </div>
                </form>
            </div>

            <ToastContainer />
        </div>
    )
}

export default ForgotPassword
