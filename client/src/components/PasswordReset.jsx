import React, { useState } from "react";
import { TextField, Button, CircularProgress, Collapse, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import * as Yup from 'yup';

function PasswordReset() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError } = useSelector((state) => state.user);

    const validationSchema = Yup.object({
        email: Yup.string().required('Email is required')
    });




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate({ email }, { abortEarly: false });
            setErrors({});

            const res = await fetch('https://bookstore-ybgj.onrender.com/api/auth/sendpasswordlink', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (data.status === true) {
                setEmail('')
                setMessage(true)
            } else {
                console.log('Invalid User');
            }

        } catch (err) {
            const formattedErrors = {};
            if (err.inner) err.inner.forEach((error) => formattedErrors[error.path] = error.message)
            setErrors(formattedErrors);
            console.log('Validation Error:', formattedErrors);
        }
    };



    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <header className="mb-6 text-center">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
                        Forgot Password
                    </h1>
                    <p className="text-gray-500">
                        Please enter your email to reset password.
                    </p>
                </header>

                <div className="h-10">
                    {message ? <p style={{ color: "green", fontWeight: "bold", height: '40px' }}>Password Reset Link has been sent Successfully!</p> : ""}

                </div>
                {/* <Collapse in={!!isError}>
                    <Alert severity="error" className="mb-6 rounded-xl font-medium shadow-sm">
                        {typeof isError === 'string' ? isError : isError?.message || 'An error occurred'}
                    </Alert>
                </Collapse> */}

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
                            type="email"
                            label="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

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
                                "send"
                            )}
                        </Button>
                    </div>
                </form>

                <div className="mt-8 text-center border-t pt-6">
                    <p className="text-gray-600">
                        Go back to login? {' '}
                        <Link
                            to="/login"
                            className="text-emerald-600 font-semibold underline underline-offset-4 hover:text-emerald-800 transition-colors"
                        >
                            Click here
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default PasswordReset;
