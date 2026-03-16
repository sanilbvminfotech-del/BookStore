import React, { useEffect, useState } from 'react'
import { TextField, Button, CircularProgress, Collapse, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup'

function ForgotPassword() {

  const { id, token } = useParams();
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  // const dispatch = useDispatch();


  const { isLoading, isError } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const userValidationCheck = async () => {
    console.log('hello');

    const res = await fetch(`http://localhost:8000/api/auth/forgotpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    console.log(data, 'data');

    if (data.status === true) {
      console.log('user valid');
    } else {
      navigate('*')
    }
  }


  useEffect(() => {
    userValidationCheck();
  }, [])





  const validationSchema = Yup.object({
    password: Yup.string().min(6, 'must be 6 character long!').required('Password is required')
  });




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate({ password }, { abortEarly: false });
      setErrors({});

      const res = await fetch(`http://localhost:8000/api/auth/change-new-password/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });
      const data = await res.json();

      console.log(data);
      if (data.status) {
        setPassword('')
        setMessage(true)
        navigate('/login')
        console.log('user password has beeeeeeeennnnn chageeeee');
      } else {
        console.log('user password not chage');
        navigate('*');
      }

    } catch (err) {
      const formattedErrors = {};
      if (err.inner) err.inner.forEach((error) => formattedErrors[error.path] = error.message)
      setErrors(formattedErrors);
      console.log('Validation Error:', formattedErrors);
    }
  };



  return (
    <>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
          <header className="mb-6 text-center">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
              Enter new Password
            </h1>
            <p className="text-gray-500">
              Please enter your password to reset.
            </p>
          </header>

          <div className="h-10">
            {message ? <p style={{ color: "green", fontWeight: "bold", height: '40px' }}>Password Reset Successfully!</p> : ""}

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
                error={!!errors.password}
                helperText={errors.password}
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                onClick={() => setShowPassword(prev => !prev)}
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
                  "save password"
                )}
              </Button>
            </div>
          </form>

          {/* <div className="mt-8 text-center border-t pt-6">
            <p className="text-gray-600">
              Go back to login? {' '}
              <Link
                to="/login"
                className="text-emerald-600 font-semibold underline underline-offset-4 hover:text-emerald-800 transition-colors"
              >
                Click here
              </Link>
            </p>
          </div> */}

        </div>
      </div>
    </>
  )
}

export default ForgotPassword