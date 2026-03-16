import { API } from "./axiosCreate";


const handleError = (error) => {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Internal Server Error" };
};

export const registerUser = async (userData) => {
    try {
        const res = await API.post('auth/user-register', userData);
        return res.data;
    } catch (error) {
        return handleError(error);
    }
};

export const loginUser = async (userData) => {
    try {
        const res = await API.post('auth/user-login', userData);
        return res.data;
    } catch (error) {
        return handleError(error);
    }
};


export const logoutUser = async () => {
    try {
        const res = await API.post('auth/user-logout')
        return res.data;
    } catch (error) {
        return handleError(error)
    }
}

export const userProfile = async () => {
    try {
        const res = await API.get('auth/user-profile');
        return res.data;
    } catch (error) {
        return handleError(error);
    }
};

export const sendPasswordLink = async (emailData) => {
    try {
        const res = await API.post('auth/sendpasswordlink', emailData);
        return res.data;
    } catch (error) {
        return handleError(error);
    }
};

export const getAllBooks = async () => {
    try {
        const res = await API.get('/book/get-all-book');
        return res.data;
    } catch (error) {
        return handleError(error);
    }
};


export const getSelectedBookDetails = async (id) => {
    try {
        const res = await API.get(`/book/get-one-book/${id}`);
        return res.data;
    } catch (error) {
        return handleError(error);
    }
};


export const incrementCartItem = async ({ id, addLot }) => {
    try {
        console.log(id);
        const res = await API.post(`/cart/increment-item/${id}`, { id, addLot });
        return res.data;
    } catch (error) {
        return handleError(error);
    }
};

export const decrementCartItem = async (id) => {
    try {
        const res = await API.post(`/cart/decrement-item/${id}`);
        return res.data;
    } catch (error) {
        return handleError(error);
    }
};


export const getCartDetails = async () => {
    try {
        const res = await API.get('/cart/get-cart');
        return res.data;
    } catch (error) {
        return handleError(error);
    }
};


export const removeItemFromCart = async (removeID) => {
    try {
        const res = await API.delete(`/cart/remove-item/${removeID}`);
        return res.data;
    } catch (error) {
        return handleError(error)
    }
};


export const clearAllItemsFromCart = async () => {
    try {
        const res = await API.delete('/cart/clear-cart');
        return res.data;
    } catch (error) {
        return handleError(error);
    }
};


export const getUserObjectForChange = async () => {
    try {
        const res = await API.get('/auth/get-user-data-change');
        return res.data;
    } catch (error) {
        return handleError(error)
    }
};


export const editUserFirstName = async (fname) => {
    try {
        const res = await API.patch('/auth/edit-first-name', fname);
        return res.data;
    } catch (error) {
        return handleError(error)
    }
};


export const updateProfile = async (fieldName) => {
    try {
        const res = await API.patch('/auth/update-profile', fieldName);
        return res.data;
    } catch (error) {
        return handleError(error)
    }
};


export const createUserOrderDetail = async (address) => {
    try {
        const res = await API.post('/order/create-order', address);
        return res.data;
    } catch (error) {
        return handleError(error)
    }
};


export const getUserOrderedWithDetails = async () => {
    try {
        const res = await API.get('/order/get-user-order');
        return res.data;
    } catch (error) {
        return handleError(error)
    }
};



// admin
export const getAllUserListAdmin = async () => {
    try {
        const res = await API.get('/admin/get-all-user-data-admin');
        return res.data;
    } catch (error) {
        return handleError(error)
    }
};


export const adminCanDisabledUserForLogin = async (userId, data) => {
    try {
        const res = await API.patch(`admin/user-disabled-admin/${userId}`, data);
        return res.data;
    } catch (error) {
        return handleError(error)
    }
};


export const adminCanSeeUserFullDetails = async (id) => {
    try {
        const res = await API.get(`/admin/get-single-user-details-admin/${id}`);
        return res.data;
    } catch (error) {
        return handleError(error)
    }
};


export const adminCanSeeAllBooks = async () => {
    try {
        const res = await API.get('/admin/get-books-data-admin');
        return res.data;
    } catch (error) {
        return handleError(error)
    }
};

export const adminCanSeeSingleBookDetails = async (ID) => {
    try {
        const res = await API.get(`/admin/get-book-detail-admin/${ID}`);
        return res.data;
    } catch (error) {
        return handleError(error)
    }
};






// try
export const adminCansoftDeleteBook = async (bookId, isDeleted) => {
    try {
        const res = await API.patch(`/admin/delete-book-detail-soft-admin/${bookId}`, isDeleted);
        return res.data;
    } catch (error) {
        return handleError(error)
    }
};
export const editTitleAdmin = async (id, data) => {
    try {
        const res = await API.patch(`/admin/update-book-detail-admin/${id}`, data);
        return res.data;
    } catch (error) {
        return handleError(error)
    }
}