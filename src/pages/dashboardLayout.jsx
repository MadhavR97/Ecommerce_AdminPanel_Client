import React, { useState } from 'react'
import Sidebar from '../components/sidebar'
import Header from '../components/header'

function DashboardLayout({ children }) {
    const [toggleSidebar, setToggleSidebar] = useState(false)

    return (
        <div className='w-full h-screen flex'>
            <Sidebar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />

            <div className={`flex flex-col ${toggleSidebar ? 'md:w-[70%] lg:w-[80%] xl:w-[85%]' : 'md:w-[90%] lg:w-[95%]'} w-full h-full duration-300`}>
                <Header toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />

                <div className='w-full h-[85vh] p-4 md:p-6 bg-white overflow-y-scroll flex-1'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
