import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../slices/openSlice";
import { removeItemFromCartAPI, clearAllItemsFromCartAPI } from "../slices/cartSlice";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function CartSidebar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector(state => state.cart?.cart?.items || []);
    const sidebar = useSelector(state => state.open.sidebar);

    const isAuthenticated = !!sessionStorage.getItem("accessToken");

    const [loading, setLoading] = useState(false);

    const totalAmount = cartItems.reduce((a, b) => a + (b.book?.price * b.quantity), 0);

    const totalItems = cartItems.reduce((a, b) => a + b.quantity, 0);

    const handleRemove = (id) => {
        if (confirm("Remove item from cart?")) {
            dispatch(removeItemFromCartAPI(id));
        }
    };

    const handleClearCart = () => {
        if (confirm("Clear cart?")) {
            dispatch(clearAllItemsFromCartAPI());
        }
    };

    const handleCheckout = async () => {
        setLoading(true);
        dispatch(closeSidebar());
        await new Promise(resolve => setTimeout(resolve, 800));
        navigate("/dashboard/orders");
        setLoading(false);
    };

    return (
        <div
            className={`fixed right-0 top-16 h-11/12 bg-white w-96  shadow-2xl z-50
      transform transition-transform duration-500
      ${sidebar ? "translate-x-0" : "translate-x-full"}`}
        >
            <div className="p-6 pt-5 flex flex-col h-full">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">My Cart</h2>

                    <button
                        onClick={() => dispatch(closeSidebar())}
                        className="text-xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-auto">

                    {!isAuthenticated && (
                        <p className="text-gray-400 italic">
                            Login to see your cart
                        </p>
                    )}

                    {isAuthenticated && cartItems.length === 0 && (
                        <p className="text-gray-400 italic">
                            Your cart is empty
                        </p>
                    )}

                    {cartItems.map((item) => (
                        <div key={item.book?._id} className="flex gap-4 mb-4">

                            <img
                                src={`https://bookstore-ybgj.onrender.com/image/bookImage/${item.book?.bookImage}`}
                                className="w-16 h-20 object-contain"
                            />

                            <div className="flex-1">
                                <p className="font-semibold">{item.book?.title}</p>

                                <p className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                </p>

                                <span className="text-emerald-600 font-bold">
                                    ₹{item.book?.price}
                                </span>
                            </div>

                            <button
                                onClick={() => handleRemove(item.book._id)}
                                className="text-red-500"
                            >
                                <FaTrash />
                            </button>

                        </div>
                    ))}
                </div>

                {cartItems.length > 0 && (
                    <div className="border-t pt-4">

                        <p className="flex justify-between mb-3">
                            <span>Total Items</span>
                            <span>{totalItems}</span>
                        </p>

                        <p className="flex justify-between mb-4 font-bold">
                            <span>Total</span>
                            <span>₹{totalAmount}</span>
                        </p>

                        <button
                            onClick={handleClearCart}
                            className="w-full bg-red-500 text-white py-2 rounded-lg mb-2"
                        >
                            Clear Cart
                        </button>

                        <button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="w-full bg-emerald-600 text-white py-3 rounded-lg flex justify-center items-center gap-2 disabled:bg-gray-400"
                        >
                            {loading ? (
                                <>
                                    <CircularProgress size={18} color="inherit" />
                                    Processing...
                                </>
                            ) : (
                                "Checkout"
                            )}
                        </button>

                    </div>
                )}

            </div>
        </div>
    );
}

export default CartSidebar;