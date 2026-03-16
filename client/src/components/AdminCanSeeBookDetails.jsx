
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { adminCanSeeSingleBookDetailsAPI, clickOnEditButtonAdmin, onChangeEvent, editTitleAdminAPI, clearEditAdmin } from '../slices/adminSlice';
import { FaArrowLeft, FaStar, FaCalendarAlt, FaPenNib, FaFire, FaMoneyBillWave, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import EditableField from './EditableField';

function AdminCanSeeBookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { bookDetail, isLoading, editingField, inputTitle } = useSelector(state => state.admin);
    console.log('AdminCanSeeBookDetails');

    useEffect(() => {
        if (id) {
            dispatch(adminCanSeeSingleBookDetailsAPI(id));
        }
    }, [dispatch, id]);



    const handleSaveAdmin = (fieldName) => {
        if (!inputTitle.trim()) return alert(`${fieldName} cannot be empty`);
        dispatch(editTitleAdminAPI({ id, fieldName, value: inputTitle }));
        dispatch(clearEditAdmin());
    };

    if (isLoading || !bookDetail) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
            </div>
        );
    }


    const renderFieldForAdmin = (fieldName, value, style) => {
        console.log('renderFieldForAdmin');

        const isEditing = editingField === fieldName

        return (
            <div>
                {isEditing ? (
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full animate-in fade-in slide-in-from-left-2 duration-300">
                        <div className="relative flex-1 w-full">
                            <input
                                type={fieldName === 'stock' ? 'number' : 'text'}
                                value={inputTitle}
                                onChange={(e) => dispatch(onChangeEvent(e.target.value))}
                                className="w-full bg-white border-2 border-emerald-500 rounded-2xl px-5 py-3 text-sm font-mono text-gray-900 outline-none shadow-lg shadow-emerald-50/50"
                                autoFocus
                            />
                            <span className="absolute -top-5 left-4 bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Editing Mode</span>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <button onClick={() => handleSaveAdmin(fieldName)} className="flex-1 sm:flex-none p-4 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all active:scale-90 shadow-md">
                                <FaCheck size={18} />
                            </button>
                            <button onClick={() => dispatch(clearEditAdmin())} className="p-4 bg-gray-100 text-gray-400 rounded-2xl hover:bg-gray-200 transition-all active:scale-90">
                                <FaTimes size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="group flex items-center gap-6 ">
                        <div className={`${style} text-gray-900 tracking-tight leading-tight group-hover:text-emerald-600 transition-colors`}>
                            {value}
                        </div>
                        <button 
                            onClick={() => dispatch(clickOnEditButtonAdmin({ fieldName, value }))}
                            className="opacity-0 group-hover:opacity-100 p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-sm "
                        >
                            <FaEdit size={18} />
                        </button>
                    </div>
                )}
            </div>
        )
    }


    return (
        <div className="p-4 md:p-10 bg-gray-50 min-h-screen font-sans">
            <div className="max-w-6xl mx-auto mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold transition-all group cursor-pointer"
                >
                    <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:bg-emerald-50">
                        <FaArrowLeft size={14} />
                    </div>
                    <span>Back to Inventory</span>
                </button>
            </div>

            <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100">
                <div className="flex flex-col lg:flex-row">

                    <div className="lg:w-2/5 bg-gray-100 p-8 flex justify-center items-center relative">
                        <div className="relative group w-full max-w-sm">
                            <img
                                src={`https://bookstore-ybgj.onrender.com/image/bookImage/${bookDetail.bookImage}`}
                                alt={bookDetail.title}
                                className="w-full rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] object-cover transform transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute -top-4 -right-4 flex flex-col gap-2">
                                <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl border ${bookDetail.isDeleted ? 'bg-red-500 text-white border-red-400' : 'bg-emerald-500 text-white border-emerald-400'}`}>
                                    {bookDetail.isDeleted ? 'Hidden' : 'Active'}
                                </span>
                                {bookDetail.trending && (
                                    <span className="bg-orange-500 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-orange-400 flex items-center gap-2">
                                        <FaFire /> Trending
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-3/5 p-8 md:p-12">
                        <div className="mb-8 border-b border-gray-50 pb-8">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] flex font-black text-emerald-600 uppercase tracking-[0.3em]">
                                    {bookDetail.category} • {bookDetail.genre}
                                    {/* {renderFieldForAdmin('category', bookDetail?.category, "text-xs font-slim")} • {renderFieldForAdmin('genre', bookDetail?.genre, "text-xs font-slim")} */}
                                </span>
                                <span className="text-[10px] font-bold text-gray-300">ID: {bookDetail.bookID}</span>
                            </div>


                            {/* <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-2">
                                <div className="flex items-center gap-2">
                                    {renderFieldForAdmin('category', bookDetail?.category, "text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] w-auto")}
                                    <span className="text-gray-500">•</span>
                                    {renderFieldForAdmin('genre', bookDetail?.genre, "text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] w-auto")}
                                </div>

                                <span className="text-[10px] font-bold text-gray-400 tracking-widest bg-gray-100 px-2 py-1 rounded">
                                    ID: {bookDetail.bookID}
                                </span>
                            </div> */}

                            <div className="min-h-20 flex items-center mb-4">
                                {renderFieldForAdmin('title', bookDetail?.title, "text-4xl font-black ")}
                                {/* <EditableField id={id} dispatch={dispatch} inputTitle={inputTitle} isEditing={editingField === 'title'} fieldName="title" value={bookDetail?.title} style="text-[10px] uppercase tracking-widest text-emerald-600" /> */}
                            </div>

                            <div className="flex items-center gap-2 text-gray-400 font-bold italic">
                                <FaPenNib size={12} className="text-emerald-500" />
                                {renderFieldForAdmin('author', bookDetail?.author, "text-md font-light")}
                                {/* <EditableField id={id} dispatch={dispatch} inputTitle={inputTitle} isEditing={editingField === 'author'} fieldName="author" value={bookDetail?.author} style="text-[10px] uppercase tracking-widest text-emerald-600" /> */}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                            <div className="p-5 bg-emerald-50 rounded-3xl border border-emerald-100">
                                <p className="text-[9px] font-black text-emerald-400 uppercase mb-1 tracking-widest">Pricing</p>
                                <div className="flex items-baseline gap-2 relative">
                                    <div className="text-xl font-black text-emerald-700 font-mono">
                                        <span className=''>₹</span>
                                        {/* {bookDetail.price} */}
                                        {renderFieldForAdmin('price', bookDetail?.price, "text-sm font-black")}
                                    </div>
                                    <div className=' absolute right-0'>
                                        {bookDetail.oldPrice && <p className="text-xs text-emerald-300 line-through">₹{bookDetail.oldPrice}</p>}
                                    </div>
                                    {/* {renderFieldForAdmin('oldPrice', bookDetail?.oldPrice, "text-sm font-black line-through")} */}
                                </div>
                            </div>
                            <div className="p-5 bg-amber-50 rounded-3xl border border-amber-100 text-center">
                                <p className="text-[9px] font-black text-amber-400 uppercase mb-1 tracking-widest">Rating</p>
                                <div className="flex items-center justify-center gap-2">
                                    <FaStar className="text-amber-500" />
                                    <div className="text-2xl font-black text-amber-700">
                                        {/* {bookDetail.rating?.toFixed(1)} */}
                                        {renderFieldForAdmin('rating', bookDetail?.rating, "text-md font-light")}
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 bg-blue-50 rounded-3xl border border-blue-100 text-right">
                                <p className="text-[9px] font-black text-blue-400 uppercase mb-1 tracking-widest">Stock</p>
                                <div className={`text-2xl font-black ${bookDetail.stock < 10 ? "text-red-600" : "text-blue-700"}`}>
                                    {/* {bookDetail.stock} */}
                                    {renderFieldForAdmin('stock', bookDetail?.stock, "text-sm font-slim")}
                                </div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <span className="h-px w-8 bg-gray-200"></span> Book Synopsis
                            </h3>
                            <div className="text-gray-600 leading-relaxed font-medium text-sm">
                                {/* {bookDetail.description} */}
                                {renderFieldForAdmin('description', bookDetail?.description, "text-sm font-slim")}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-gray-400 text-[10px] font-black uppercase">
                                <div className="p-2 bg-gray-50 rounded-lg"><FaCalendarAlt /></div>
                                <span>Published: {new Date(bookDetail.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 text-[10px] font-black uppercase">
                                <div className="p-2 bg-gray-50 rounded-lg"><FaMoneyBillWave /></div>
                                <span>Status: <span className={bookDetail.isDeleted ? "text-red-500" : "text-emerald-500"}>{bookDetail.isDeleted ? "Hidden" : "Live"}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AdminCanSeeBookDetails;