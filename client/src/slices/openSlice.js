import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebar: false
}

const openSlice = createSlice({
    name: 'open',
    initialState,
    reducers: {
        openSideBar: (state, action) => {
            state.sidebar = action.payload || !state.sidebar
        },
        closeSidebar: (state) => {
            state.sidebar = false;
        }
    }
});

export const { openSideBar, closeSidebar } = openSlice.actions;

export default openSlice.reducer;