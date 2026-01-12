import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'
import DashboardLayout from './pages/dashboardLayout'
import PrivateRoute from './components/privateRoute'
import AddProduct from './pages/addProduct'
import ListProducts from './pages/listProducts'
import EditProduct from './pages/editProduct'
import SingleProduct from './pages/singleProduct'
import Cart from './pages/cart'
import ForgotPassword from './pages/forgot-password'
import OtpVerification from './pages/otpVerification'
import ResetPassword from './pages/resetPassword'
import UserManagement from './pages/userManagement'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-management" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
        <Route path="/dashboard-layout" element={<PrivateRoute><DashboardLayout /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
        <Route path="/list-product" element={<PrivateRoute><ListProducts /></PrivateRoute>} />
        <Route path="/edit-product/:id" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
        <Route path="/single-product/:id" element={<PrivateRoute><SingleProduct /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
