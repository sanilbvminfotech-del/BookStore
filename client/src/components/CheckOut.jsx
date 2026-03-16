import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { FaMapMarkerAlt, FaTruck, FaShieldAlt, FaChevronLeft } from 'react-icons/fa';
import { clearCart, getCartDetailsAPI } from '../slices/cartSlice';
import { API } from '../Axios/axiosCreate';
import { userProfileAPI } from '../slices/userSlice';
import axios from 'axios';
import { createUserOrderDetailAPI } from '../slices/orderSlice';

function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, isLoading } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);


    const items = cart?.items || [];
    const totalItems = cart?.items.reduce((a, b) => a + b.quantity, 0);
    // console.log(totalItems, 'totalItems');

    useEffect(() => {
        dispatch(getCartDetailsAPI());
    }, [dispatch]);


    useEffect(() => {
        dispatch(userProfileAPI()).unwrap()
    }, [dispatch])

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [address, setAddress] = useState({
        phone: '',
        pincode: '',
        city: '',
        state: '',
        addressLine: ''
    });

    const totalAmount = items.reduce((acc, item) => acc + (item.book?.price * item.quantity), 0);




    const handleChange = (e) => {
        const { name, value } = e.target;
        // if (name === 'phone') {
        //     const onlyNumber = value.replace(/[^0-9]/g, '');
        //     setAddress({ ...address, [name]: onlyNumber })
        // } else {
        setAddress({ ...address, [name]: value })
        // }
    }

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        // console.log(address, 'address');

        setIsSubmitting(true);
        try {
            const res = await dispatch(createUserOrderDetailAPI(address));

            if (res.payload.items.length > 0) {
                dispatch(clearCart());
                navigate('/payment');
            }
        } catch (error) {
            alert(error.message || "Failed to place order");
            console.error("Order failed", error);
        } finally {
            setIsSubmitting(false);
        }


        // e.preventDefault();
        // setIsSubmitting(true);
        // try {
        //     const res = await API.post('order/create-order', address)
        //     if (res.data.status) {
        //         dispatch(clearCart());
        //         navigate('/payment');
        //     }
        // } catch (error) {
        //     alert(error.message || "Failed to place order");
        //     console.error("Order failed", error);
        // } finally {
        //     setIsSubmitting(false);
        // }
    }


    if (items.length === 0 && !isSubmitting) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <p className="text-xl font-bold text-gray-400 italic mb-4">Your cart is empty!</p>
                <button onClick={() => navigate('/bookshop')} className="text-emerald-600 font-black border-b-2 border-emerald-600">Back to Shop</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

                <div className="lg:col-span-2 space-y-8">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-emerald-600 font-bold transition-colors">
                        <FaChevronLeft size={12} /> Back
                    </button>

                    <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl"><FaMapMarkerAlt size={20} /></div>
                            <h2 className="text-2xl font-black text-gray-900">Shipping <span className="text-emerald-600">Details</span></h2>
                        </div>

                        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-black text-emerald-600 uppercase ml-4">User Name</label>
                                <input
                                    name='username'
                                    value={address.username || user?.username || ""}
                                    readOnly
                                    type="text"
                                    placeholder="Receiver's Name"
                                    className="w-full bg-gray-100 border-2 border-transparent rounded-2xl px-6 py-3 outline-none font-medium text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-emerald-600 uppercase ml-4">Phone Number</label>
                                <input
                                    required
                                    name="phone"
                                    value={address.phone}
                                    onChange={handleChange}
                                    type="tel"
                                    maxLength="10"
                                    placeholder="10-digit mobile number"
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-6 py-3 outline-none font-medium"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-emerald-600 uppercase ml-4">Pincode</label>
                                <input required name="pincode" value={address.pincode} onChange={handleChange} type="number" className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-6 py-3 outline-none font-medium" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-emerald-600 uppercase ml-4">City</label>
                                <input required name="city" value={address.city} onChange={handleChange} type="text" className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-6 py-3 outline-none font-medium" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-emerald-600 uppercase ml-4">State</label>
                                <input required name="state" value={address.state} onChange={handleChange} type="text" className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-6 py-3 outline-none font-medium" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-black text-emerald-600 uppercase ml-4">Street Address</label>
                                <textarea required name="addressLine" value={address.addressLine} onChange={handleChange} rows="3" className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-6 py-4 outline-none font-medium resize-none"></textarea>
                            </div>

                            <div className="md:col-span-2 pt-4">
                                <button disabled={isSubmitting} type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-[24px] shadow-xl shadow-emerald-100 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:bg-gray-300">
                                    {isSubmitting ? <CircularProgress size={20} color="inherit" /> : <>Place Order Now <FaTruck /></>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm sticky top-24">
                        <h3 className="text-lg font-black text-gray-900 mb-6 border-b pb-4">Order Summary</h3>

                        <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2">
                            {items.map((item) => (
                                <div key={item.book?._id} className="flex justify-between items-center gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-12 bg-gray-50 rounded-lg flex-shrink-0">
                                            <img src={`http://localhost:8000/image/bookImage/${item.book?.Image}`} className="w-full h-full object-contain p-1" alt="" />
                                        </div>
                                        <p className="text-sm font-bold text-gray-700 truncate w-32">{item.book?.title}</p>
                                    </div>
                                    <p className="text-sm font-black text-gray-900">₹{item.book?.price * item.quantity}</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 border-t pt-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Total Items</span>
                                <span className="font-bold">{totalItems}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Shipping</span>
                                <span className="text-emerald-600 font-black">FREE</span>
                            </div>
                            <div className="flex justify-between items-end pt-4">
                                <span className="text-gray-900 font-black text-lg">Total</span>
                                <span className="text-3xl font-black text-emerald-600">₹{totalAmount.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-emerald-50 rounded-2xl flex items-center gap-3">
                            <FaShieldAlt className="text-emerald-600" />
                            <p className="text-[10px] font-black text-emerald-900 uppercase leading-tight">Secure Payment & <br /> Original Library Books</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
