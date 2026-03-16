import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import bookReducer from '../slices/bookSlice'
import cartReducer from '../slices/cartSlice'
import openReducer from '../slices/openSlice'
import editReducer from '../slices/editSlice'
import orderReducer from '../slices/orderSlice'
import adminReducer from '../slices/adminSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        book: bookReducer,
        cart: cartReducer,
        open: openReducer,
        edit: editReducer,
        order: orderReducer,
        admin: adminReducer
    }
});