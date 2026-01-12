import React, { useState } from 'react'
import Sidebar from '../components/sidebar'
import Header from '../components/header'

function DashboardLayout({ children }) {
    const [toggleSidebar, setToggleSidebar] = useState(true)

    return (
        <div className='w-full h-screen flex'>
            <Sidebar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />

            <div className={`${toggleSidebar ? 'md:w-[85%]' : 'md:w-full'} w-full h-full duration-300`}>
                <Header toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />

                <div className='w-full h-[85vh] p-4 md:p-6 bg-[#EEF2F6] rounded-lg overflow-y-scroll'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
