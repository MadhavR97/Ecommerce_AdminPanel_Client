import React, { useEffect, useState } from 'react'
import DashboardLayout from './dashboardLayout'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import emptyBox from '../assets/Images/emptyBox.png'

function ListProducts() {

    const API_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [length, setLength] = useState(0);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/products`);
                setProducts(response.data.products);
                setLength(response.data.products.length);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [])

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        e.preventDefault();

        try {
            await axios.delete(`${API_URL}/products/${id}`);
            setProducts(products.filter((product) => product._id !== id));
            setLength(length - 1);
            toast.success('Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <DashboardLayout>
            {length > 0
                ? <div>
                    <div className='bg-white rounded-md shadow w-full p-3 md:p-5 flex justify-between items-center'>
                        <h1 className='font-bold text-[#212121] text-lg md:text-2xl'>Products</h1>
                        <p className='font-bold text-[gray] text-sm'>( {length} {length > 1 ? 'products' : 'product'} )</p>
                    </div>

                    <div className='mt-3 rounded-lg shadow w-full h-[69vh] md:h-[66vh] overflow-y-scroll p-5 bg-white flex flex-col gap-5'>
                        {products.length > 0 && products.map((product, index) => (
                            <Link to={`/single-product/${product._id}`} className={`w-full`} key={index}>
                                <div className="bg-white rounded-xl shadow border border-gray-200 hover:shadow transition-all duration-300 w-full p-5" key={index}>
                                    <div className="flex flex-col md:flex-row gap-5">
                                        <div className="md:w-1/4">
                                            <div className="w-full h-48 md:h-40 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-4">
                                                <img
                                                    src={`${API_URL}/${product.image}`}
                                                    alt={product.productName}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:w-3/4">
                                            <div className="flex flex-col h-full">
                                                <div className="mb-3">
                                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                                                {product.productName}
                                                            </h3>
                                                            <p className="text-sm text-gray-500">
                                                                {product.manufactureName}
                                                            </p>
                                                        </div>

                                                        <div className="text-right">
                                                            <p className="text-xl font-bold text-gray-900 text-left">
                                                                ₹{product.price}
                                                            </p>
                                                        </div>
                                                    </div>
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

                                                <div className="mb-4 flex-1">
                                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                                        {product.description}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-100">
                                                    <div>
                                                        {product.stock === 'in_stock' ? (
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                                <span className="text-sm font-medium text-green-600">In Stock</span>
                                                            </div>
                                                        ) : product.stock === 'unavailable' ? (
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                                <span className="text-sm font-medium text-red-600">Unavailable</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                                                <span className="text-sm font-medium text-amber-600">To be announced</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {user.roll == 'admin' && (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    e.preventDefault();
                                                                    navigate(`/edit-product/${product._id}`)
                                                                }}
                                                                className="px-4 py-2 bg-white hover:bg-blue-50 text-blue-600 text-sm font-medium rounded-lg border border-blue-200 transition-colors duration-200 flex items-center gap-2 cursor-pointer hover:border-blue-300"
                                                            >
                                                                <EditIcon className="w-4 h-4" />
                                                                Edit
                                                            </button>

                                                            <button
                                                                onClick={(e) => handleDelete(product._id, e)}
                                                                className="px-4 py-2 bg-white hover:bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-200 transition-colors duration-200 flex items-center gap-2 cursor-pointer hover:border-red-300"
                                                            >
                                                                <DeleteIcon className="w-4 h-4" />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                : <div className='w-full h-full bg-white shadow p-5 rounded-md flex justify-center items-center flex-col gap-5'>
                    <img src={emptyBox} alt="Empty Box" className='w-[100px]' />
                    <h1 className='font-bold text-[#212121] text-[1.3rem]'>No products found</h1>
                    <button className='border px-5 py-2 rounded-md cursor-pointer bg-[rgb(94,53,177)] text-white hover:bg-[rgb(237,231,246)] hover:text-[rgb(94,53,177)] hover:border-[rgb(94,53,177)]' onClick={() => navigate('/add-product')}>Add Product</button>
                </div>}
            <ToastContainer />
        </DashboardLayout>
    )
}

export default ListProducts