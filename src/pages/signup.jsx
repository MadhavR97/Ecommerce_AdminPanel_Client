import React, { useState } from 'react'
import logo from '../assets/Images/logo.svg'
import googleIcon from '../assets/Images/socialGoogle.svg'
import Divider from "@mui/material/Divider";
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

function Signup() {

    const API_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = useState({
        roll: '',
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const res = await axios.post(`${API_URL}/AddUser`, formData);

            toast.success(res.data.message);

            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    return (
        <div className='border border-black w-full h-auto flex items-center justify-center bg-[#EEF2F6] p-5'>
            <div className='p-8 rounded-lg bg-white w-full md:w-[500px]'>
                <div className='flex justify-center mb-3'>
                    <img src={logo} alt="Logo" />
                </div>
                <h1 className='font-bold w-full flex justify-center items-center mt-10 text-[rgb(94,53,177)] text-[1.5rem]'>Sign Up</h1>
                <h3 className='w-full flex justify-center mt-4 text-[#9E9E9E] font-bold'>Enter credentials to continue</h3>
                <div className='border border-[#00000014] p-2 rounded-md flex justify-center mt-8 cursor-pointer'>
                    <img src={googleIcon} alt="Google" className='mr-3' />
                    <h4 className='font-bold text-[#616161] text-[0.9rem]'>Sign In With Google</h4>
                </div>
                <div className="mt-8 flex items-center">
                    <Divider className="flex-1" />
                    <div className="border border-[#00000014] py-0.5 px-8 rounded-full mx-5">
                        <p className="font-[500] text-[0.8rem]">OR</p>
                    </div>
                    <Divider className="flex-1" />
                </div>
                <div className='w-full flex justify-center mt-8 font-bold'>
                    <p>Sign up with Email address</p>
                </div>
                <form className='flex flex-col my-5 gap-5 w-full' onSubmit={handleSubmit}>
                    <FormControl>
                        <InputLabel>Roll</InputLabel>
                        <Select
                            name='roll'
                            value={formData.roll}
                            onChange={handleChange}
                            label="Roll"
                            sx={{
                                borderRadius: '12px'
                            }}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                        </Select>
                    </FormControl>
                    <div className='flex gap-3 md:gap-5'>
                        <TextField label="Firstname" variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: '12px'
                                }
                            }}
                            name='firstname'
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                        <TextField label="Lastname" variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: '12px'
                                }
                            }}
                            name='lastname'
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                    </div>
                    <TextField label="Email Address / Username" variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: '12px'
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
                                    borderRadius: '12px'
                                }
                            }}
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityIcon className='text-[#9E9E9E]' /> : <VisibilityOffIcon className='text-[#9E9E9E]' />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    <div className='flex item-center'>
                        <input type="checkbox" className="mr-2 w-4 h-4 mt-1 cursor-pointer" />
                        <p>Agree with? <span className='text-[gray] underline font-bold'>Terms & Conditions</span></p>
                    </div>
                    <button className='w-full bg-[rgb(94,53,177)] py-3 rounded-sm text-white font-bold cursor-pointer'>Sign Up</button>
                </form>
                <Divider />
                <div className='flex justify-end mt-4'>
                    <span className='text-[gray] cursor-pointer' onClick={() => navigate('/')}>Already have an account?</span>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Signup
