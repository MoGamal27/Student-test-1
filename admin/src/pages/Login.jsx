import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken, backendUrl, role, setRole } = useContext(AdminContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (state === "Admin") {
                // Make login request
                const { data } = await axios.post(`${backendUrl}/admin/login`, { email, password });
                if (data.success) {
                    // Store the token in both state and localStorage
                    setToken(data.token); 
                    localStorage.setItem('token', data.token); // Store token in localStorage
                    toast.success('Login successful');
                    setRole('admin')
                    navigate('/teacher-list');
                } else {
                    toast.error(data.message);
                }
            }else{

                // Make login request
                const { data } = await axios.post(`${backendUrl}/admin/loginTeacher`, { email, password });
                if (data.success) {
                    // Store the token in both state and localStorage
                    setToken(data.token); 
                    localStorage.setItem('token', data.token); // Store token in localStorage
                    toast.success('Login successful');
                    setRole('teacher')
                    navigate('/teacher-appointemnet');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error('Login failed. Please try again.');
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'><span className='text-primary'> {state} </span> Login </p>
                <div className='w-full'>
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" autoComplete='current-email' required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" autoComplete='current-password' required />
                </div>
                <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
                {
                    state === 'Admin'
                        ? <p>Teacher Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Teacher')}>Click here</span></p>
                        : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
                }
            </div>
        </form>
    );
}
