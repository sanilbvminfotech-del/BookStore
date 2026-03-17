import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Menu, MenuItem, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../slices/cartSlice';
import { FaOpencart } from "react-icons/fa";
import { openSideBar } from '../slices/openSlice';
import { logoutUserAPI } from '../slices/userSlice';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    // const [openImage, setOpenImage] = useState(false)
    const cartItems = useSelector(state => state.cart?.cart?.items || []);
    const { user } = useSelector((state) => state.user);
    const isAuthenticated = !!sessionStorage.getItem('accessToken');
    const newCount = isAuthenticated ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;
    // console.log(openImage, 'openImage');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const open = Boolean(anchorEl);


    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleMenuNavigation = (page) => {
        navigate(`/${page}`);
        setAnchorEl(null);
        setMobileMenuOpen(false);
    };



    const handleLogout = async () => {
        try {
            await dispatch(logoutUserAPI());
            dispatch(clearCart());
            sessionStorage.removeItem('accessToken');
            navigate('/login');
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <header className='sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 w-full'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center'>

                <div className='flex items-center gap-4'>
                    <div className='md:hidden'>
                        <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                    </div>
                    <div className='flex items-center cursor-pointer' onClick={() => navigate('/')}>
                        <span className='text-xl sm:text-2xl font-black text-emerald-600 tracking-tighter italic'>
                            LOGO
                        </span>
                    </div>
                </div>

                <nav className='hidden md:flex items-center gap-4 lg:gap-6'>
                    <NavLink to='/' className={({ isActive }) => `text-sm font-medium ${isActive ? "text-emerald-600" : "text-gray-500 hover:text-emerald-500"}`}>Home</NavLink>
                    <NavLink to='/dashboard' className={({ isActive }) => `text-sm font-medium ${isActive ? "text-emerald-600" : "text-gray-500 hover:text-emerald-500"}`}>Dashboard</NavLink>
                    <NavLink to='/bookshop' className={({ isActive }) => `text-sm font-medium ${isActive ? "text-emerald-600" : "text-gray-500 hover:text-emerald-500"}`}>Shop</NavLink>

                    <Button onClick={handleClick} endIcon={<KeyboardArrowDownIcon />} className="text-gray-500 text-sm normal-case">Pages</Button>
                    <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                        <MenuItem onClick={() => handleMenuNavigation('about-us')}>About Us</MenuItem>
                        <MenuItem onClick={() => handleMenuNavigation('term')}>Terms</MenuItem>
                        <MenuItem onClick={() => handleMenuNavigation('faq-page')}>FAQ</MenuItem>
                        <MenuItem onClick={() => handleMenuNavigation('privacy-policy')}>Privacy Policy</MenuItem>
                    </Menu>

                    <NavLink to='/profile' className={({ isActive }) => `text-sm font-medium ${isActive ? "text-emerald-600" : "text-gray-500 hover:text-emerald-500"}`}>Profile</NavLink>
                </nav>

                <div className='flex items-center gap-3 sm:gap-6'>
                    <div className='relative cursor-pointer text-gray-600 hover:text-emerald-600' onClick={() => dispatch(openSideBar())}>
                        <FaOpencart className={`text-2xl ${newCount > 0 ? 'animate-bounce' : ''}`} />
                        {newCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                {newCount}
                            </span>
                        )}
                    </div>

                    <div className="relative inline-block">
                        <img
                            alt="user"
                            src={user?.image ? `https://bookstore-ybgj.onrender.com/image/UserImage/${user.image}` : `https://bookstore-ybgj.onrender.com/image/UserImage/default.jpg`}
                            className="size-9 rounded-full object-cover border border-gray-200"
                        />
                        {user?.image ? <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-glow"></span> : <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>}
                    </div>


                    {isAuthenticated ? (
                        <button onClick={handleLogout} className='text-xs sm:text-sm font-bold text-white bg-red-500 px-3 sm:px-4 py-2 rounded-lg'>
                            Logout
                        </button>
                    ) : (
                        <NavLink to='/login' className='text-xs sm:text-sm font-bold text-emerald-600 border border-emerald-600 px-3 sm:px-4 py-2 rounded-lg'>
                            Login
                        </NavLink>
                    )}
                </div>
            </div>

            {mobileMenuOpen && (
                <div className='md:hidden bg-white border-b border-gray-100 px-6 py-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300'>
                    <NavLink to='/' onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-gray-600">Home</NavLink>
                    <NavLink to='/dashboard' onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-gray-600">Dashboard</NavLink>
                    <NavLink to='/bookshop' onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-gray-600">Shop</NavLink>
                    <NavLink to='/profile' onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-gray-600">Profile</NavLink>
                </div>
            )}
        </header>
    );
}

export default Header;
