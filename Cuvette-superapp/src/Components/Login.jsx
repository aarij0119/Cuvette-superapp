import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../Context/Slecetedcategory';

const Login = () => {
    const { setUser } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        mobile: ''
    });
    const [formError, setFormError] = useState({
        nameerror: '',
        emailerror: '',
        mobileerror: '',
        api: ''
    });

    const formvalidator = () => {
        const errors = {};
        const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.username) {
            errors.nameerror = "Name is required";
        } else if (formData.username.length < 3) {
            errors.nameerror = "Name must have 3 characters";
        } else if (Number(formData.username)) {
            errors.nameerror = "Username can't be a number";
        }

        if (!formData.email) {
            errors.emailerror = "Email is required";
        } else if (!emailValidator.test(formData.email)) {
            errors.emailerror = "Invalid Email";
        }

        if (!formData.mobile) {
            errors.mobileerror = "Mobile is required";
        } else if (formData.mobile.length !== 10) {
            errors.mobileerror = "Invalid Number";
        } else if (!Number(formData.mobile)) {
            errors.mobileerror = "Character can't be a number";
        }

        return errors;
    };

    const ChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const errors = formvalidator();

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('http://localhost:3000/login', formData);
                console.log("Data is", response.data);
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/categories');
            } catch (err) {
                if (err.response) {
                    console.error("Error during API call:", err.response.data.message);
                    setFormError(prevErrors => ({
                        ...prevErrors,
                        api: err.response.data.message
                    }));
                } else {
                    setFormError(prevErrors => ({
                        ...prevErrors,
                        api: 'Error during API call. Please try again later.'
                    }));
                }
            }
        } else {
            setFormError(errors);
        }
    };

    return (
        <div className="bg-zinc-900 flex items-center justify-center min-h-screen">
            <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-emerald-600 mb-4 text-center">Super app</h1>
                <p className="text-gray-400 mb-6 text-center">Log in account</p>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={ChangeHandler}
                            placeholder="Username"
                            className="w-full p-3 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <h5 className="text-red-600">{formError.nameerror}</h5>
                    </div>
                    <div className="mb-4">
                        <input
                            name="email"
                            type="text"
                            value={formData.email}
                            onChange={ChangeHandler}
                            placeholder="Email"
                            className="w-full p-3 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <h5 className="text-red-600">{formError.emailerror}</h5>
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={ChangeHandler}
                            placeholder="Mobile"
                            className="w-full p-3 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <h5 className="text-red-600">{formError.mobileerror}</h5>
                    </div>
                    {formError.api && (
                        <div className="mb-4">
                            <h5 className="text-red-600">{formError.api}</h5>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full text-white p-3 rounded-lg bg-emerald-600 hover:bg-emerald-700"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-gray-400 mt-6 text-center">
                    Don't have an account? <Link to={'/'} className="text-emerald-500 hover:font-bold">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
