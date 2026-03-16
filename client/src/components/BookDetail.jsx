import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedBookDetailsAPI } from '../slices/bookSlice';
import { incrementCartItemAPI, decrementCartItemAPI, getCartDetailsAPI } from '../slices/cartSlice';
import { CircularProgress, Button, Rating, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const qtyOptions = [...Array(10)].map((_, i) => i + 1);

function BookDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isSingle, isLoading, isError } = useSelector(state => state.book);
    const cartItems = useSelector(state => state.cart?.cart?.items || []);
    const buttonLoading = useSelector(state => state.cart.isLoading);



    const [selectedQty, setSelectedQty] = useState(1);
    // console.log(selectedQty, 'selectedQty');

    const itemInCart = cartItems.find(item => (item.book?._id || item.book) === id);
    const currentQty = itemInCart ? itemInCart?.quantity : 0;
    console.log(currentQty, 'currentQty-currentQty');


    useEffect(() => {
        if (id) {
            dispatch(getSelectedBookDetailsAPI(id));
            dispatch(getCartDetailsAPI());
        }
    }, [dispatch, id]);


    const handleAddToCart = () => {
        dispatch(incrementCartItemAPI({ id: id, addLot: selectedQty }));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress color="success" />
            </div>
        );
    }

    if (isError || !isSingle) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-gray-500 font-medium text-lg">Book details not found.</p>
                <Button onClick={() => navigate('/bookshop')} variant="outlined" color="success">
                    Back to Shop
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors mb-8 font-bold text-sm uppercase tracking-widest"
                >
                    <ArrowBackIcon fontSize="small" /> Back
                </button>

                <div className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-gray-100 grid grid-cols-1 md:grid-cols-2">

                    <div className="bg-slate-50 p-12 flex items-center justify-center border-r border-gray-100">
                        <img
                            src={`http://localhost:8000/image/bookImage/${isSingle?.bookImage}`}
                            alt={isSingle.title}
                            className="max-h-[500px] w-auto shadow-2xl rounded-lg transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>


                    <div className="p-8 md:p-16 flex flex-col justify-center">
                        <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.2em] mb-2">
                            {isSingle.category || isSingle.genres}
                        </span>

                        <h1 className="text-4xl font-black text-gray-900 leading-tight mb-2">
                            {isSingle.title}
                        </h1>
                        <p className="text-xl text-gray-400 font-medium mb-4 italic">By {isSingle.author}</p>

                        <div className="flex items-center gap-4 mb-6">
                            <Rating value={Number(isSingle.rating) || 0} precision={0.5} readOnly />
                            <span className="text-sm text-gray-400 font-bold">({isSingle.rating} / 5.0)</span>
                        </div>

                        <Divider className="mb-8" />

                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                            {isSingle.description}
                        </p>

                        <div className="flex items-center gap-4 mb-10">
                            <span className="text-5xl font-black text-gray-900">₹{isSingle.price}</span>
                            {isSingle.oldPrice && (
                                <span className="text-2xl text-gray-300 line-through">₹{isSingle.oldPrice}</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Select Quantity</label>
                                <select
                                    name="addLot"
                                    value={currentQty > 0 ? currentQty : selectedQty}
                                    onChange={(e) => setSelectedQty(Number(e.target.value))}
                                    disabled={currentQty > 0}
                                    className="w-32 p-3 bg-gray-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none font-bold text-gray-700 transition-all"
                                >
                                    {qtyOptions.map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-4">
                                {currentQty === 0 ? (
                                    <button
                                        disabled={buttonLoading || isSingle.stock === 0}
                                        onClick={handleAddToCart}
                                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-black py-5 rounded-2xl shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 transition-all active:scale-95"
                                    >
                                        {buttonLoading ? <CircularProgress size={20} color="inherit" /> : <><ShoppingCartIcon /> Add to Cart</>}
                                    </button>
                                ) : (
                                    <div className="flex items-center bg-emerald-50 rounded-2xl border-2 border-emerald-100 overflow-hidden">
                                        <button
                                            onClick={() => dispatch(decrementCartItemAPI(id))}
                                            className="px-6 py-4 text-emerald-600 font-black hover:bg-emerald-100 transition-colors"
                                        >
                                            −
                                        </button>
                                        <span className="px-6 font-black text-emerald-900 text-xl">{currentQty}</span>
                                        <button
                                            onClick={() => dispatch(incrementCartItemAPI({ id: id }))}
                                            className="px-6 py-4 text-emerald-600 font-black hover:bg-emerald-100 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                )}

                                <div className={`px-6 py-4 rounded-2xl border-2 font-black text-xs uppercase tracking-widest ${isSingle.stock > 0 ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
                                    {isSingle.stock > 0 ? `In Stock: ${isSingle.stock}` : 'Out of Stock'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetail;
