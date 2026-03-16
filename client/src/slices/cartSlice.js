import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearAllItemsFromCart, decrementCartItem, getCartDetails, incrementCartItem, removeItemFromCart } from "../Axios/axiosInstance";


export const incrementCartItemAPI = createAsyncThunk('cart/incrementCartItemAPI', async ({ id, addLot }, { rejectWithValue }) => {
    try {
        console.log(id, 'id');
        const res = await incrementCartItem({ id, addLot });
        return res.data;
    } catch (error) {
        rejectWithValue(error.response?.data || error.message)
    }
});


export const decrementCartItemAPI = createAsyncThunk('cart/decrementCartItemAPI', async (id, { rejectWithValue }) => {
    try {
        const res = await decrementCartItem(id);
        return res.data;
    } catch (error) {
        rejectWithValue(error.response?.data || error.message)
    }
});


export const getCartDetailsAPI = createAsyncThunk("cart/getCartDetailsAPI", async (_, { rejectWithValue }) => {
    try {
        const res = await getCartDetails();
        return res.data;
    } catch (error) {
        rejectWithValue(error.response?.data || error.message)
    }
});


export const removeItemFromCartAPI = createAsyncThunk('cart/removeItemFromCartAPI', async (id, { rejectWithValue }) => {
    try {
        const res = await removeItemFromCart(id);
        return res.data;
    } catch (error) {
        rejectWithValue(error.response?.data || error.message)
    }
});


export const clearAllItemsFromCartAPI = createAsyncThunk('cart/clearAllItemsFromCartAPI', async (_, { rejectWithValue }) => {
    try {
        const res = await clearAllItemsFromCart();
        return res.data;
    } catch (error) {
        rejectWithValue(error.response?.data || error.message)
    }
});


const initialState = {
    cart: { items: [] },
    isLoading: false,
    isError: null,

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = { items: [] };
            state.isError = null;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementCartItemAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload;
            })
            .addCase(getCartDetailsAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload?.data || action.payload;
            })
            .addCase(decrementCartItemAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload?.data || action.payload;
            })
            .addCase(removeItemFromCartAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload?.data || action.payload;
            })
            .addCase(clearAllItemsFromCartAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload?.data || action.payload;
            })
    }
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;