import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { API } from '../Axios/axiosCreate';
import { Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../slices/cartSlice';
import { FaOpencart } from "react-icons/fa";
import { openSideBar } from '../slices/openSlice';
import { logoutUserAPI } from '../slices/userSlice';


function Header() {
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart?.cart?.items || []);
    const isAuthenticated = !!sessionStorage.getItem('accessToken');
    const newCount = isAuthenticated ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;
    const dispatch = useDispatch();
    // const [openSideBar, setOpenSideBar] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    // const { sidebar } = useSelector(state => state.open);
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuNavigation = (page) => {
        navigate(`/${page}`);
        setAnchorEl(null);
    };

    // console.log(sidebar, 'sidebar');


    const handleLogout = async () => {
        try {
            await dispatch(logoutUserAPI());
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            dispatch(clearCart());
            sessionStorage.removeItem('accessToken');
            navigate('/login');
        }
    };



    return (
        <header className='sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 z-51'>
            <div className='max-w-7xl mx-auto px-6 h-16 flex justify-between items-center'>

                <div className='flex items-center cursor-pointer' onClick={() => navigate('/home')}>
                    <span className='text-2xl font-black text-emerald-600 tracking-tighter italic'>
                        LOGO
                    </span>
                </div>

                <nav className='hidden md:flex items-center gap-6'>
                    <NavLink to='/' className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? "text-emerald-600 font-bold" : "text-gray-500 hover:text-emerald-500"}`}>
                        Home
                    </NavLink>
                    <NavLink to='/dashboard' className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? "text-emerald-600 font-bold" : "text-gray-500 hover:text-emerald-500"}`}>
                        Dashboard
                    </NavLink>
                    <NavLink to='/bookshop' className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? "text-emerald-600 font-bold" : "text-gray-500 hover:text-emerald-500"}`}>
                        Shop
                    </NavLink>

                    <div className="flex items-center">
                        <Button
                            id="pages-button"
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                            className="text-gray-500 hover:text-emerald-500 font-medium text-sm normal-case"
                        >
                            Pages
                        </Button>
                        <Menu
                            id="pages-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => setAnchorEl(null)}

                        >
                            <MenuItem onClick={() => handleMenuNavigation('about-us')} className="text-sm text-gray-600 hover:bg-emerald-50">About Us</MenuItem>
                            <MenuItem onClick={() => handleMenuNavigation('term')} className="text-sm text-gray-600 hover:bg-emerald-50">Terms</MenuItem>
                            <MenuItem onClick={() => handleMenuNavigation('faq-page')} className="text-sm text-gray-600 hover:bg-emerald-50">FAQ</MenuItem>
                            <MenuItem onClick={() => handleMenuNavigation('privacy-policy')} className="text-sm text-gray-600 hover:bg-emerald-50">Privacy Policy</MenuItem>
                        </Menu>
                    </div>

                    <NavLink to='/profile' className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? "text-emerald-600 font-bold" : "text-gray-500 hover:text-emerald-500"}`}>
                        Profile
                    </NavLink>
                </nav>

                <div className='flex items-center gap-6'>
                    <div className='relative cursor-pointer text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-1'>
                        <span key={newCount} className={`text-2xl font-semibold ${newCount > 0 ? 'animate-bounce' : ''}`} onClick={() => dispatch(openSideBar())}>
                            <FaOpencart />
                        </span>
                        {newCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-sm">
                                {newCount}
                            </span>
                        )}
                    </div>


                    {isAuthenticated ? (
                        <button onClick={handleLogout} className='text-sm font-bold text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-all shadow-sm'>
                            Logout
                        </button>
                    ) : (
                        <NavLink to='/login' className='text-sm font-bold text-emerald-600 border border-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg transition-all'>
                            Login
                        </NavLink>
                    )}
                </div>
            </div>

        </header>
    );
}

export default Header;
