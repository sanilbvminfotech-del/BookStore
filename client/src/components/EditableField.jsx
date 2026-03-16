import React from "react";
import { clearEditAdmin, clickOnEditButtonAdmin, editTitleAdminAPI, onChangeEvent } from "../slices/adminSlice";
import { FaCheck, FaEdit, FaTimes } from "react-icons/fa";


const EditableField = React.memo(({ fieldName, value, style, isEditing, dispatch, inputTitle, id }) => {
  
    console.log(`Rendering Field: ${fieldName}`);

    const handleSave = () => {
        dispatch(editTitleAdminAPI({ id, fieldName, value: inputTitle }));
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

export default EditableField;