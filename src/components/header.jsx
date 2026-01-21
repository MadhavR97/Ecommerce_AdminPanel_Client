import { useEffect, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchIcon from '@mui/icons-material/Search'
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { Badge, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AiAssistant from './AiAssistant';

function Header({ toggleSidebar, setToggleSidebar }) {

    const API_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate()

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [mobileSearch, setMobileSearch] = useState(false);
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
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className='flex justify-between items-center bg-[#EEF2F6] relative'>
            <div className='w-full flex items-center px-5 py-5 md:py-6 md:relative'>
                <div className={`flex justify-center items-center p-2 rounded-md cursor-pointer duration-500 group z-[1] ${toggleSidebar ? 'rotate-180 md:rotate-0' : 'rotate-0 md:rotate-180'}`} onClick={() => setToggleSidebar(!toggleSidebar)}>
                    <ChevronLeftIcon className={`text-[rgb(94,53,177)]`} />
                </div>

                <div className='w-full absolute left-0 flex justify-center items-center sm:static sm:w-auto hidden md:block'>
                    <div className='border border-[gray] rounded-lg flex items-center ml-2 md:ml-5 h-[40px]'>
                        <div className='w-[40px] h-full flex justify-center items-center'>
                            <SearchIcon className='text-[gray]' />
                        </div>
                        <input type='text' placeholder='Search products...' className='outline-none text-sm md:w-[300px]' onChange={handleChange} />
                    </div>
                </div>

                {searchInput && filteredProducts.length > 0 ? (
                    <div className='hidden md:block h-[250px] overflow-y-scroll shadow shadow-md flex flex-col gap-2 absolute top-20 left-20 p-5 rounded-lg bg-white z-50 overflow-y-scroll'>
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
            </div>

            {isMobile && (
                <div className={`fixed inset-0 w-full h-screen bg-white z-50 transition-all duration-300 ease-in-out ${mobileSearch ? 'translate-x-0' : '-translate-x-full'}`}>
                    {/* Search Header */}
                    <div className="sticky top-0 bg-[rgb(94,53,177)] shadow-sm z-10">
                        <div className="px-4 py-3">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-white font-semibold text-lg">Search Products</h2>
                                <button
                                    onClick={() => setMobileSearch(false)}
                                    className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                                    aria-label="Close search"
                                >
                                    <CloseIcon className="text-white w-6 h-6" />
                                </button>
                            </div>

                            {/* Search Input */}
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <SearchIcon className="text-gray-400 w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-white border-0 focus:ring-2 focus:ring-white/30 focus:outline-none text-gray-800 placeholder-gray-400"
                                    onChange={handleChange}
                                    value={searchInput}
                                    autoFocus
                                />
                                {searchInput && (
                                    <button
                                        onClick={() => setSearchInput('')}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1"
                                    >
                                        <CloseIcon className="text-gray-400 w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="h-[calc(100vh-80px)] overflow-y-auto bg-gray-50">
                        {searchInput ? (
                            <>
                                {filteredProducts.length > 0 ? (
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-sm text-gray-600">
                                                Found <span className="font-semibold">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            {filteredProducts.map(product => (
                                                <div key={product._id} className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 active:bg-gray-50 cursor-pointer"
                                                    onClick={() => {
                                                        navigate(`/single-product/${product._id}`);
                                                        setMobileSearch(false);
                                                    }}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                src={`${API_URL}/${product.image}`}
                                                                alt={product.productName}
                                                                className="w-14 h-14 object-contain rounded-lg bg-gray-100 p-1"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">{product.productName}</p>
                                                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.category}</p>
                                                            <div className="flex items-center justify-between mt-2">
                                                                <span className="text-sm font-bold text-[rgb(94,53,177)]">₹{product.price}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                            No products found
                                        </h3>
                                        <p className="text-gray-500 text-sm max-w-xs">
                                            We couldn't find any products matching "{searchInput}"
                                        </p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                                <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                    <SearchIcon className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    Search Products
                                </h3>
                                <p className="text-gray-500 text-sm max-w-xs">
                                    Type to search for products, brands, or categories
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className='flex items-center mr-3 z-[1]'>
                {/* AI Assistant */}
                <AiAssistant />

                {/* Search for mobile */}
                {isMobile && (
                    <SearchIcon color='action' className='mr-3 cursor-pointer' onClick={() => setMobileSearch(!mobileSearch)} />
                )}

                {/* Notifications */}
                <Badge color="primary" className='cursor-pointer'>
                    <NotificationsIcon color="action" />
                </Badge>
                {/* User Profile */}
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
