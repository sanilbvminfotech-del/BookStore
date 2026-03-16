import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserOrderDetail, getUserOrderedWithDetails } from "../Axios/axiosInstance";




export const createUserOrderDetailAPI = createAsyncThunk('order/createUserOrderDetailAPI', async (address, { rejectWithValue }) => {
    try {
        const res = await createUserOrderDetail(address);
        return res.data;
    } catch (error) {
        rejectWithValue(error.response?.data || error.message)
    }
});


export const getUserOrderedWithDetailsAPI = createAsyncThunk('order/getUserOrderedWithDetailsAPI', async (_, { rejectWithValue }) => {
    try {
        const res = await getUserOrderedWithDetails();
        return res.data;
    } catch (error) {
        rejectWithValue(error.response?.data || error.message)
    }
});



const initialState = {
    orders: [],
    isLoading: false,
    isError: null
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserOrderDetailAPI.pending, (state) => {
                state.isLoading = true;
                state.isError = null
            })
            .addCase(createUserOrderDetailAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload;
            })
            .addCase(createUserOrderDetailAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
                console.log(error, 'error order')
            })
            .addCase(getUserOrderedWithDetailsAPI.pending, (state) => {
                state.isLoading = true;
                state.isError = null
            })
            .addCase(getUserOrderedWithDetailsAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload;
            })
    }
});

export const { } = orderSlice.actions;

export default orderSlice.reducer;