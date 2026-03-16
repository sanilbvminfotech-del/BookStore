import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminCanDisabledUserForLogin, adminCanSeeAllBooks, adminCanSeeSingleBookDetails, adminCanSeeUserFullDetails, adminCansoftDeleteBook, editTitleAdmin, getAllUserListAdmin } from "../Axios/axiosInstance";


// user
export const getAllUserListAdminAPI = createAsyncThunk('admin/getAllUserListAdminAPI', async (_, { rejectWithValue }) => {
    try {
        const res = await getAllUserListAdmin();
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});


export const adminCanDisabledUserForLoginAPI = createAsyncThunk('admin/adminCanDisabledUserForLoginAPI', async ({ userId, statusField }, { rejectWithValue }) => {
    try {
        const res = await adminCanDisabledUserForLogin(userId, { statusField });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
});


export const adminCanSeeUserFullDetailsAPI = createAsyncThunk('admin/adminCanSeeUserFullDetailsAPI', async (id, { rejectWithValue }) => {
    try {
        const res = await adminCanSeeUserFullDetails(id);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
});



// books
export const adminCanSeeAllBooksAPI = createAsyncThunk('admin/adminCanSeeAllBooksAPI', async (_, { rejectWithValue }) => {
    try {
        const res = await adminCanSeeAllBooks();
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
});

export const adminCanSeeSingleBookDetailsAPI = createAsyncThunk('admin/adminCanSeeSingleBookDetailsAPI', async (ID, { rejectWithValue }) => {
    try {
        const res = await adminCanSeeSingleBookDetails(ID);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
});



// try
export const adminCansoftDeleteBookAPI = createAsyncThunk('admin/adminCansoftDeleteBookAPI', async ({ bookId, isDeleted }, { rejectWithValue }) => {
    try {
        const res = await adminCansoftDeleteBook(bookId, { isDeleted });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
});



export const editTitleAdminAPI = createAsyncThunk('admin/editTitleAdminAPI', async ({ id, fieldName, value }, { rejectWithValue }) => {
    try {
        const res = await editTitleAdmin(id, { [fieldName]: value });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
});




const initialState = {
    users: [],
    user: null,
    isLoading: false,
    isError: null,
    books: [],
    bookDetail: null,
    editingField: null,
    inputTitle: "",
    search: ""
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clickOnEditButtonAdmin: (state, action) => {
            state.editingField = action.payload?.fieldName;
            state.inputTitle = action.payload?.value;
        },
        onChangeEvent: (state, action) => {
            state.inputTitle = action.payload;
        },
        clearEditAdmin: (state) => {
            state.editingField = null;
            state.inputTitle = ""
        },
        searchUsers: (state, action) => {
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUserListAdminAPI.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getAllUserListAdminAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(getAllUserListAdminAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
                console.log('error', action.payload);
            })
            .addCase(adminCanDisabledUserForLoginAPI.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(adminCanDisabledUserForLoginAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                const commingUserID = action.payload;
                console.log(commingUserID, 'commingUserID 68');
                // state.users = state.users.map(user => user._id === commingUserID._id ? commingUserID : user);
                const index = state.users.findIndex(user => user._id === commingUserID._id)
                if (index !== -1) {
                    state.users[index] = commingUserID
                }
            })
            .addCase(adminCanDisabledUserForLoginAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
                console.log('error', action.payload);
            })
            .addCase(adminCanSeeUserFullDetailsAPI.pending, (state) => {
                state.user = null;
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(adminCanSeeUserFullDetailsAPI.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(adminCanSeeUserFullDetailsAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
                console.log('error', action.payload);
            })
            .addCase(adminCanSeeAllBooksAPI.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(adminCanSeeAllBooksAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books = action.payload;
            })
            .addCase(adminCanSeeAllBooksAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
                console.log('error', action.payload);
            })
            .addCase(adminCanSeeSingleBookDetailsAPI.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(adminCanSeeSingleBookDetailsAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bookDetail = action.payload;
            })
            .addCase(adminCanSeeSingleBookDetailsAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
                console.log('error', action.payload);
            })


            // try
            .addCase(adminCansoftDeleteBookAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                const commingBookID = action.payload
                // state.books = state.books.map(book => book._id === commingBookID._id ? commingBookID : book);
                const index = state.books.findIndex(book => book._id === commingBookID._id)
                if (index !== -1) {
                    state.books[index] = commingBookID
                }
            })
            .addCase(editTitleAdminAPI.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(editTitleAdminAPI.fulfilled, (state, action) => {
                const updatedBook = action.payload;
                state.bookDetail = updatedBook;
                const index = state.books.findIndex(book => book._id === updatedBook._id)
                if (index !== -1) {
                    state.books[index] = updatedBook
                }
                state.editingField = null;
                state.isLoading = false;
            })
            .addCase(editTitleAdminAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
                console.log('error', action.payload)
            })
    }
});

export const { clickOnEditButtonAdmin, onChangeEvent, clearEditAdmin, searchUsers } = adminSlice.actions;

export default adminSlice.reducer;