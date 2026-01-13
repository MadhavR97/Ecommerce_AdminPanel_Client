import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/Images/logo.svg'
import googleIcon from '../assets/Images/socialGoogle.svg'
import Divider from "@mui/material/Divider";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

function Login() {

    const API_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        roll: '',
        email: '',
        password: ''
    })

    const { state } = useLocation();
    const message = state?.message;

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
    }, [message])

    useEffect(() => {
        const savedData = localStorage.getItem("rememberMe");

        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);

                setFormData(prev => ({
                    ...prev,
                    email: parsedData.email || '',
                    password: parsedData.password || ''
                }));
                setRememberMe(true);
            } catch (error) {
                console.error("Error parsing saved credentials:", error);
                localStorage.removeItem("rememberMe");
            }
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleCheck = (e) => {
        const isChecked = e.target.checked;
        setRememberMe(isChecked);

        if (!isChecked) {
            localStorage.removeItem("rememberMe");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API_URL}/loginUser`, formData);

            toast.success(res.data.message);

            localStorage.setItem("user", JSON.stringify(res.data.existUser));
            localStorage.setItem("auth", JSON.stringify(true));

            if (rememberMe) {
                localStorage.setItem("rememberMe", JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }));
            } else {
                localStorage.removeItem("rememberMe");
            }

            setTimeout(() => {
                navigate('/dashboard')
            }, 2000);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    return (
        <div className='border border-[red] w-full h-full flex items-center justify-center p-5 md:p-0'>
            <div className='p-8 md:p-10 rounded-lg bg-white w-full sm:w-[80%] md:w-[60%] xl:w-[35%] shadow shadow-md'>
                <div className='flex justify-center'>
                    <img src={logo} alt="Logo" />
                </div>
                <h1 className='font-bold w-full flex justify-center items-center mt-5 md:mt-10 text-[rgb(94,53,177)] text-xl'>Hi, Welcome Back</h1>
                <h3 className='w-full flex justify-center mt-1 text-[#9E9E9E]'>Enter your credentials to continue</h3>
                <div className='border border-[#00000014] p-2 rounded-md flex justify-center mt-5 cursor-pointer'>
                    <img src={googleIcon} alt="Google" className='mr-3' />
                    <h4 className='font-bold text-[#616161] text-[0.9rem]'>Sign In With Google</h4>
                </div>
                <div className="mt-5 flex items-center">
                    <Divider className="flex-1" />
                    <div className="border border-[#00000014] py-0.5 px-8 rounded-full mx-5">
                        <p className="font-[500] text-[0.8rem]">OR</p>
                    </div>
                    <Divider className="flex-1" />
                </div>
                <div className='w-full flex justify-center mt-5 font-bold text-sm'>
                    <p>Sign in with Email address</p>
                </div>
                <form className='flex flex-col my-5 gap-5 w-full' onSubmit={handleSubmit}>
                    <FormControl fullWidth>
                        <InputLabel size="small" sx={{ mt: { md: '5px' } }}>Roll</InputLabel>
                        <Select
                            name="roll"
                            value={formData.roll}
                            onChange={handleChange}
                            label="Roll"
                            size="small"
                            required
                            sx={{
                                borderRadius: '5px',
                                fontSize: { sm: '10px', md: '14px' },
                                height: { md: '50px' }
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        '& .MuiMenuItem-root': {
                                            fontSize: { sm: '12px', md: '14px' },
                                            padding: { sm: '6px 12px', md: '10px 16px' }
                                        },
                                    },
                                },
                            }}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField label="Email Address / Username" variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: '5px',
                                height: 50
                            }
                        }}
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <div>
                        <TextField label="Password" type={showPassword ? "text" : "password"} variant="outlined"
                            className='w-full'
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: '5px',
                                    height: 50,
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityIcon className='text-[#9E9E9E]' /> : <VisibilityOffIcon className='text-[#9E9E9E]' />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <input
                                type="checkbox"
                                className="mr-2 w-4 h-4 cursor-pointer"
                                checked={rememberMe}
                                onChange={handleCheck}
                            />
                            <p className='text-sm'>Remember Me?</p>
                        </div>
                        <p className='text-[rgb(30,136,229)] cursor-pointer text-sm' onClick={() => { navigate('/forgot-password') }}>Forgot Password?</p>
                    </div>
                    <button className='w-full bg-[rgb(94,53,177)] py-2 md:py-3 rounded-sm text-white font-bold cursor-pointer'>Sign In</button>
                </form>
                <Divider />
                <div className='flex justify-end mt-4'>
                    <span className='text-[gray] cursor-pointer text-sm' onClick={() => navigate('/signup')}>Don't have an account yet?</span>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login