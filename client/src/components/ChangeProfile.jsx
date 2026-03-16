import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clickOnEditButton, clearEdit, typingInInputField } from '../slices/editSlice';
import { FaUserEdit, FaCheck, FaTimes, FaUserCircle, FaInfoCircle } from "react-icons/fa";
import { getUserObjectForChangeAPI, updateProfileAPI } from '../slices/userSlice';

function ChangeProfile() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const { editingField, tempValue } = useSelector(state => state.edit);

    const handleSave = (fieldName) => {
        if (!tempValue && fieldName !== 'hobbies') return;
        dispatch(updateProfileAPI({ [fieldName]: tempValue }));
        dispatch(clearEdit());
    }

    useEffect(() => {
        dispatch(getUserObjectForChangeAPI());
    }, [dispatch]);

    const renderField = (label, fieldName, value) => {
        const isEditing = editingField === fieldName;

        return (
            <div className={`mb-4 p-4 rounded-2xl transition-all duration-300 border ${isEditing ? 'bg-emerald-50/50 border-emerald-200 shadow-sm' : 'bg-white border-transparent hover:bg-gray-50/80 hover:border-gray-100'}`}>
                <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                        {label}
                    </label>
                </div>

                <div className="flex items-center gap-3 min-h-[40px]">
                    {isEditing ? (
                        <div className="flex gap-2 w-full animate-in slide-in-from-top-1 duration-200">
                            <input
                                type={fieldName === 'age' ? 'number' : 'text'}
                                value={tempValue}
                                onChange={(e) => dispatch(typingInInputField(e.target.value))}
                                className="flex-1 bg-white border-2 border-emerald-500 rounded-xl px-4 py-2 text-sm font-bold text-gray-800 outline-none shadow-inner focus:ring-4 focus:ring-emerald-500/10"
                                autoFocus
                                placeholder={`Enter ${label}...`}
                            />
                            <button
                                onClick={() => handleSave(fieldName)}
                                className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all active:scale-90"
                                title="Save"
                            >
                                <FaCheck size={14} />
                            </button>
                            <button
                                onClick={() => dispatch(clearEdit())}
                                className="p-3 bg-white text-gray-400 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all active:scale-90"
                                title="Cancel"
                            >
                                <FaTimes size={14} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center w-full group">
                            <p className="text-base font-black text-gray-800 tracking-tight">
                                {fieldName === 'hobbies'
                                    ? (Array.isArray(value) ? value.join(' • ') : value || 'No hobbies added')
                                    : (value || 'Not set')}
                            </p>
                            <button
                                onClick={() => dispatch(clickOnEditButton({ fieldName, value }))}
                                className="opacity-0 group-hover:opacity-100 flex items-center gap-2 text-[10px] font-bold text-emerald-600 bg-white border border-emerald-100 px-3 py-1.5 rounded-lg shadow-sm hover:bg-emerald-600 hover:text-white transition-all duration-300"
                            >
                                <FaUserEdit size={12} /> EDIT
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50"></div>

                <header className="mb-10 relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-emerald-600 rounded-2xl text-white shadow-xl shadow-emerald-200">
                            <FaUserCircle size={28} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Profile Setup</h2>
                            <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mt-1 flex items-center gap-1">
                                <FaInfoCircle /> Personal Details & Preferences
                            </p>
                        </div>
                    </div>
                </header>

                <div className="space-y-2 relative z-10">
                    {renderField("First Name", "firstname", user?.firstname)}
                    {renderField("Last Name", "lastname", user?.lastname)}
                    {renderField("Your Age", "age", user?.age)}
                    {renderField("Interests & Hobbies", "hobbies", user?.hobbies)}
                </div>

                <footer className="mt-10 pt-6 border-t border-gray-50 flex justify-between items-center text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
                    <span>Account Security: High</span>
                    <span>Last Updated: {new Date().toLocaleDateString()}</span>
                </footer>
            </div>
        </div>
    );
}

export default ChangeProfile;





















// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { editUserFirstNameAPI, getUserObjectForChangeAPI } from '../slices/userSlice';
// import { FaUserEdit, FaCheck, FaTimes } from "react-icons/fa";
// import { clickOnEditButton, saveButton, typingInInputField } from '../slices/editSlice';

// function ChangeProfile() {
//     const dispatch = useDispatch();
//     const userProfile = useSelector(state => state.user.user);
//     const { editedUser, firstname } = useSelector(state => state.edit);

//     const handleEdit = () => dispatch(clickOnEditButton(userProfile?.firstname));
//     const handleChange = (e) => dispatch(typingInInputField(e.target.value));

//     const handleSave = () => {
//         dispatch(editUserFirstNameAPI({ firstname }));
//         dispatch(saveButton());
//     };

//     const handleCancel = () => dispatch(saveButton());

//     useEffect(() => {
//         dispatch(getUserObjectForChangeAPI());
//     }, [dispatch]);

//     return (
//         <>
//             <div className="max-w-md bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-gray-100">
//                 <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Personal Information</h3>

//                 <div className="flex flex-col gap-1">
//                     <label className="text-xs font-black text-emerald-600 ml-1">First Name</label>

//                     <div className="flex items-center gap-3 min-h-12">
//                         {editedUser ? (
//                             <div className="flex items-center gap-2 w-full animate-in fade-in slide-in-from-left-2 duration-300">
//                                 <input
//                                     type="text"
//                                     name="firstname"
//                                     value={firstname}
//                                     onChange={handleChange}
//                                     autoFocus
//                                     className="flex-1 bg-white border-2 border-emerald-500 rounded-xl px-4 py-2 text-gray-900 outline-none shadow-inner"
//                                 />
//                                 <button
//                                     onClick={handleSave}
//                                     className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-100 transition-all active:scale-95"
//                                 >
//                                     <FaCheck size={14} />
//                                 </button>
//                                 <button
//                                     onClick={handleCancel}
//                                     className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl transition-all active:scale-95"
//                                 >
//                                     <FaTimes size={14} />
//                                 </button>
//                             </div>
//                         ) : (
//                             <div className="flex justify-between items-center w-full group py-1">
//                                 <p className="text-xl font-bold text-gray-900 ml-1 tracking-tight">
//                                     {userProfile?.firstname || "Add name..."}
//                                 </p>
//                                 <button
//                                     onClick={handleEdit}
//                                     className="opacity-0 group-hover:opacity-100 flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-300"
//                                 >
//                                     <FaUserEdit /> Edit
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//                 <p className="mt-4 text-[10px] text-gray-400 italic">This name will be used on your delivery invoices.</p>
//             </div>
//         </>
//     );
// }

// export default ChangeProfile;
