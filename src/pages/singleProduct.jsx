import React, { useEffect, useState } from 'react'
import DashboardLayout from './dashboardLayout'
import { useNavigate, useParams } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

function SingleProduct() {

    const API_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate()
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [userId, setUserId] = useState('')

    useEffect(() => {
        const storedUserId = JSON.parse(localStorage.getItem('user'))._id;
        setUserId(storedUserId)
    }, []);

    useEffect(() => {
        fetchProduct();
    }, [])

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${API_URL}/products/${id}`)
            setProduct(response.data.product)
        } catch (error) {
            console.error('Error fetching product:', error)
        }
    }

    const handleAddToCart = async () => {
        try {
            const response = await axios.post(`${API_URL}/cart`, {
                userId,
                productId: product._id,
                quantity: 1,
            });

            toast.success(response.data.message);

        } catch (error) {
            toast.error(error.response?.data.message);
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-6">
                <button onClick={() => navigate('/list-product')} className="flex items-center gap-1 text-gray-600 hover:text-black cursor-pointer">
                    <ChevronLeftIcon fontSize="small" />
                    Back to products
                </button>
            </div>

            <div className="bg-white rounded-lg p-5 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="flex justify-center">
                        <div className="w-full h-[200px] md:h-auto max-w-md border rounded-lg p-6">
                            <img
                                src={`${API_URL}/${product.image}`}
                                alt={product.productName}
                                className="w-full h-full md:h-96 object-contain"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                {product.productName}
                            </h1>
                            <p className="text-sm text-gray-500 mt-3 font-bold">
                                Brand: <span className="text-gray-700 font-bold">{product.manufactureName}</span>
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold text-gray-900">
                                ₹{product.price}
                            </span>
                            <span className="text-sm text-green-600">
                                {product.stock === 'In stock' && 'In Stock'}
                            </span>
                        </div>

                        <div className="mb-3">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${product.category === 'electronics' ? 'bg-blue-100 text-blue-700' :
                                product.category === 'home' ? 'bg-amber-100 text-amber-700' :
                                    product.category === 'fashion' ? 'bg-pink-100 text-pink-700' :
                                        product.category === 'books' ? 'bg-green-100 text-green-700' :
                                            product.category === 'health' ? 'bg-emerald-100 text-emerald-700' :
                                                'bg-gray-100 text-gray-700'
                                }`}>
                                {product.category === 'electronics' ? 'Electronics' :
                                    product.category === 'home' ? 'Home & Kitchen' :
                                        product.category === 'fashion' ? 'Fashion' :
                                            product.category === 'books' ? 'Books & Stationery' :
                                                product.category === 'health' ? 'Health & Fitness' : 'Other'}
                            </span>
                        </div>

                        <p className="text-gray-700 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex gap-4">
                            <button
                                disabled={product.stock !== 'in_stock'}
                                className={`flex items-center justify-center gap-2 w-full lg:w-auto px-8 py-3 rounded-md font-medium transition
                                    ${product.stock === 'in_stock'
                                        ? 'bg-yellow-400 hover:bg-yellow-500 text-black cursor-pointer'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }
                                `}
                                onClick={handleAddToCart}
                            >
                                <ShoppingCartIcon />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </DashboardLayout>
    )
}

export default SingleProduct
