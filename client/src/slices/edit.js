// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     firstname: '',
//     editedUser: false
// }

// const editSlice = createSlice({
//     name: 'edit',
//     initialState,
//     reducers: {
//         editFirstname: (state, action) => {
//             state.firstname = action.payload
//         },
//         editClick: (state, action) => {
//             state.firstname = action.payload; // fill input
//             state.editedUser = true;          // enable edit mode
//         },
//         cancelEdit: (state) => {
//             state.editedUser = false;
//         }
//     }
// });

// export const { editFirstname, editClick, cancelEdit } = editSlice.actions;
// export default editSlice.reducer;

















// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getUserObjectForChangeAPI } from '../slices/userSlice';
// import { FaUserEdit } from "react-icons/fa";
// import { editClick, editFirstname, cancelEdit } from '../slices/editSlice';

// function ChangeProfile() {

//     const dispatch = useDispatch();

//     const userProfile = useSelector(state => state.user.user)
//     const { firstname, editedUser } = useSelector(state => state.edit)

//     useEffect(() => {
//         dispatch(getUserObjectForChangeAPI())
//     }, [dispatch])

//     const handleEdit = () => {
//         dispatch(editClick(userProfile?.firstname))
//     }

//     const handleChange = (e) => {
//         dispatch(editFirstname(e.target.value))
//     }

//     const handleSave = () => {
//         // :point_right: Call update API here if needed
//         console.log("Updated Name:", firstname)

//         // After saving
//         dispatch(cancelEdit())
//     }

//     return (
//         <div className='flex gap-2'>

//             {editedUser ? (
//                 <>
//                     <input
//                         type="text"
//                         value={firstname}
//                         onChange={handleChange}
//                     />
//                     <button onClick={handleSave}>Save</button>
//                 </>
//             ) : (
//                 <>
//                     <p>{userProfile?.firstname}</p>
//                     <span
//                         className='cursor-pointer'
//                         onClick={handleEdit}
//                     >
//                         <FaUserEdit />
//                     </span>
//                 </>
//             )}

//         </div>
//     )
// }

// export default ChangeProfile





















// // api/user.js

// export const updateUserFirstname = async (firstname) => {
//     const res = await API.put('/auth/update-firstname', { firstname });
//     return res.data;
// };











// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getUserObjectForChange, updateUserFirstname } from "../api/user";

// const initialState = {
//     user: null,
//     loading: false,
//     error: null
// };

// /* ------------------ GET USER ------------------ */
// export const getUserObjectForChangeAPI = createAsyncThunk(
//     'user/getUser',
//     async (_, { rejectWithValue }) => {
//         try {
//             return await getUserObjectForChange();
//         } catch (error) {
//             return rejectWithValue(error.response?.data || error.message);
//         }
//     }
// );

// /* ------------------ UPDATE USER ------------------ */
// export const updateUserFirstnameAPI = createAsyncThunk(
//     'user/updateFirstname',
//     async (firstname, { rejectWithValue }) => {
//         try {
//             return await updateUserFirstname(firstname);
//         } catch (error) {
//             return rejectWithValue(error.response?.data || error.message);
//         }
//     }
// );

// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         /* :fire: Optimistic update */
//         setFirstnameOptimistic: (state, action) => {
//             if (state.user) {
//                 state.user.firstname = action.payload;
//             }
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             /* GET USER */
//             .addCase(getUserObjectForChangeAPI.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(getUserObjectForChangeAPI.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload;
//             })
//             .addCase(getUserObjectForChangeAPI.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })

//             /* UPDATE USER */
//             .addCase(updateUserFirstnameAPI.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(updateUserFirstnameAPI.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload; // backend returns updated user
//             })
//             .addCase(updateUserFirstnameAPI.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     }
// });

// export const { setFirstnameOptimistic } = userSlice.actions;
// export default userSlice.reducer;





















// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//     getUserObjectForChangeAPI,
//     updateUserFirstnameAPI,
//     setFirstnameOptimistic
// } from '../slices/userSlice'
// import { FaUserEdit } from "react-icons/fa";

// function ChangeProfile() {

//     const dispatch = useDispatch();
//     const { user, loading } = useSelector(state => state.user);

//     const [isEditing, setIsEditing] = useState(false);
//     const [firstname, setFirstname] = useState('');

//     /* Load user */
//     useEffect(() => {
//         dispatch(getUserObjectForChangeAPI());
//     }, [dispatch]);

//     /* Fill input when user loads */
//     useEffect(() => {
//         if (user) {
//             setFirstname(user.firstname);
//         }
//     }, [user]);

//     const handleSave = async () => {

//         /* :fire: Optimistic Update */
//         dispatch(setFirstnameOptimistic(firstname));

//         setIsEditing(false);

//         try {
//             await dispatch(updateUserFirstnameAPI(firstname)).unwrap();
//         } catch (err) {
//             console.error("Update failed:", err);
//         }
//     };

//     return (
//         <div className='flex gap-2 items-center'>

//             {isEditing ? (
//                 <>
//                     <input
//                         type="text"
//                         value={firstname}
//                         onChange={(e) => setFirstname(e.target.value)}
//                         className='border px-2 py-1'
//                     />
//                     <button
//                         onClick={handleSave}
//                         disabled={loading}
//                         className='bg-blue-500 text-white px-3 py-1 rounded'
//                     >
//                         {loading ? "Saving..." : "Save"}
//                     </button>
//                 </>
//             ) : (
//                 <>
//                     <p>{user?.firstname}</p>
//                     <span
//                         className='cursor-pointer'
//                         onClick={() => setIsEditing(true)}
//                     >
//                         <FaUserEdit />
//                     </span>
//                 </>
//             )}

//         </div>
//     );
// }

// export default ChangeProfile;

























// // controllers/userController.js

// import User from "../models/User.js";

// export const updateFirstname = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { firstname } = req.body;

//         // Validation
//         if (!firstname || firstname.trim() === "") {
//             return res.status(400).json({
//                 success: false,
//                 message: "Firstname is required",
//             });
//         }

//         // Find user and update
//         const updatedUser = await User.findByIdAndUpdate(
//             id,
//             { firstname },
//             { new: true, runValidators: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Firstname updated successfully",
//             data: updatedUser,
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };



















// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     getUserObjectForChangeAPI,
//     updateUserFirstnameAPI,
//     setFirstnameOptimistic,
// } from "../slices/userSlice";
// import { FaUserEdit } from "react-icons/fa";

// function ChangeProfile() {
//     const dispatch = useDispatch();
//     const { user, loading } = useSelector((state) => state.user);

//     const [isEditing, setIsEditing] = useState(false);
//     const [firstname, setFirstname] = useState("");

//     useEffect(() => {
//         dispatch(getUserObjectForChangeAPI());
//     }, [dispatch]);

//     useEffect(() => {
//         if (user) {
//             setFirstname(user.firstname);
//         }
//     }, [user]);

//     const handleSave = async () => {
//         if (!firstname.trim()) return;

//         // Optimistic update
//         dispatch(setFirstnameOptimistic(firstname));
//         setIsEditing(false);

//         try {
//             await dispatch(updateUserFirstnameAPI(firstname)).unwrap();
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const handleCancel = () => {
//         setFirstname(user.firstname);
//         setIsEditing(false);
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//             <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition-all duration-300">

//                 <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//                     Profile Settings
//                 </h2>

//                 <div className="flex flex-col gap-4">

//                     {/* Display Mode */}
//                     {!isEditing ? (
//                         <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
//                             <p className="text-lg font-medium text-gray-700">
//                                 {user?.firstname || "Loading..."}
//                             </p>

//                             <button
//                                 onClick={() => setIsEditing(true)}
//                                 className="text-blue-600 hover:text-blue-800 transition duration-200"
//                             >
//                                 <FaUserEdit size={18} />
//                             </button>
//                         </div>
//                     ) : (
//                         /* Edit Mode */
//                         <div className="flex flex-col gap-4">

//                             <input
//                                 type="text"
//                                 value={firstname}
//                                 onChange={(e) => setFirstname(e.target.value)}
//                                 placeholder="Enter new firstname"
//                                 className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                             />

//                             <div className="flex gap-3 justify-end">

//                                 <button
//                                     onClick={handleCancel}
//                                     className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition duration-200"
//                                 >
//                                     Cancel
//                                 </button>

//                                 <button
//                                     onClick={handleSave}
//                                     disabled={loading}
//                                     className={`px-4 py-2 rounded-xl text-white transition duration-200 ${loading
//                                         ? "bg-blue-300 cursor-not-allowed"
//                                         : "bg-blue-600 hover:bg-blue-700"
//                                         }`}
//                                 >
//                                     {loading ? "Saving..." : "Save"}
//                                 </button>

//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ChangeProfile;