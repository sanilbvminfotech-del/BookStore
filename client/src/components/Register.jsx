import React, { useRef, useState } from 'react';
import { TextField, Radio, RadioGroup, FormControlLabel, FormLabel, Button, styled, Collapse, Alert, alpha } from '@mui/material';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAPI } from '../slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const PinkSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: pink[600],
        '&:hover': {
            backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: pink[600],
    },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

function Register() {

    const [formData, setFormData] = useState({
        firstname: "", lastname: "", hobbies: "",
        gender: "", email: "", password: "", age: "", username: "", checkRolePassword: ""
    });
    const [errors, setErrors] = useState({});
    // const [checkRolePassword, setCheckRolePassword] = useState('');
    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef(null);
    const [showPassword, setShowPassword] = useState(true);
    const [backError, setBackError] = useState('');
    const [isToggle, setIsToggle] = useState(false);
    console.log(isToggle, 'isToggle');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(errors, 'errorserrorserrors 33');

    const { isLoading, isError } = useSelector(state => state.user);


    const validationSchema = Yup.object({
        firstname: Yup.string().min(3, 'Firstname must be atleast 3 char long').required('Firstname is required'),
        lastname: Yup.string().min(3, 'Lastname must be atleast 3 char long').required('Lastname is required'),
        age: Yup.number().typeError('Age must be a number').moreThan(18, 'Age must be at least 19').lessThan(100, 'Age must be less than 100').required('Age is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        hobbies: Yup.string().required('Hobbies are required'),
        username: Yup.string().min(3, 'UserName must be atleast 3 char long').required('UserName is required, which is unique')
    });

    // console.log(isError, 'isError-isError');
    // console.log(backError, 'backError-backError');


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setFileName(file.name);
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({});

            const data = new FormData();
            for (const key in formData) {
                data.append(key, formData[key])
            }
            const file = fileInputRef.current?.files[0];
            if (file) {
                data.append('image', file)
            }


            try {
                const resultAction = await dispatch(registerUserAPI(data));
                if (registerUserAPI.fulfilled.match(resultAction)) {
                    setFormData({
                        firstname: "", lastname: "", hobbies: "",
                        gender: "", email: "", password: "", age: "", username: "", checkRolePassword: ""
                    });
                    setFileName("");
                    navigate('/login');
                }
            } catch (error) {
                console.log(error, 'register error');
                setBackError(error)
            }
        } catch (err) {
            const formattedErrors = {};
            if (err.inner) err.inner.forEach((err) => formattedErrors[err.path] = err.message);
            setErrors(formattedErrors);
            console.log('Errors by field:', formattedErrors);
        }
    }



    return (
        <>
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <header className="mb-10 border-b pb-6 text-center md:text-left">
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Create Account</h1>
                        <small className="text-gray-500 mt-2">Join us today! Please fill in your details below.</small>
                    </header>


                    <Collapse in={isError}>
                        <Alert
                            severity='error'
                            className="mb-6 rounded-xl font-medium shadow-sm"
                        >
                            {isError?.message ? isError?.message : isError}
                        </Alert>
                    </Collapse>


                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <TextField
                                fullWidth
                                error={!!errors.firstname}
                                helperText={errors.firstname}
                                name="firstname" label="First Name" onChange={handleChange} value={formData.firstname}
                            />
                            <TextField
                                fullWidth
                                error={!!errors.lastname}
                                helperText={errors.lastname}
                                name="lastname" label="Last Name" onChange={handleChange} value={formData.lastname}
                            />
                            <TextField
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email}
                                name="email" label="Email Address" onChange={handleChange} value={formData.email}
                                className="md:col-span-1"
                            />
                            <TextField
                                fullWidth
                                error={!!errors.hobbies}
                                helperText={errors.hobbies || "e.g. running, climbing, music"}
                                name="hobbies" label="Hobbies" onChange={handleChange} value={formData.hobbies}
                            />
                            <TextField
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password || "click on input to show password"}
                                name="password" type={showPassword ? "text" : "password"} label="Password" onChange={handleChange} value={formData.password}
                                onClick={() => setShowPassword(prev => !prev)}
                            />
                            <TextField
                                fullWidth
                                error={!!errors.age}
                                helperText={errors.age}
                                name="age" type="number" label="Age" onChange={handleChange} value={formData.age}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 items-start">
                            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 h-19 flex flex-col justify-center">
                                <FormLabel
                                    component="legend"
                                    className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1"
                                >
                                    Gender Selection
                                </FormLabel>
                                <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio size="small" color="success" />}
                                        label={<span className="text-sm">Female</span>}
                                    />
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio size="small" color="success" />}
                                        label={<span className="text-sm">Male</span>}
                                    />
                                    <FormControlLabel
                                        value="other"
                                        control={<Radio size="small" color="success" />}
                                        label={<span className="text-sm">Other</span>}
                                    />
                                </RadioGroup>

                                {errors.gender && (
                                    <p className="text-red-500 text-[10px] absolute -bottom-5 ml-1 font-medium">
                                        {errors.gender}
                                    </p>
                                )}
                            </div>


                            <TextField
                                fullWidth
                                error={!!errors.username}
                                helperText={errors.username}
                                name="username"
                                label="User Name"
                                onChange={handleChange}
                                value={formData.username}
                                variant="outlined"
                            />
                        </div>


                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-2">
                            <Button
                                component="label"
                                variant="outlined"
                                startIcon={<CloudUploadIcon />}
                                className="normal-case border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 px-6 py-2 transition-all"
                            >
                                {fileName ? "Change Image" : "Upload Profile Photo"}
                                <VisuallyHiddenInput
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </Button>
                            {fileName ? (
                                <span className="text-sm text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                    ✓ {fileName}
                                </span>
                            ) : (
                                <span className="text-xs text-slate-400 italic">Max size: 2MB (JPG, PNG)</span>
                            )}
                        </div>

                        <div className="flex items-start gap-4 w-full">
                            <div className="flex flex-col items-center ">
                                <FormLabel className="text-[10px] font-bold uppercase text-slate-400 mb-1">
                                    Toggle
                                </FormLabel>
                                <Switch
                                    {...label}
                                    color="warning"
                                    checked={isToggle}
                                    onChange={() => setIsToggle(prev => !prev)}
                                />
                            </div>
                            {isToggle &&
                                <div className="w-75">
                                    <TextField
                                        fullWidth
                                        error={!!errors.checkRolePassword}
                                        helperText={errors.checkRolePassword}
                                        name="checkRolePassword"
                                        type={showPassword ? "text" : "password"}
                                        label="Enter secret password"
                                        onChange={handleChange}
                                        value={formData.checkRolePassword}
                                        variant="outlined"
                                        onClick={() => setShowPassword(prev => !prev)}
                                    />
                                </div>
                            }
                        </div>


                        <div >
                            <Button
                                type='submit'
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={isLoading}
                                className={`${isLoading ? 'bg-slate-300' : 'bg-emerald-600 hover:bg-emerald-700'} py-4 text-lg font-black shadow-xl rounded-xl transition-all normal-case`}
                            >
                                {isLoading ? "Creating your account..." : "Register Now"}
                            </Button>
                        </div>
                    </form>

                    <div className='mt-1 text-center pt-6 border-t border-slate-50'>
                        <p className="text-slate-500 font-medium">
                            Already have an account?{' '}
                            <Link to='/login' className='text-emerald-600 font-bold hover:text-emerald-800 underline underline-offset-4 transition-colors ml-1'>
                                Log in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register