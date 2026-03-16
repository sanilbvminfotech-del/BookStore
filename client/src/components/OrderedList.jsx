import React, { useEffect } from 'react';
import { getUserOrderedWithDetailsAPI } from '../slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { FaRegCalendarAlt, FaReceipt, FaBookOpen } from 'react-icons/fa';

function OrderedList() {
    const dispatch = useDispatch();
    const { orders, isLoading } = useSelector(state => state.order);

    useEffect(() => {
        dispatch(getUserOrderedWithDetailsAPI());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <CircularProgress color="success" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <header className="mb-10">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                    <FaBookOpen className="text-emerald-600" />
                    My <span className="text-emerald-600">Purchase History</span>
                </h1>
                <p className="text-gray-400 font-medium mt-1">Track and manage your ordered library books.</p>
            </header>

            {orders?.length > 0 ? (
                <div className="space-y-8">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">

                            <div className="bg-gray-50/50 px-8 py-5 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">
                                <div className="flex items-center gap-6">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</p>
                                        <p className="text-sm font-mono font-bold text-emerald-600">#{order._id.slice(-8)}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date Placed</p>
                                        <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
                                            <FaRegCalendarAlt size={12} /> {new Date(order.createdAt).toLocaleDateString('en-IN')}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="divide-y divide-gray-50">
                                    {order.items.map((item) => (
                                        <div key={item._id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-6">
                                            <div className="w-16 h-20 bg-gray-50 rounded-xl flex-shrink-0 p-2 border border-gray-100">
                                                <img
                                                    src={`https://bookstore-ybgj.onrender.com/image/bookImage/${item.book?.Image}`}
                                                    alt={item.book?.title}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-gray-900 truncate">{item.book?.title}</h4>
                                                <p className="text-xs text-gray-400 italic">{item.book?.author}</p>
                                                <p className="text-xs font-bold text-gray-500 mt-1">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-black text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase">₹{item.price} each</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="px-8 py-5 bg-emerald-50/30 flex justify-between items-center border-t border-emerald-50">
                                <button className="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700 transition-colors">
                                    <FaReceipt /> View Invoice
                                </button>
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-500 font-bold text-sm">Total Paid</span>
                                    <span className="text-2xl font-black text-emerald-600">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-32 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                    <p className="text-xl font-bold text-gray-400 italic">You haven't ordered any books yet.</p>
                </div>
            )}
        </div>
    );
}

export default OrderedList;
