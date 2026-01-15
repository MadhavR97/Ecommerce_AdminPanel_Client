import React from 'react'
import DashboardLayout from './dashboardLayout'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import emptyBox from '../assets/Images/emptyBox.png'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { toast, ToastContainer } from 'react-toastify'
import { CircularProgress, useMediaQuery, useTheme } from '@mui/material'

function Cart() {

    const API_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState('');
    const [length, setLength] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user._id) {
            setUserId(user._id);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            fetchCart();
        }
    }, [userId]);

    const fetchCart = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/cart/${userId}`);
            setCartItems(response.data.items);
            setLength(response.data.items.length);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
        finally {
            setLoading(false)
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            await axios.put(`${API_URL}/cart/update`, {
                userId,
                productId,
                quantity,
            });
            fetchCart();
        }
        catch (error) {
            console.error('Error updating quantity:', error);
        }
    }

    const removeCartItem = async (productId) => {
        try {
            const response = await axios.delete(`${API_URL}/cart/delete/${productId}`, { data: { userId } });
            toast.success(response.data.message);
            fetchCart();
        }
        catch (error) {
            console.error('Error removing cart item:', error);
        }
    }

    return (
        <DashboardLayout>
            <div className='bg-white rounded-md shadow w-full p-3 md:p-5 flex justify-between items-center'>
                <h1 className="text-lg md:text-2xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-gray-500 text-sm mt-1">
                    {length} item{length !== 1 ? 's' : ''} in your cart
                </p>
            </div>
            {loading ?
                <div className='w-full h-[66vh] flex justify-center items-center bg-white rounded-md shadow mt-3'>
                    <div className='flex flex-col items-center gap-4'>
                        <CircularProgress
                            size={30}
                            thickness={4}
                            sx={{
                                color: 'rgb(94, 53, 177)'
                            }}
                        />
                        <p className='text-gray-600 font-medium'>Loading products...</p>
                    </div>
                </div>
                : cartItems.length > 0 ?
                    <div>
                        {isMobile
                            ? <div className="w-full shadow mt-3 p-3 rounded-lg bg-white">
                                <div className="overflow-y-scroll max-h-[50vh] border border-[gray] rounded-lg p-3">
                                    {cartItems.map((item, index) => (
                                        <div key={item.product._id} className="p-3 border border-gray-200 rounded-lg mb-2">
                                            <div className="flex gap-2">
                                                <div className='w-20'>
                                                    <div className="w-full h-18 bg-white border border-gray-200 rounded-xl p-2 flex items-center justify-center">
                                                        <img
                                                            src={`${API_URL}/${item.product.image}`}
                                                            alt={item.product.productName}
                                                            className="w-full h-full object-contain rounded"
                                                        />
                                                    </div>
                                                </div>

                                                <div className='w-65'>
                                                    <div className="w-full flex flex-col md:flex-row justify-between gap-4">
                                                        <div className="flex-grow">
                                                            <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.product.productName}</h3>
                                                            <p className="text-gray-600 text-xs mb-2">Brand: <span className="font-medium">{item.product.manufactureName}</span></p>
                                                            <div className="w-full flex justify-between items-center gap-2 mb-4">
                                                                <span className="text-sm font-bold text-gray-900">₹{item.product.price.toLocaleString()} <span className='text-xs text-[gray]'>x {item.quantity}</span></span>
                                                                <div className='flex justify-between items-center gap-2'>
                                                                    <p className="text-xs font-bold text-[green]">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex">
                                                                <div className="flex items-center gap-2">
                                                                    <button
                                                                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                                        disabled={item.quantity <= 1}
                                                                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                                                    >
                                                                        <span className="text-xs">−</span>
                                                                    </button>
                                                                    <span className="w-3 text-center font-medium text-sm">{item.quantity}</span>
                                                                    <button
                                                                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors cursor-pointer"
                                                                    >
                                                                        <span className="text-xs">+</span>
                                                                    </button>
                                                                </div>

                                                                <button
                                                                    onClick={() => { removeCartItem(item.product._id) }}
                                                                    className="ml-3 text-red-500 hover:text-red-700 text-xs font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-3">
                                    <div className="lg:col-span-4">
                                        <div className="bg-white rounded-lg shadow border border-[gray] p-6">
                                            <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

                                            <div className="space-y-4 mb-6">
                                                <div className="flex justify-between text-gray-600">
                                                    <span className='text-sm'>Subtotal</span>
                                                    <span className='text-sm'>₹{cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0).toLocaleString()}</span>
                                                </div>

                                                <div className="flex justify-between text-gray-600">
                                                    <span className='text-sm'>Shipping</span>
                                                    <span className="text-sm text-green-600 font-medium">Free</span>
                                                </div>

                                                <div className="border-t border-gray-200 pt-4">
                                                    <div className="flex justify-between text-lg font-bold">
                                                        <span className='text-sm'>Total</span>
                                                        <span className="text-lg text-gray-900">₹{(cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <button className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                                                <LocalMallIcon />
                                                Proceed to Checkout
                                            </button>

                                            <p className="text-center text-gray-500 text-sm mt-4">Free shipping and returns</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <div className="w-full h-[66vh] shadow mt-3 p-5 rounded-lg bg-white grid grid-cols-6">
                                <div className="col-span-4 overflow-y-scroll">
                                    {cartItems.map((item, index) => (
                                        <div key={item.product._id} className="p-6 border border-gray-200 rounded-lg mb-6">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="flex-shrink-0">
                                                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-center">
                                                        <img
                                                            src={`${API_URL}/${item.product.image}`}
                                                            alt={item.product.productName}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex-grow">
                                                    <div className="flex flex-col md:flex-row justify-between gap-4">
                                                        <div className="flex-grow">
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.product.productName}</h3>
                                                            <p className="text-gray-600 text-sm mb-2">Brand: <span className="font-medium">{item.product.manufactureName}</span></p>
                                                            <div className="flex items-center gap-2 mb-4">
                                                                <span className="text-2xl font-bold text-gray-900">₹{item.product.price.toLocaleString()}</span>
                                                                {item.product.originalPrice && (
                                                                    <span className="text-lg text-gray-400 line-through">₹{item.product.originalPrice.toLocaleString()}</span>
                                                                )}
                                                            </div>

                                                            <div className="flex items-center gap-4">
                                                                <div className="flex items-center gap-2">
                                                                    <button
                                                                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                                        disabled={item.quantity <= 1}
                                                                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                                                    >
                                                                        <span className="text-xl">−</span>
                                                                    </button>
                                                                    <span className="w-12 text-center font-medium text-lg">{item.quantity}</span>
                                                                    <button
                                                                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                                                    >
                                                                        <span className="text-xl">+</span>
                                                                    </button>
                                                                </div>

                                                                <button
                                                                    onClick={() => { removeCartItem(item.product._id) }}
                                                                    className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="md:text-right">
                                                            <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                                                            <p className="text-2xl font-bold text-gray-900">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="col-span-2 p-5">
                                    <div className="lg:col-span-4 mt-8 lg:mt-0">
                                        <div className="bg-white rounded-xl shadow border border-gray-100 p-6 sticky top-6">
                                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                            <div className="space-y-4 mb-6">
                                                <div className="flex justify-between text-gray-600">
                                                    <span>Subtotal</span>
                                                    <span>₹{cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0).toLocaleString()}</span>
                                                </div>

                                                <div className="flex justify-between text-gray-600">
                                                    <span>Shipping</span>
                                                    <span className="text-green-600 font-medium">Free</span>
                                                </div>

                                                <div className="border-t border-gray-200 pt-4">
                                                    <div className="flex justify-between text-lg font-bold">
                                                        <span>Total</span>
                                                        <span className="text-2xl text-gray-900">₹{(cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <button className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                                                <LocalMallIcon />
                                                Proceed to Checkout
                                            </button>

                                            <p className="text-center text-gray-500 text-sm mt-4">Free shipping and returns</p>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                    </div>
                    : <div className='mt-3 w-full h-full bg-white shadow p-5 rounded-md flex justify-center items-center flex-col gap-5'>
                        <img src={emptyBox} alt="Empty Box" className='w-[100px]' />
                        <h1 className='font-bold text-[#212121] text-[1.3rem]'>No items in the cart</h1>
                        <button className='border px-5 py-2 rounded-md cursor-pointer bg-[rgb(94,53,177)] text-white hover:bg-[rgb(237,231,246)] hover:text-[rgb(94,53,177)] hover:border-[rgb(94,53,177)]' onClick={() => navigate('/list-product')}>Add Product</button>
                    </div>}
            <ToastContainer />
        </DashboardLayout>
    )
}

export default Cart
