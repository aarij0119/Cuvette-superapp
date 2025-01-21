import React, { useContext, useState } from 'react';
import img1 from '../assets/images/Discover.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../Context/Slecetedcategory';


const Register = () => {
  const { handleUserChange } = useContext(Context);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({
    name: '',
    username: '',
    email: '',
    mobile: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    mobile: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name) {
      errors.name = 'Field is required';
    } else if (formData.name.length < 3) {
      errors.name = 'It should have a minimum of 3 characters';
    } else if (Number(formData.name)) {
      errors.name = "Name can't be a number";
    }

    if (!formData.username) {
      errors.username = 'Field is required';
    } else if (formData.username.length < 3) {
      errors.username = "It should have a minimum of 3 characters";
    } else if (Number(formData.username)) {
      errors.username = "Username can't be a number";
    }

    if (!formData.email) {
      errors.email = 'Field is required';
    } else if (!emailPattern.test(formData.email)) {
      errors.email = "Invalid email";
    }

    if (!formData.mobile) {
      errors.mobile = 'Field is required';
    } else if (formData.mobile.length !== 10) {
      errors.mobile = "Invalid number";
    } else if (!Number(formData.mobile)) {
      errors.mobile = "Character can't be a number";
    }

    return errors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3000/register', formData);
        console.log('done', response.data);
        handleUserChange(response.data);
        navigate('/categories');
      } catch (error) {
        console.error('Error during API call:', error);
        setFormErrors(prevErrors => ({
          ...prevErrors,
          api: 'Error during API call. Please try again later.'
        }));
      }
      setFormData({
        name: '',
        username: '',
        email: '',
        mobile: ''
      });
      setFormErrors({
        name: '',
        username: '',
        email: '',
        mobile: '',
      });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className='w-full min-h-screen lg:h-screen bg-zinc-900 flex lg:flex-row md:flex-col'>
      <div className='hidden lg:block w-1/2 overflow-hidden relative'>
        <img className='w-full h-full object-cover' src={img1} alt="Discover" />
        <div className='absolute bottom-16 left-8'>
          <h1 className='text-white text-6xl font-bold'>Discover new things on <br />Superapp</h1>
        </div>
      </div>
      <div className='lg:w-1/2 w-full flex justify-center flex-col gap-3 pt-12 lg:pt-0 px-4'>
        <div className='mb-2'>
          <h1 className='font-mono text-5xl flex items-center justify-center tracking-tighter text-emerald-500 mb-2'>Super app</h1>
          <h4 className='flex items-center justify-center text-white'>Create your new account</h4>
        </div>
        <div className='flex flex-col gap-4 justify-start items-center'>
          <form onSubmit={submitHandler} className='md:w-3/5 w-full flex flex-col gap-4'>
            <input
              value={formData.name}
              onChange={handleChange}
              className='w-full p-2.5 bg-[#292929] outline-none text-white rounded focus:border-emerald-500 focus:border-2'
              type='text'
              placeholder='Name'
              name='name'
            />
            {formErrors.name && <span className='text-red-500 font-bold'>{formErrors.name}</span>}

            <input
              value={formData.username}
              onChange={handleChange}
              className='w-full p-2.5 bg-[#292929] outline-none text-white rounded focus:border-emerald-500 focus:border-2'
              type='text'
              placeholder='Username'
              name='username'
            />
            {formErrors.username && <span className='text-red-500 font-bold'>{formErrors.username}</span>}

            <input
              value={formData.email}
              onChange={handleChange}
              className='w-full p-2.5 bg-[#292929] outline-none text-white rounded focus:border-emerald-500 focus:border-2'
              type='text'
              placeholder='Email'
              name='email'
            />
            {formErrors.email && <span className='text-red-500 font-bold'>{formErrors.email}</span>}

            <input
              value={formData.mobile}
              onChange={handleChange}
              className='w-full p-2.5 bg-[#292929] outline-none text-white rounded focus:border-emerald-500 focus:border-2'
              type='text'
              placeholder='Mobile'
              name='mobile'
            />
            {formErrors.mobile && <span className='text-red-500 font-bold'>{formErrors.mobile}</span>}

            {formErrors.api && <span className='text-red-500 font-bold'>{formErrors.api}</span>}

            <div className='flex gap-2 mb-2.5'>
              <input type="checkbox" required />
              <h4 className='text-sm text-white'>Share my registration data with SuperApp</h4>
            </div>

            <input className='bg-emerald-500 p-2 rounded-full text-white cursor-pointer hover:bg-emerald-600 text-lg' type="submit" value="Sign Up" />
          </form>
          <div className='flex gap-2 text-white'>
            <h3>Already have an account?</h3>
            <div className='text-emerald-500 rounded-full font-extrabold'>
              <Link to={'/login'}>Login</Link>
            </div>
          </div>
        </div>
        <div className='mx-auto'>
          <h4 className='text-white text-sm'>By clicking on Sign up, you agree to Superapp <span className='text-emerald-500'>Terms and Conditions of Use</span></h4>
        </div>
        <h4 className='text-white text-sm text-center'>
          To learn more about how Superapp collects, uses, shares and protects your <br /> personal data, please head to Superapp's <b className='text-emerald-500'>Privacy Policy</b>.
        </h4>
      </div>
    </div>
  );
};

export default Register;
