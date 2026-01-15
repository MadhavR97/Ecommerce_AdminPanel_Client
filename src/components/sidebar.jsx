import React, { useState } from 'react'
import logo from '../assets/Images/logolight.svg'
import logoIcon from '../assets/Images/LogoIcon.svg'
import SpeedIcon from '@mui/icons-material/Speed';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Divider, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import PeopleIcon from '@mui/icons-material/People';
import ProductIcon from '../assets/Images/product-icon.svg'

function Sidebar({ toggleSidebar, setToggleSidebar }) {

    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <>
            {/* Desktop Device */}
            <div className={`h-full duration-300 bg-[#212121] overflow-y-scroll hidden md:block rounded-tr-4xl rounded-br-4xl ${toggleSidebar ? 'w-[30%] lg:w-[20%] xl:w-[15%] duration-300' : 'w-[10%] lg:w-[5%]'}`}>
                <div className='w-full px-5 py-8 mb-5'>
                    <div className="relative h-8">
                        <img src={logo} alt="Logo" className={`ml-1 absolute transition-opacity duration-200 ${toggleSidebar ? 'opacity-100' : 'opacity-0'}`} />
                        <img src={logoIcon} alt="Logo" className={`w-[26px] ml-1 absolute transition-opacity duration-200 ${toggleSidebar ? 'opacity-0' : 'opacity-100'}`} />
                    </div>
                </div>

                <div className={`p-5`}>
                    <div className='flex pl-2 text-white'>
                        <SpeedIcon className='group-hover:text-[rgb(94,53,177)]' />
                        <p className={`font-[600] ml-3 whitespace-nowrap ${toggleSidebar ? 'truncate w-full duration-300' : 'invisible'}`}>Dashboard</p>
                    </div>

                    <div className={`flex items-center mt-4 py-3 rounded-md px-2 text-[gray] cursor-pointer group hover:bg-[rgb(94,53,177)] hover:border-[#3c1d7c] ${toggleSidebar ? 'visible' : 'invisible'}`} onClick={() => { navigate('/dashboard') }}>
                        <p className={`ml-3 min-w-0 group-hover:text-white whitespace-nowrap ${toggleSidebar ? 'truncate w-full block duration-300' : 'invisible'}`}>Default</p>
                    </div>
                </div>

                <div className='px-5'>
                    <Divider className='bg-[gray]' />
                </div>

                {user.roll == 'admin' && (
                    <div className={`p-5`}>
                        <div className='flex pl-2 text-white'>
                            <PeopleIcon className='group-hover:text-[rgb(94,53,177)]' />
                            <p className={`font-[600] ml-3 whitespace-nowrap ${toggleSidebar ? 'truncate w-full duration-300' : 'invisible'}`}>User Management</p>
                        </div>

                        <div className={`flex items-center mt-4 py-3 rounded-md px-2 text-[gray] cursor-pointer group hover:bg-[rgb(94,53,177)] hover:border-[#3c1d7c] ${toggleSidebar ? 'visible' : 'invisible'}`} onClick={() => { navigate('/user-management') }}>
                            <p className={`ml-3 min-w-0 group-hover:text-white whitespace-nowrap ${toggleSidebar ? 'truncate w-full block duration-300' : 'invisible'}`}>Users</p>
                        </div>
                    </div>
                )}

                <div className='px-5'>
                    <Divider className='bg-[gray]' />
                </div>

                <div className={`p-5`}>
                    <div className='flex cursor-pointer pl-2 text-white' onClick={() => setExpanded(!expanded)}>
                        <img src={ProductIcon} className='w-6' />
                        <p className={`font-[600] ml-3 whitespace-nowrap ${toggleSidebar ? 'truncate w-full duration-300' : 'invisible'}`}>Product</p>
                        {toggleSidebar && (
                            <div className='ml-auto'>
                                {expanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </div>
                        )}
                    </div>
                    <Collapse in={expanded} timeout="auto">
                        <div>
                            {user.roll == 'admin' && (
                                <div className={`flex items-center mt-4 py-3 rounded-md px-2 text-[gray] cursor-pointer group hover:bg-[rgb(94,53,177)] hover:border-[rgb(94,53,177)] ${toggleSidebar ? 'visible' : 'invisible'}`} onClick={() => { navigate('/add-product') }}>
                                    <p className={`ml-3 min-w-0 group-hover:text-white whitespace-nowrap ${toggleSidebar ? 'truncate w-full block duration-300' : 'invisible'}`}>Add Products</p>
                                </div>
                            )}
                            <div className={`flex items-center py-3 ${user.roll != 'admin' && 'mt-4'} rounded-md px-2 text-[gray] cursor-pointer group hover:bg-[rgb(94,53,177)] hover:border-[rgb(94,53,177)] ${toggleSidebar ? 'visible' : 'invisible'}`} onClick={() => { navigate('/list-product') }}>
                                <p className={`ml-3 min-w-0 group-hover:text-white whitespace-nowrap ${toggleSidebar ? 'truncate w-full block duration-300' : 'invisible'}`}>List Products</p>
                            </div>
                        </div>
                    </Collapse>
                </div>

                <div className='px-5'>
                    <Divider className='bg-[gray]' />
                </div>

                <div className={`p-5`}>
                    <div className='flex cursor-pointer pl-2 text-white'>
                        <ShoppingCartIcon />
                        <p className={`font-[600] ml-3 whitespace-nowrap ${toggleSidebar ? 'truncate w-full duration-300' : 'invisible'}`}>Orders</p>
                    </div>
                    <div className={`flex items-center mt-4 py-3 rounded-md px-2 text-[gray] cursor-pointer group hover:bg-[rgb(94,53,177)] hover:border-[rgb(94,53,177)] ${toggleSidebar ? 'visible' : 'invisible'}`} onClick={() => { navigate('/cart') }}>
                        <p className={`ml-3 min-w-0 group-hover:text-white whitespace-nowrap ${toggleSidebar ? 'truncate w-full block duration-300' : 'invisible'}`}>Cart</p>
                    </div>
                </div>
            </div>

            {/* Mobile Device */}
            <div className={`w-[70%] h-full overflow-y-scroll duration-300 bg-[#212121] block md:hidden rounded-tr-2xl rounded-br-2xl absolute z-50 ${!toggleSidebar ? 'left-[0]' : 'left-[-70%]'}`}>
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
