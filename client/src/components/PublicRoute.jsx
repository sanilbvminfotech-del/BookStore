import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const token = sessionStorage.getItem('accessToken')
    const location = useLocation();

    if (token && !location.state?.from) {
        return <Navigate to="/dashboard" replace />
    }

    return children;
}

export default PublicRoute;