import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editingField: null,
    tempValue: ""
}

const editSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {
        clickOnEditButton: (state, action) => {
            state.editingField = action.payload.fieldName;
            state.tempValue = action.payload.value;
        },
        clearEdit: (state) => {
            state.editingField = null;
            state.tempValue = ""
        },
        typingInInputField: (state, action) => {
            state.tempValue = action.payload;
        }
    }
});



export const { clickOnEditButton, typingInInputField, saveButton, clearEdit } = editSlice.actions;

export default editSlice.reducer;