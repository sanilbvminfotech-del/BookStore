import React, { useEffect, useState } from "react";
import { TextField, Button, CircularProgress, Collapse, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAPI } from "../slices/userSlice";
import * as Yup from 'yup';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openEye, setOpenEye] = useState(false)
  // console.log(openEye,'openEye');

  const { isLoading, isError } = useSelector((state) => state.user);

  const validationSchema = Yup.object({
    email: Yup.string().required('Email or Username is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const resultAction = await dispatch(loginUserAPI(formData));
      if (loginUserAPI.fulfilled.match(resultAction)) {
        setFormData({
          email: "", password: ""
        });
        navigate('/dashboard');
      }
    } catch (err) {
      const formattedErrors = {};
      if (err.inner) err.inner.forEach((err) => formattedErrors[err.path] = err.message);
      setErrors(formattedErrors);
      console.log('Errors by field:', formattedErrors);
    }
  };



  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500">
            Please enter your credentials to login.
          </p>
        </header>

        <Collapse in={isError}>
          <Alert severity="error" className="mb-6 rounded-xl font-medium shadow-sm">
            {isError?.message ? isError?.message : isError}
          </Alert>
        </Collapse>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-5">
            <TextField
              fullWidth
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email}
              name="email"
              type="text"
              label="Email or Username"
              onChange={handleChange}
              value={formData.email}
            />
            <div className="relative">
              <TextField
                fullWidth
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password}
                name="password"
                type={openEye ? "text" : "password"}
                label="Password"
                onClick={() => setShowPassword(prev => !prev)}
                onChange={handleChange}
                value={formData.password}
              />
              <span onClick={() => setOpenEye(!openEye)} className="absolute top-0 right-0 h-full  w-10">
                {openEye ? <FaEye className=" top-0 right-6  h-full w-5 " /> : <FaEyeSlash  className=" top-0 right-6  h-full w-5 " />}
              </span>
            </div>

          </div>

          <div className="pt-2">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              className={`${isLoading
                ? "bg-gray-400"
                : "bg-emerald-600 hover:bg-emerald-700"
                } py-3.5 text-white text-lg font-bold rounded-lg shadow-md transition-all normal-case`}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Log in"
              )}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center border-t pt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-600 font-semibold underline underline-offset-4 hover:text-emerald-800 transition-colors"
            >
              Create one here
            </Link>
          </p>
        </div>
        <div className="mt-5 text-center w-50 m-auto border-t pt-4">
          <p className="text-gray-600">
            <Link
              to="/password-reset"
              className="text-emerald-600 font-semibold underline underline-offset-4 hover:text-emerald-800 transition-colors"
            >
              Forgot Password? {" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
