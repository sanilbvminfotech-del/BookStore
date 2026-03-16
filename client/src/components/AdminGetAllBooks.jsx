import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminCanSeeAllBooksAPI, adminCansoftDeleteBookAPI } from "../slices/adminSlice";
import { FaTrash, FaEye, FaBook, FaCheckCircle, FaTimesCircle, FaImage } from "react-icons/fa";

function AdminGetAllBooks() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { books, isLoading } = useSelector(state => state.admin);
    console.log('AdminGetAllBooks');

    const handleBookDetailsShow = (e, bookId) => {
        e.stopPropagation();
        navigate(`/admin-get-all-books/book-details/${bookId}`);
    };

    const handleDisabledBookByAdmin = async (e, bookId, isdeleted) => {
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to ${isdeleted ? 'restore' : 'disable'} this book?`)) {
            const deleteBookStatus = !isdeleted;
            await dispatch(adminCansoftDeleteBookAPI({ bookId, isDeleted: deleteBookStatus }));
        }
    };

    useEffect(() => {
        if (books.length === 0) {
            dispatch(adminCanSeeAllBooksAPI());
        }
    }, [dispatch, books.length]);

    if (isLoading && books.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight text-emerald-600">Inventory Management</h2>
                    <p className="text-gray-500 text-sm font-medium italic">Manage book visibility, pricing, and stock.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-[10px] font-black uppercase text-gray-400">
                    Total Books: {books.length}
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {books.map((book) => (
                    <div
                        key={book._id}
                        className={`group relative bg-white rounded-[2rem] border-2 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:-translate-y-1 ${book.isDeleted ? 'border-red-200 opacity-80' : 'border-transparent shadow-sm shadow-gray-200/50 hover:border-emerald-300'}`}
                    >
                        <div className="relative h-56 overflow-hidden bg-gray-100">
                            {book.bookImage ? (
                                <img src={`http://localhost:8000/image/bookImage/${book.bookImage}`} alt={book.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 "
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                                    <FaImage size={40} />
                                    <span className="text-[10px] font-black mt-2">NO IMAGE</span>
                                </div>
                            )}

                            <div className="absolute top-3 right-3 z-10">
                                {book.isDeleted ? (
                                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                                        <FaTimesCircle /> Hidden
                                    </span>
                                ) : (
                                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                                        <FaCheckCircle /> Active
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="p-6 ">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                                    <FaBook size={18} />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h3 className="font-black text-gray-900 text-base leading-tight truncate">{book.title}</h3>
                                    <p className="text-emerald-600 text-[10px] font-black uppercase tracking-widest truncate">{book.author}</p>
                                </div>
                            </div>

                            <p className="text-gray-400 text-[11px] line-clamp-2 mb-6 h-8 leading-relaxed">
                                {book.description || "No description available for this book."}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-6 border-y border-gray-50 py-4">
                                <div>
                                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-tighter">Price Details</p>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-lg font-black text-gray-900 font-mono">₹{book.price}</span>
                                        {book.oldPrice && <span className="text-[10px] text-gray-400 line-through">₹{book.oldPrice}</span>}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-tighter">Rating</p>
                                    <span className="text-sm font-black text-amber-500 italic">⭐ {book.rating}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-tighter">Category</span>
                                    <span className="text-[10px] font-black text-gray-700 uppercase bg-gray-100 px-2 py-0.5 rounded">{book.category || 'GEN'}</span>
                                </div>
                                <div className="text-right flex flex-col">
                                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-tighter">Inventory</span>
                                    <span className={`text-[10px] font-black ${book.stock > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                                        {book.stock > 0 ? `${book.stock} IN STOCK` : 'OUT OF STOCK'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex border-t border-gray-50 h-14">
                            <button
                                onClick={(e) => handleBookDetailsShow(e, book._id)}
                                className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-400 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-600 transition-all border-r border-gray-50 cursor-pointer"
                            >
                                <FaEye size={14} /> View
                            </button>
                            <button
                                onClick={(e) => handleDisabledBookByAdmin(e, book._id, book.isDeleted)}
                                className={`flex-1 flex items-center justify-center gap-2 cursor-pointer text-[10px] font-black uppercase tracking-widest transition-all ${book.isDeleted ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white'}`}
                            >
                                <FaTrash size={12} /> {book.isDeleted ? 'Enable' : 'Disable'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {books.length === 0 && !isLoading && (
                <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
                    <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-xs">Inventory is Empty</p>
                </div>
            )}
        </div>
    );
}

export default AdminGetAllBooks;
