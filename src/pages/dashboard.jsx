import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import DashboardLayout from './dashboardLayout'
import PaymentsIcon from '@mui/icons-material/Payments';


function Dashboard() {

    const username = JSON.parse(localStorage.getItem("user"))?.firstname

    return (
        <DashboardLayout>
            <div className='rounded-2xl p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
                            Welcome back, <span className='text-indigo-600'>{username}</span> 👋
                        </h1>
                        <p className='text-gray-600 mt-2'>
                            Here's what's happening with your dashboard today.
                        </p>
                    </div>
                    <div className='mt-4 md:mt-0'>
                        <button className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium'>
                            View Reports
                        </button>
                    </div>
                </div>
            </div>

            <div className='flex gap-5 mt-6 flex-col md:flex-row'>
                <div className='md:w-[60%] grid grid-cols-2 gap-5 justify-start items-start'>
                    <div className='p-5 rounded-xl shadow bg-[#5E35B1] flex flex-col items-start relative overflow-hidden'>
                        <div className='bg-[#522EA8] p-15 rounded-full absolute right-[-20px] top-[-60px] md:right-[5px] md:top-[-50px]'></div>
                        <div className='bg-[#4527A0] p-15 rounded-full absolute right-[-60px] top-[-30px] md:right-[-40px] md:top-[-30px]'></div>
                        <div className='bg-[#4527A0] p-2 rounded-md mb-5 cursor-pointer duration-100 hover:bg-[#5E35B1]'>
                            <PersonIcon className='text-white text-3xl' />
                        </div>
                        <p className='text-white text-sm'>Total Users</p>
                        <h2 className='text-white text-3xl font-bold mt-2'>1,245</h2>
                    </div>

                    <div className='p-5 rounded-xl shadow bg-[#1E88E5] flex flex-col items-start relative overflow-hidden'>
                        <div className='bg-[#1A77D2] p-15 rounded-full absolute right-[-20px] top-[-60px] md:right-[5px] md:top-[-50px]'></div>
                        <div className='bg-[#1565C0] p-15 rounded-full absolute right-[-60px] top-[-30px] md:right-[-40px] md:top-[-30px]'></div>
                        <div className='bg-[#1565C0] p-2 rounded-md mb-5 cursor-pointer duration-100 hover:bg-[#1E88E5]'>
                            <AccessTimeFilledIcon className='text-white text-3xl' />
                        </div>
                        <p className='text-white text-sm'>Active Sessions</p>
                        <h2 className='text-white text-3xl font-bold mt-2'>312</h2>
                    </div>
                </div>

                <div className='md:w-[40%] flex flex-col gap-3'>
                    <div className='rounded-xl bg-[#1565C0] relative overflow-hidden flex p-4'>
                        <div className='bg-[#97c0e5] p-15 rounded-full absolute right-[-40px] top-[-70px]'></div>
                        <div className='bg-[#61ABEA] p-15 rounded-full absolute right-[-40px] top-[30px]'></div>
                        <div className='bg-[#1E88E5] p-2 rounded-md cursor-pointer duration-100 hover:bg-[#1E88E5]'>
                            <PendingActionsIcon className='text-white text-3xl' />
                        </div>
                        <div className='ml-5'>
                            <p className='text-white text-sm'>Pending Requests</p>
                            <h2 className='text-white font-bold'>18</h2>
                        </div>
                    </div>

                    <div className='rounded-xl bg-white relative overflow-hidden flex p-4'>
                        <div className='bg-[#F5EED8] p-15 rounded-full absolute right-[-40px] top-[-70px]'></div>
                        <div className='bg-[#f5be1c6b] p-15 rounded-full absolute right-[-40px] top-[30px]'></div>
                        <div className='bg-[#F5EED8] p-2 rounded-md cursor-pointer duration-100 hover:bg-[#1E88E5]'>
                            <PaymentsIcon className='text-[#F5BE1C] text-3xl' />
                        </div>
                        <div className='ml-5'>
                            <p className='text-sm'>Total Earning</p>
                            <h2 className='text-[gray] font-bold'>₹84,500</h2>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Dashboard
