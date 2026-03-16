
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from '../Layout.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Error from './components/Error.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import Dashboard from './components/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import PublicRoute from './components/PublicRoute.jsx'
// import Profile from './components/Profile.jsx'
// import BookShop from './components/BookShop.jsx'
// import AdminUserList from './components/AdminUserList.jsx';
// import AdminSeeUserDetails from './components/AdminSeeUserDetails.jsx';
// import PasswordReset from './components/PasswordReset.jsx'
// import ForgotPassword from './components/ForgotPassword.jsx'
// import AdminGetAllBooks from './components/AdminGetAllBooks.jsx';
import Home from './components/Home.jsx'
import AboutUs from './components/AboutUs.jsx'
import Term from './components/Term.jsx'
import FAQPage from './components/FAQPage.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'
import BookDetail from './components/BookDetail.jsx';
import Orders from './components/Orders.jsx';
import Likes from './components/Likes.jsx';
import ChangeProfile from './components/ChangeProfile.jsx';
import Checkout from './components/CheckOut.jsx';
import Payment from './components/Payment.jsx';
import OrderedList from './components/OrderedList.jsx';
import DashboardHome from './components/DashboardHome.jsx';
import RoleRoute from './components/RoleRoute.jsx';
import AdminCanSeeBookDetails from './components/AdminCanSeeBookDetails.jsx';
const AdminGetAllBooks = lazy(() => import('./components/AdminGetAllBooks.jsx'));
const PasswordReset = lazy(() => import('./components/PasswordReset.jsx'));
const ForgotPassword = lazy(() => import('./components/ForgotPassword.jsx'));
const AdminSeeUserDetails = lazy(() => import('./components/AdminSeeUserDetails.jsx'));
const AdminUserList = lazy(() => import('./components/AdminUserList.jsx'));
const BookShop = lazy(() => import('./components/BookShop.jsx'));
const Profile = lazy(() => import('./components/Profile.jsx'));






const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='login' element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path='register' element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      <Route path='dashboard' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardHome />} />
        <Route path='orders' element={<Orders />} />
        <Route path='likes' element={<Likes />} />
        <Route path='change-profile' element={<ChangeProfile />} />
        <Route path='ordered-list' element={<OrderedList />} />
        <Route path='check-out' element={<Checkout />} />
      </Route>



      {/* admin  */}
      <Route path='admin-user-list' element={
        <ProtectedRoute>
          <RoleRoute roles={['admin']}>
            <Suspense fallback={<div>Loading.......</div>}>
              <AdminUserList />
            </Suspense>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path='admin-user-list/user-details/:id' element={
        <ProtectedRoute>
          <RoleRoute roles={['admin']}>
            <Suspense fallback={<div>Loading.......</div>}>
              <AdminSeeUserDetails />
            </Suspense>
          </RoleRoute>
        </ProtectedRoute>
      } />

      <Route path='admin-get-all-books' element={
        <ProtectedRoute>
          <RoleRoute roles={['admin']}>
            <Suspense fallback={<div>Loading.......</div>}>
              <AdminGetAllBooks />
            </Suspense>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path='admin-get-all-books/book-details/:id' element={
        <ProtectedRoute>
          <RoleRoute roles={['admin']}>
            <AdminCanSeeBookDetails />
          </RoleRoute>
        </ProtectedRoute>
      } />

      {/* <Route path="admin-user-list" element={<AdminUserList />} /> */}
      {/* <Route path="admin-user-list/user-details/:id" element={<AdminSeeUserDetails />} /> */}


      <Route path='profile' element={
        <ProtectedRoute>
          <Suspense fallback={<div>Loading.......</div>}>
            <Profile />
          </Suspense>
        </ProtectedRoute>
      } />
      <Route index element={<Home />} />
      <Route path='bookshop' element={
        <Suspense fallback={<div>Loading.......</div>}>
          <BookShop />
        </Suspense>
      } />
      <Route path='book-detail/:id' element={<BookDetail />} />
      <Route path='payment' element={<Payment />} />
      <Route path='about-us' element={<AboutUs />} />
      <Route path='term' element={<Term />} />
      <Route path='faq-page' element={<FAQPage />} />
      <Route path='privacy-policy' element={<PrivacyPolicy />} />
      <Route path='password-reset' element={
        <Suspense fallback={<div>Loading.......</div>}>
          <PasswordReset />
        </Suspense>
      } />
      <Route path='forgotpassword/:id/:token' element={
        <Suspense fallback={<div>Loading.......</div>}>
          <ForgotPassword />
        </Suspense>
      } />
      <Route path='*' element={<Error />} />
    </Route >
  )
)


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
