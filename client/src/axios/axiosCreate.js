import axios from "axios";

export const API = axios.create({
    baseURL: 'https://bookstore-ybgj.onrender.com/api/',
    withCredentials: true
});

API.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);



API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await API.post('auth/refresh-token');
                const { accessToken } = res.data;

                sessionStorage.setItem('accessToken', accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return API(originalRequest);
                
            } catch (refreshError) {
                console.error("Refresh token expired. Redirecting to login...");
                sessionStorage.removeItem('accessToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

