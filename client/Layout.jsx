import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import CartSidebar from "./src/components/CartSidebar";
import { getCartDetailsAPI } from "./src/slices/cartSlice";
import { userProfileAPI } from "./src/slices/userSlice";

function Layout() {

    const dispatch = useDispatch();
    // const { user } = useSelector(state => state.user);

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        if (token) {
            dispatch(userProfileAPI());
            dispatch(getCartDetailsAPI());
        }
    }, [dispatch]);   


    return (
        <div className="min-h-screen flex flex-col">

            <Header />
            <CartSidebar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />

        </div>
    );
}

export default Layout;