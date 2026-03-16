import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBooks, getSelectedBookDetails } from "../axios/axiosInstance";



export const getAllBooksAdminAPI = createAsyncThunk('user/getAllBooksAdminAPI', async (_, { rejectWithValue }) => {
    try {
        const res = await getAllBooks();
        return res.data;
    } catch (error) {
        rejectWithValue(error.response?.data || error.message)
    }
});


export const getSelectedBookDetailsAPI = createAsyncThunk('user/getSelectedBookDetailsAPI', async (id, { rejectWithValue }) => {
    try {
        const res = await getSelectedBookDetails(id);
        // console.log(res.data, 'API');
        return res.data;
    } catch (error) {
        rejectWithValue(error.response?.data || error.message)
    }
});


const initialState = {
    books: [],
    isLoading: false,
    isError: null,
    isSingle: {},
    search: '',
    sort: "default"
}

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        searchItems: (state, action) => {
            state.search = action.payload;
        },
        sortItems: (state, action) => {
            state.sort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBooksAdminAPI.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getAllBooksAdminAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books = action.payload;
            })
            .addCase(getAllBooksAdminAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
                console.log('eror', action.payload)
            })
            .addCase(getSelectedBookDetailsAPI.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getSelectedBookDetailsAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSingle = action.payload;
            })
            .addCase(getSelectedBookDetailsAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
                console.log('eror', action.payload)
            })
    }
});


export  const { searchItems, sortItems } = bookSlice.actions;

export default bookSlice.reducer;