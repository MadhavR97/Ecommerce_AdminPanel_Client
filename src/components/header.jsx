import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import LogoutIcon from '@mui/icons-material/Logout';
import { useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Header({ toggleSidebar, setToggleSidebar }) {

    const API_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate()

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const user = JSON.parse(localStorage.getItem("user"))

    const userInitials = user ? `${user.firstname[0].toUpperCase()}${user.lastname[0].toUpperCase()}` : '';
    const userFullName = user ? `${user.firstname} ${user.lastname}` : 'Guest User';
    const userEmail = user ? user.email : 'guest@example.com';

    useEffect(() => {
        const closeBox = () => {
            if (open) {
                setOpen(false);
            }
        }

        document.addEventListener('click', closeBox);

        return () => {
            document.removeEventListener('click', closeBox);
        }
    })

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/products`)
            setProducts(response.data.products)
        }
        catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    const handleChange = (e) => {
        setSearchInput(e.target.value)

        const filteredProducts = products.filter(product =>
            product.productName.toLowerCase().includes(searchInput.toLowerCase())
        );

        setFilteredProducts(filteredProducts)
    }

    const handleLogout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <div className='flex justify-between items-center bg-white relative'>
            <div className='w-full bg-white flex items-center px-5 py-5 md:py-6 md:relative'>
                <div className='bg-[rgb(237,231,246)] flex justify-center items-center p-2 rounded-md cursor-pointer group hover:bg-[rgb(94,53,177)] z-[1]' onClick={() => setToggleSidebar(!toggleSidebar)}>
                    <MenuIcon className='text-[rgb(94,53,177)] group-hover:text-white' />
                </div>

                <div className='w-full absolute left-0 flex justify-center items-center sm:static sm:w-auto'>
                    <div className='border border-[gray] rounded-lg flex items-center ml-2 md:ml-5 h-[40px]'>
                        <div className='w-[40px] h-full flex justify-center items-center'>
                            <SearchIcon className='text-[gray]' />
                        </div>
                        <input type='text' placeholder='Search products...' className='outline-none text-sm md:w-[300px]' onChange={handleChange} />
                    </div>
                </div>

                {isMobile
                    ? <>
                        {searchInput && filteredProducts.length > 0 ? (
                            <div className='w-full p-5 absolute top-20 left-0 z-[1]'>
                                <div className='shadow shadow-md w-full max-h-[70vh] p-3 rounded-lg bg-white overflow-y-scroll flex flex-col gap-2'>
                                    {filteredProducts.map(product => (
                                        <div key={product._id} className='flex items-center p-2 border-b border-[gray] rounded-lg hover:bg-gray-100 cursor-pointer' onClick={() => navigate(`/single-product/${product._id}`)}>
                                            <img src={`${API_URL}/${product.image}`} alt={product.productName} className='w-10 h-10 object-contain rounded-md mr-3' />
                                            <div>
                                                <p className='text-sm font-medium text-gray-800'>{product.productName}</p>
                                                <p className='text-xs text-gray-500'>₹{product.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : searchInput && filteredProducts.length === 0 ? (
                            <div className='absolute top-20 left-0 w-full flex justify-center items-center p-5'>
                                <div className="shadow shadow-md shadow-[gray] w-[341px] h-[50px] text-gray-500 bg-white z-50 rounded-lg text-center flex justify-center items-center">No products found</div>
                            </div>
                        ) : null}</>
                    : <>
                        {searchInput && filteredProducts.length > 0 ? (
                            <div className='h-[250px] overflow-y-scroll shadow shadow-md flex flex-col gap-2 absolute top-20 left-20 p-5 rounded-lg bg-white z-50 overflow-y-scroll'>
                                {filteredProducts.map(product => (
                                    <div key={product._id} className='flex items-center p-2 border-b border-[gray] rounded-lg border-gray-200 hover:bg-gray-100 cursor-pointer' onClick={() => navigate(`/single-product/${product._id}`)}>
                                        <img src={`${API_URL}/${product.image}`} alt={product.productName} className='w-10 h-10 object-cover rounded-md mr-3' />
                                        <div>
                                            <p className='text-sm font-medium text-gray-800'>{product.productName}</p>
                                            <p className='text-xs text-gray-500'>₹{product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : searchInput && filteredProducts.length === 0 ? (
                            <div className='shadow shadow-md absolute top-20 left-20 px-25 py-3 rounded-lg bg-white z-50'>
                                <p className="text-gray-500 bg-white z-50 rounded-lg text-center flex justify-center items-center">No products found</p>
                            </div>
                        ) : null}
                    </>}
            </div>

            <div className='flex items-center mr-3 z-[1]'>
                <div className='ml-5 w-13 h-13 flex justify-center rounded-full items-center cursor-pointer bg-[#80808029]' onClick={(e) => { e.stopPropagation(); setOpen(!open) }}>
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{userInitials}</span>
                    </div>
                </div>
            </div>

            {
                open && (
                    <Box className="py-2 absolute top-20 right-4 bg-white z-50 rounded-xl shadow border border-gray-100 min-w-[280px]" onClick={(e) => e.stopPropagation()}>
                        <div className="px-5 py-4 border-b border-gray-100">
                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">{userInitials}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[#212121] text-base font-semibold text-gray-900 truncate">{userFullName}</p>
                                    <p className="text-sm text-gray-500 truncate mt-0.5">{userEmail}</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-2 pb-2">
                            <div
                                className="flex items-center px-5 py-3 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-all duration-200 group rounded-lg mx-2"
                                onClick={handleLogout}
                            >
                                <LogoutIcon className="mr-3 group-hover:scale-105 transition-transform" fontSize="small" />
                                <span className="font-semibold">Logout</span>
                            </div>
                        </div>
                    </Box>
                )
            }
        </div>
    )
}

export default Header
