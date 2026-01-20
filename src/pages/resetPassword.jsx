import React, { useState } from 'react'
import logo from '../assets/Images/logo.svg'
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

function ResetPassword() {

    const API_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState({
        newPassword: '',
        confirmPassword: ''
    })

    const { state } = useLocation()
    const email = state?.email;

    const handleChange = (e) => {
        const { name, value } = e.target
        setPassword({
            ...password,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (password.newPassword != password.confirmPassword) {
                toast.error('New & confirm password does not match')
            }

            const response = await axios.post(`${API_URL}/resetPassword`, { password, email });

            if (response.data) {
                navigate('/', { state: { message: response.data.message } })
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full h-screen flex items-center justify-center bg-[#EEF2F6] p-5'>
            <div className='p-8 rounded-2xl bg-white w-full max-w-md shadow border border-gray-100'>
                <div className='flex justify-center items-start mb-6'>
                    <img
                        src={logo}
                        alt="Logo"
                        className='w-20'
                    />
                </div>

                <div className='text-center mb-8'>
                    <h1 className='text-xl md:text-2xl font-bold text-gray-800 mb-2'>Reset Password</h1>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                        Enter your new password below.
                    </p>
                </div>

                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div className='space-y-2'>
                        <TextField label="New Password" variant="outlined"
                            sx={{
                                width: '100%',
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: '5px',
                                }
                            }}
                            name='newPassword'
                            value={password.newPassword}
                            onChange={handleChange}
                        />
                        <TextField label="Confirm Password" variant="outlined"
                            sx={{
                                width: '100%',
                                marginTop: '10px',
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: '5px',
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            type={showPassword ? "text" : "password"}
                            name='confirmPassword'
                            value={password.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type='submit'
                        className='mt-5 w-full bg-[rgb(94,53,177)] hover:bg-[rgb(81,45,150)] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[rgb(94,53,177)] focus:ring-opacity-50 cursor-pointer'
                    >
                        Reset Password
                    </button>

                    <div className='text-center'>
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

export default ResetPassword
