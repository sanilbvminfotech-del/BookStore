import React, { useEffect, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    adminCanSeeSingleBookDetailsAPI, clickOnEditButtonAdmin,
    onChangeEvent, clearEditAdmin, editBookDetailAdminAPI
} from '../slices/adminSlice';
import { FaArrowLeft, FaPenNib, FaStar, FaBox, FaEdit, FaCheck, FaTimes, FaFire, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";


const EditableField = memo(({ fieldName, value, style, isEditing, dispatch, inputTitle, id }) => {
    console.log(`Rendering Field: ${fieldName}`); 

    const handleSave = () => {
        dispatch(editBookDetailAdminAPI({ id, fieldName, value: inputTitle }));
    };

    return (
        <div className="w-full">
            {isEditing ? (
                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="relative flex-1">
                        <input
                            type={fieldName === 'price' || fieldName === 'stock' ? 'number' : 'text'}
                            value={inputTitle}
                            onChange={(e) => dispatch(onChangeEvent(e.target.value))}
                            className={`w-full bg-white border-2 border-emerald-500 rounded-xl px-4 py-2 outline-none shadow-lg shadow-emerald-100/50 ${style} font-black text-gray-900`}
                            autoFocus
                        />
                        <span className="absolute -top-2.5 left-4 bg-emerald-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest z-10">
                            Editing {fieldName}
                        </span>
                    </div>
                    <div className="flex gap-1">
                        <button onClick={handleSave} className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 active:scale-90 transition-all shadow-md"><FaCheck size={14} /></button>
                        <button onClick={() => dispatch(clearEditAdmin())} className="p-3 bg-gray-100 text-gray-400 rounded-xl hover:bg-gray-200 active:scale-90 transition-all"><FaTimes size={14} /></button>
                    </div>
                </div>
            ) : (
                <div className="group flex items-center gap-3">
                    <div className={`${style} text-gray-900 tracking-tight leading-tight group-hover:text-emerald-600 transition-colors duration-300 font-black`}>
                        {fieldName === 'price' ? `₹${value}` : value}
                    </div>
                    <button
                        onClick={() => dispatch(clickOnEditButtonAdmin({ fieldName, value }))}
                        className="opacity-0 group-hover:opacity-100 p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 cursor-pointer shadow-sm"
                    >
                        <FaEdit size={12} />
                    </button>
                </div>
            )}
        </div>
    );
});

// --- MAIN PAGE COMPONENT ---
function AdminCanSeeBookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { bookDetail, isLoading, editingField, inputTitle } = useSelector(state => state.admin);

    useEffect(() => {
        if (id) dispatch(adminCanSeeSingleBookDetailsAPI(id));
    }, [dispatch, id]);

    if (isLoading || !bookDetail) {
        return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div></div>;
    }

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-emerald-600 font-bold transition-all group">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:bg-emerald-50"><FaArrowLeft size={14} /></div>
                <span>Back to Inventory</span>
            </button>

            <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="lg:w-2/5 bg-gray-50 p-10 flex justify-center items-center relative border-r">
                    <div className="relative group">
                        <img src={`http://localhost:8000/image/bookImage/${bookDetail.bookImage}`} className="w-full max-w-sm rounded-3xl shadow-2xl transition-transform group-hover:scale-[1.02]" alt="Cover" />
                        <div className="absolute -top-3 -right-3 flex flex-col gap-2">
                            <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg ${bookDetail.isDeleted ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>{bookDetail.isDeleted ? 'Hidden' : 'Active'}</span>
                            {bookDetail.trending && <span className="bg-amber-500 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2"><FaFire /> Trending</span>}
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="lg:w-3/5 p-10">
                    <div className="mb-8 border-b pb-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <EditableField id={id} dispatch={dispatch} inputTitle={inputTitle} isEditing={editingField === 'category'} fieldName="category" value={bookDetail.category} style="text-[10px] uppercase tracking-widest text-emerald-600" />
                                <span className="text-gray-300">•</span>
                                <EditableField id={id} dispatch={dispatch} inputTitle={inputTitle} isEditing={editingField === 'genre'} fieldName="genre" value={bookDetail.genre} style="text-[10px] uppercase tracking-widest text-emerald-600" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-300 bg-gray-50 px-2 py-1 rounded">ID: {bookDetail.bookID}</span>
                        </div>

                        <EditableField id={id} dispatch={dispatch} inputTitle={inputTitle} isEditing={editingField === 'title'} fieldName="title" value={bookDetail.title} style="text-4xl" />

                        <div className="flex items-center gap-2 mt-4 italic text-gray-400 font-bold">
                            <FaPenNib className="text-emerald-500" />
                            <EditableField id={id} dispatch={dispatch} inputTitle={inputTitle} isEditing={editingField === 'author'} fieldName="author" value={bookDetail.author} style="text-md" />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-10">
                        <div className="p-5 bg-emerald-50 rounded-3xl border border-emerald-100">
                            <EditableField id={id} dispatch={dispatch} inputTitle={inputTitle} isEditing={editingField === 'price'} fieldName="price" value={bookDetail.price} style="text-xl" />
                        </div>
                        <div className="p-5 bg-amber-50 rounded-3xl border border-amber-100 text-center">
                            <div className="flex justify-center items-center gap-2"><FaStar className="text-amber-500" /><EditableField id={id} dispatch={dispatch} inputTitle={inputTitle} isEditing={editingField === 'rating'} fieldName="rating" value={bookDetail.rating} style="text-xl" /></div>
                        </div>
                        <div className="p-5 bg-sky-50 rounded-3xl border border-sky-100 text-right">
                            <div className="flex justify-end items-center gap-2"><FaBox className="text-sky-400" /><EditableField id={id} dispatch={dispatch} inputTitle={inputTitle} isEditing={editingField === 'stock'} fieldName="stock" value={bookDetail.stock} style="text-xl" /></div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><span className="h-px w-6 bg-emerald-200"></span> Synopsis</h3>
                        <EditableField id={id} dispatch={dispatch} inputTitle={inputTitle} isEditing={editingField === 'description'} fieldName="description" value={bookDetail.description} style="text-sm font-medium leading-relaxed" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminCanSeeBookDetails;
