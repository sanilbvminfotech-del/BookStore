import { Navigate, useLocation } from "react-router-dom";



const   ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem('accessToken')
    const location = useLocation();

    if (!token && !location.state?.from) {
        return <Navigate to="/login" replace />
    }

    return children;
}

export default ProtectedRoute;




