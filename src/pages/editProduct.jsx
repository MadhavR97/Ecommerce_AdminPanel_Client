import React, { use, useEffect, useState } from 'react'
import DashboardLayout from './dashboardLayout'
import BackupIcon from '@mui/icons-material/Backup';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import api from '../api/axios';

function EditProduct() {

    const API_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate()

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('')
    const [imagePreview, setImagePreview] = useState(null);
    const [productData, setProductData] = useState({
        productName: '',
        manufactureName: '',
        price: '',
        description: '',
        category: '',
        stock: ''
    })

    const { id } = useParams();

    useEffect(() => {
        fetchProduct();
    }, [])

    const fetchProduct = async () => {
        try {
            const response = await api.get(`/products/${id}`);
            const product = response.data.product;

            setProductData({
                productName: product.productName,
                manufactureName: product.manufactureName,
                price: product.price,
                description: product.description,
                category: product.category,
                stock: product.stock
            });
            setImagePreview(`${API_URL}/${product.image}`);
            setImageName(product.image);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target

        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleChangeFile = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImageName(file.name);
            setImagePreview(URL.createObjectURL(file));
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('productName', productData.productName);
        formData.append('manufactureName', productData.manufactureName);
        formData.append('price', productData.price);
        formData.append('description', productData.description);
        formData.append('category', productData.category);
        formData.append('stock', productData.stock);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await api.put(`/products/${id}`, formData);

            toast.success('Product updated successfully!');
            setTimeout(() => {
                navigate('/list-product');
            }, 2000);
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Error updating product!');
        }
    }


    return (
        <DashboardLayout>
            <form className='w-full h-full overflow-y-scroll' onSubmit={handleSubmit}>
                {isMobile
                    ? <div className='bg-white rounded-md shadow w-full p-3 flex justify-between items-center'>
                        <h1 className='font-bold text-[#212121] text-lg md:text-2xl'>Edit product</h1>
                        <div className='flex'>
                            <div className='border border-[rgb(239,83,80)] bg-[rgb(239,83,80)] group hover:bg-[rgb(252,228,225)] flex justify-center items-center p-2 rounded-md mr-3 cursor-pointer' onClick={() => navigate('/list-product')}>
                                <CloseIcon className='text-white group-hover:text-[rgb(239,83,80)]' />
                            </div>
                            <input type="submit" value='Update' className='border px-5 py-2 rounded-md cursor-pointer bg-[rgb(94,53,177)] text-white hover:bg-[rgb(237,231,246)] hover:text-[rgb(94,53,177)] hover:border-[rgb(94,53,177)]' />
                        </div>
                    </div>
                    : <div className='bg-white rounded-md shadow w-full p-5 flex justify-between items-center'>
                        <h1 className='font-bold text-[#212121] text-[1.3rem]'>Edit product</h1>
                        <div className='flex'>
                            <input type="button" value='Cancel' className='border px-5 py-2 rounded-md cursor-pointer bg-[rgb(239,83,80)] text-white hover:bg-[rgb(252,228,225)] hover:text-[rgb(239,83,80)] mr-3 hover:border-[rgb(239,83,80)]' onClick={() => navigate('/list-product')} />
                            <input type="submit" value='Update Product' className='border px-5 py-2 rounded-md cursor-pointer bg-[rgb(94,53,177)] text-white hover:bg-[rgb(237,231,246)] hover:text-[rgb(94,53,177)] hover:border-[rgb(94,53,177)]' />
                        </div>
                    </div>
                }

                <div className='mt-5 w-full md:flex gap-5'>
                    <div className='md:w-[70%] p-5 bg-white rounded-md shadow'>
                        <p className='text-[gray] font-bold'>Basic information</p>

                        <div className='mt-8'>
                            <label className="block mb-2.5 text-sm font-medium text-[gray]">Product Name</label>
                            <input type="text" rows="4" className="bg-neutral-secondary-medium border-2 border-[rgba(128,128,128,0.5)] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm rounded-md outline-none w-full p-2" name='productName' value={productData.productName} onChange={handleChange} />
                        </div>
                        <div className='mt-5'>
                            <label className="block mb-2.5 text-sm font-medium text-[gray]">Manufacturar Name</label>
                            <input type="text" rows="4" className="bg-neutral-secondary-medium border-2 border-[rgba(128,128,128,0.5)] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm rounded-md outline-none w-full p-2" name='manufactureName' value={productData.manufactureName} onChange={handleChange} />
                        </div>
                        <div className='mt-5'>
                            <label className="block mb-2.5 text-sm font-medium text-[gray]">Product Price</label>
                            <input type="text" rows="4" className="bg-neutral-secondary-medium border-2 border-[rgba(128,128,128,0.5)] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm rounded-md outline-none w-full p-2" name='price' value={productData.price} onChange={handleChange} />
                        </div>
                        <div className='mt-5'>
                            <label className="block mb-2.5 text-sm font-medium text-[gray]">Product Description</label>
                            <textarea rows="4" className="bg-neutral-secondary-medium border-2 border-[rgba(128,128,128,0.5)] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm rounded-md outline-none w-full p-2" name='description' onChange={handleChange} value={productData.description} placeholder="Write product description here..."></textarea>
                        </div>
                    </div>
                    <div className='md:w-[30%] flex flex-col gap-5 mt-5 md:mt-0'>
                        <div className="p-5 bg-white rounded-lg shadow">
                            <p className="text-sm font-semibold text-gray-700 mb-3">Add images</p>

                            <label className="flex flex-col items-center justify-center gap-2 w-full p-6 border-2 border-dashed overflow-hidden border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                                <BackupIcon />
                                <span className="w-full text-sm text-gray-600 truncate text-center">{imageName || 'Click to upload'}</span>

                                <input type="file" accept="image/*" className="hidden" onChange={handleChangeFile} />
                            </label>

                            {imagePreview && (
                                <div className="mt-4">
                                    <img src={imagePreview} alt="preview" className="w-full h-[200px] md:h-[150px] object-contain rounded-md" />
                                </div>
                            )}
                        </div>

                        <div className='p-5 bg-white rounded-md shadow'>
                            <p className='text-[gray] font-bold mb-8'>Type</p>
                            <div className="w-full max-w-sm">
                                <label className="block text-sm font-medium text-gray-700 mb-3">Select category</label>
                                <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 outline-none transition duration-200 ease-in-out hover:border-gray-400" name='category' onChange={handleChange} value={productData.category}>
                                    <option value="">Select...</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="home">Home and Kitchen</option>
                                    <option value="fashion">Fashion and Apparel</option>
                                    <option value="books">Books and Stationery</option>
                                    <option value="health">Health and Fitness</option>
                                </select>
                            </div>
                        </div>
                        <div className='p-5 bg-white rounded-md shadow'>
                            <p className="text-sm font-semibold text-gray-700 mb-4">Stock status</p>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 cursor-pointer">
                                    <input id="stock_in_stock" type="radio" name="stock" className="h-4 w-4 accent-blue-600" checked={productData.stock === 'in_stock'} onChange={handleChange} value="in_stock" />
                                    <label htmlFor="stock_in_stock" className="text-sm text-gray-700 cursor-pointer">In stock</label>
                                </div>

                                <div className="flex items-center gap-3 cursor-pointer">
                                    <input id="stock_unavailable" type="radio" name="stock" className="h-4 w-4 accent-blue-600" checked={productData.stock === 'unavailable'} onChange={handleChange} value="unavailable" />
                                    <label htmlFor="stock_unavailable" className="text-sm text-gray-700 cursor-pointer">Unavailable</label>
                                </div>

                                <div className="flex items-center gap-3 cursor-pointer">
                                    <input id="stock_to_be_announced" type="radio" name="stock" className="h-4 w-4 accent-blue-600" checked={productData.stock === 'to_be_announced'} onChange={handleChange} value="to_be_announced" />
                                    <label htmlFor="stock_to_be_announced" className="text-sm text-gray-700 cursor-pointer">To be announced</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-md shadow w-full p-5 flex justify-between items-center mt-5'>
                    <h1 className='font-[500] text-[#212121] text-[1.2rem]'>You're almost done</h1>
                </div>
            </form>
            <ToastContainer />
        </DashboardLayout >
    )
}

export default EditProduct
