import React, { useState } from 'react'
import logo from '../assets/Images/logolight.svg'
import logoIcon from '../assets/Images/logoIcon.svg'
import ProductIcon from '../assets/Images/productIcon.svg';
import SpeedIcon from '@mui/icons-material/Speed';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Divider, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import PeopleIcon from '@mui/icons-material/People';

function Sidebar({ toggleSidebar, setToggleSidebar }) {

    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <>
            <div className={`h-full duration-300 bg-[#212121] hidden md:block ${toggleSidebar ? 'w-[15%] duration-300' : 'w-[5%]'}`}>
                <div className='w-full px-5 py-8 mb-5'>
                    <img src={toggleSidebar ? logo : logoIcon} alt="Logo" className={`${!toggleSidebar ? 'w-[30px]' : 'w-auto'}`} />
                </div>

                <div className={`p-5`}>
                    <div className='flex pl-1 text-white'>
                        <SpeedIcon className='group-hover:text-[rgb(94,53,177)]' />
                        <p className={`font-[600] ml-3 ${toggleSidebar ? 'truncate w-full duration-300' : 'hidden'}`}>Dashboard</p>
                    </div>

                    <div className="flex items-center mt-4 py-3 rounded-md px-2 text-[gray] cursor-pointer group hover:bg-[rgb(94,53,177)] hover:border-[#3c1d7c]" onClick={() => { navigate('/dashboard') }}>
                        <p className={`ml-3 min-w-0 group-hover:text-white ${toggleSidebar ? 'truncate w-full block duration-300' : 'hidden'}`}>Default</p>
                    </div>
                </div>

                <div className='px-5'>
                    <Divider className='bg-[gray]' />
                </div>

                {user.roll == 'admin' && (
                    <div className={`p-5`}>
                        <div className='flex pl-1 text-white'>
                            <PeopleIcon className='group-hover:text-[rgb(94,53,177)]' />
                            <p className={`font-[600] ml-3 ${toggleSidebar ? 'truncate w-full duration-300' : 'hidden'}`}>User Management</p>
                        </div>

                        <div className="flex items-center mt-4 py-3 rounded-md px-2 text-[gray] cursor-pointer group hover:bg-[rgb(94,53,177)] hover:border-[#3c1d7c]" onClick={() => { navigate('/user-management') }}>
                            <p className={`ml-3 min-w-0 group-hover:text-white ${toggleSidebar ? 'truncate w-full block duration-300' : 'hidden'}`}>Users</p>
                        </div>
                    </div>
                )}

                <div className='px-5'>
                    <Divider className='bg-[gray]' />
                </div>

                <div className={`p-5`}>
                    <div className='flex cursor-pointer pl-1 text-white' onClick={() => setExpanded(!expanded)}>
                        <img src={ProductIcon} className='w-5' />
                        <p className={`font-[600] ml-3 ${toggleSidebar ? 'truncate w-full duration-300' : 'hidden'}`}>Product</p>
                        {toggleSidebar && (
                            <div className='ml-auto'>
                                {expanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </div>
                        )}
                    </div>
                    <Collapse in={expanded} timeout="auto">
                        <div>
                            {user.roll == 'admin' && (
                                <div className="flex items-center mt-4 py-3 rounded-md px-2 text-[gray] cursor-pointer group hover:bg-[rgb(94,53,177)] hover:border-[rgb(94,53,177)]" onClick={() => { navigate('/add-product') }}>
                                    <p className={`ml-3 min-w-0 group-hover:text-white ${toggleSidebar ? 'truncate w-full block duration-300' : 'hidden'}`}>Add Products</p>
                                </div>
                            )}
                            <div className={`flex items-center py-3 ${user.roll != 'admin' && 'mt-4'} rounded-md px-2 text-[gray] cursor-pointer group hover:bg-[rgb(94,53,177)] hover:border-[rgb(94,53,177)]`} onClick={() => { navigate('/list-product') }}>
                                <p className={`ml-3 min-w-0 group-hover:text-white ${toggleSidebar ? 'truncate w-full block duration-300' : 'hidden'}`}>List Products</p>
                            </div>
                        </div>
                    </Collapse>
                </div>

                <div className='px-5'>
                    <Divider className='bg-[gray]' />
                </div>

                <div className={`p-5`}>
                    <div className='flex cursor-pointer pl-1 text-white'>
                        <ShoppingCartIcon />
                        <p className={`font-[600] ml-3 ${toggleSidebar ? 'truncate w-full duration-300' : 'hidden'}`}>Orders</p>
                    </div>
                    <div className="flex items-center mt-4 py-3 rounded-md px-2 text-[gray] cursor-pointer group hover:bg-[rgb(94,53,177)] hover:border-[rgb(94,53,177)]" onClick={() => { navigate('/cart') }}>
                        <p className={`ml-3 min-w-0 group-hover:text-white ${toggleSidebar ? 'truncate w-full block duration-300' : 'hidden'}`}>Cart</p>
                    </div>
                </div>
            </div>

            <div className={`w-full h-full duration-300 bg-[#212121] block md:hidden absolute z-50 ${!toggleSidebar ? 'left-[0]' : 'left-[-100%]'}`}>
                <div className='w-full px-5 py-8 mb-5 flex justify-between items-center'>
                    <img src={logo} alt="Logo" />
                    <CloseIcon className='text-white cursor-pointer' onClick={() => { setToggleSidebar(true) }} />
                </div>

                <div className={`p-5`}>
                    <div className='flex pl-1 text-white'>
                        <SpeedIcon className='group-hover:text-[rgb(94,53,177)]' />
                        <p className={`font-[600] ml-3`}>Dashboard</p>
                    </div>

                    <div className="flex items-center mt-4 py-3 rounded-md px-2 text-[gray] cursor-pointer group hover:bg-[rgb(94,53,177)] hover:border-[#3c1d7c]" onClick={() => { navigate('/dashboard') }}>
                        <p className={`ml-3 min-w-0 group-hover:text-white`}>Default</p>
                    </div>
                </div>

                <div className='px-5'>
                    <Divider className='bg-[gray]' />
                </div>

                {user.roll == 'admin' && (
                    <div className={`p-5`}>
                        <div className='flex pl-1 text-white'>
                            <PeopleIcon className='group-hover:text-[rgb(94,53,177)]' />
                            <p className={`font-[600] ml-3`}>User Management</p>
                        </div>

                        <div className="flex items-center mt-4 py-3 rounded-md px-2 text-[gray] cursor-pointer group hover:bg-[rgb(94,53,177)] hover:border-[#3c1d7c]" onClick={() => { navigate('/user-management') }}>
                            <p className={`ml-3 min-w-0 group-hover:text-white`}>User</p>
                        </div>
                    </div>
                )}

                <div className='px-5'>
                    <Divider className='bg-[gray]' />
                </div>

                <div className={`p-5`}>
                    <div className='flex cursor-pointer pl-1 text-white' onClick={() => setExpanded(!expanded)}>
                        <img src={ProductIcon} className='w-5' />
                        <p className={`font-[600] ml-3`}>Product</p>
                        {toggleSidebar && (
                            <div className='ml-auto'>
                                {expanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </div>
                        )}
                    </div>
                    <Collapse in={expanded} timeout="auto">
                        <div>
                            {user.roll == 'admin' && (
                                <div className="flex items-center mt-4 py-3 rounded-md px-2 text-[gray] cursor-pointer group hover:bg-[rgb(94,53,177)] hover:border-[rgb(94,53,177)]" onClick={() => { navigate('/add-product') }}>
                                    <p className={`ml-3 min-w-0 group-hover:text-white`}>Add Products</p>
                                </div>
                            )}
                            <div className={`flex items-center py-3 ${user.roll != 'admin' && 'mt-4'} rounded-md px-2 text-[gray] cursor-pointer group hover:bg-[rgb(94,53,177)] hover:border-[rgb(94,53,177)]`} onClick={() => { navigate('/list-product') }}>
                                <p className={`ml-3 min-w-0 group-hover:text-white`}>List Products</p>
                            </div>
                        </div>
                    </Collapse>
                </div>

                <div className='px-5'>
                    <Divider className='bg-[gray]' />
                </div>

                <div className={`p-5`}>
                    <div className='flex cursor-pointer pl-1 text-white'>
                        <ShoppingCartIcon />
                        <p className={`font-[600] ml-3`}>Orders</p>
                    </div>
                    <div className="flex items-center mt-4 py-3 rounded-md px-2 text-[gray] cursor-pointer group hover:bg-[rgb(94,53,177)] hover:border-[rgb(94,53,177)]" onClick={() => { navigate('/cart') }}>
                        <p className={`ml-3 min-w-0 group-hover:text-white`}>Cart</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
