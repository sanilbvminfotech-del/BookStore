import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { FaBoxOpen, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getCartDetailsAPI } from '../slices/cartSlice';

function Orders() {
  const dispatch = useDispatch();
  const { cart, isLoading } = useSelector((state) => state.cart);
  const items = cart?.items || [];
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  useEffect(() => {
    dispatch(getCartDetailsAPI());
  }, [dispatch]);


  const handleDelayedFunction = (e) => {
    e.preventDefault();
    setLoad(true)
    setTimeout(() => {
      // setLoad(false)
      navigate('/dashboard/check-out')
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
          <FaBoxOpen size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Your <span className="text-emerald-600">Orders</span></h1>
          <p className="text-sm text-gray-400 font-medium">Review and track your library additions.</p>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.book?._id}
              className="bg-white rounded-3xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all group mb-5 overflow-y-auto"
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-24 h-32 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 p-2 border border-gray-50 shadow-inner">
                  <img
                    src={`http://localhost:8000/image/bookImage/${item.book?.Image}`}
                    alt={item.book?.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:justify-between items-center mb-2">
                    <h3 className="text-lg font-black text-gray-800 tracking-tight">{item.book?.title}</h3>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-full tracking-widest">
                      Pending
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 italic mb-4 font-medium">{item.book?.author}</p>

                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <FaCalendarAlt className="text-emerald-500" />
                      <span className="font-bold">Ordered: {new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="text-gray-500">
                      Qty: <span className="font-black text-gray-800">{item.quantity}</span>
                    </div>
                    <div className="text-emerald-600 font-black text-lg">
                      ₹{(item.book?.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
          <div className="text-gray-300 mb-4 flex justify-center">
            <FaBoxOpen size={64} />
          </div>
          <p className="text-xl font-bold text-gray-400 italic">No orders found in your history.</p>
          <button className="mt-6 text-emerald-600 font-black border-b-2 border-emerald-600 hover:text-emerald-700 transition-colors">
            Start Shopping →
          </button>
        </div>
      )}

      <div className="mt-10 flex justify-end">
        <Link
          onClick={handleDelayedFunction}
          className='bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-10 rounded-2xl shadow-lg shadow-emerald-100 transition-all flex items-center gap-3 active:scale-95 text-sm uppercase tracking-widest'
        >
          {!load ? "Continue to Checkout" : "Loading..."} <FaChevronRight size={12} />
        </Link>
      </div>
    </div>
  );
}

export default Orders;
