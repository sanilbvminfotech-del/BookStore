import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editUserFirstName, getUserObjectForChange, loginUser, logoutUser, registerUser, updateProfile, userProfile } from "../Axios/axiosInstance";



export const registerUserAPI = createAsyncThunk('user/registerUserAPI', async (formData, { rejectWithValue }) => {
    try {
        const res = await registerUser(formData);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});


export const loginUserAPI = createAsyncThunk('user/loginUserAPI', async (formData, { rejectWithValue }) => {
    try {
        const res = await loginUser(formData);
        const token = res.data.token;
        sessionStorage.setItem('accessToken', token);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});


export const logoutUserAPI = createAsyncThunk('user/logoutUserAPI', async (_, { rejectWithValue }) => {
    try {
        const res = await logoutUser();
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
});


export const userProfileAPI = createAsyncThunk('user/userProfileAPI', async (_, { rejectWithValue }) => {
    try {
        const res = await userProfile();
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});


export const getUserObjectForChangeAPI = createAsyncThunk('user/getUserObjectForChangeAPI', async (_, { rejectWithValue }) => {
    try {
        const res = await getUserObjectForChange();
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});


export const editUserFirstNameAPI = createAsyncThunk('user/editUserFirstNameAPI', async (fname, { rejectWithValue }) => {
    try {
        const res = await editUserFirstName(fname);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const updateProfileAPI = createAsyncThunk('user/updateProfileAPI', async (fieldName, { rejectWithValue }) => {
    try {
        // console.log(fieldName, 'fieldName-fieldName');
        const res = await updateProfile(fieldName);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});



const initialState = {
    user: {},
    isLoading: !!sessionStorage.getItem('accessToken'),
    isError: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUserAPI.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(registerUserAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(registerUserAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
                console.log("Error payload:", action.payload);
            })
            .addCase(loginUserAPI.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(loginUserAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loginUserAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
                console.log("Error payload:", action.payload);
            })
            .addCase(userProfileAPI.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(userProfileAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(userProfileAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
                console.log("Error payload:", action.payload);
            })
            .addCase(getUserObjectForChangeAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(editUserFirstNameAPI.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(updateProfileAPI.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(logoutUserAPI.pending, (state) => {
                state.isLoading = true;
                state.isError = null
            })
            .addCase(logoutUserAPI.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null
            })
            .addCase(logoutUserAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
                console.log('error', action.payload)
            })
    }
});

const { } = userSlice.actions;

export default userSlice.reducer;