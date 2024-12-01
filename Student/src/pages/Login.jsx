import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function Login() {
    const [state, setState] = useState('login');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [currState, setCurrState] = useState("Sign up");


    const validateForm = () => {
        const newErrors = {};
        if (state === 'Sign Up' && !formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
       
       if (state === 'Sign Up' && !formData.phone.trim()) { 
        newErrors.phone = 'Phone is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        setApiError(''); 
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setApiError('');

        const url = state === 'Sign Up' 
            ? 'https://booking-lessons-production.up.railway.app/api/auth/signup' 
            : 'https://booking-lessons-production.up.railway.app/api/auth/signin';
            
        const payload = state === 'Sign Up' 
            ? formData 
            : { email: formData.email, password: formData.password };

        try {
            const response = await axios.post(url, payload);
            localStorage.setItem('token', response.data.token);
            if (response.data.data) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            navigate('/');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 
                'An error occurred. Please try again.';
            setApiError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleState = () => {
        setState(prev => prev === 'Sign Up' ? 'Login' : 'Sign Up');
        setFormData({ name: '', email: '', phone: '' ,password: '' });
        setErrors({});
        setApiError('');
    };

    return (
        <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
                <p className='text-2xl font-semibold'>
                    {state === 'Sign Up' ? t("Create Account") : t("Login")}
                </p>
                <p>{t('toapp1')} {state === 'Sign Up' ? t("sign up") : t("login")} {t('toapp')}</p>

                {apiError && (
                    <div className="w-full p-3 text-red-500 bg-red-50 rounded-md text-center">
                        {apiError}
                    </div>
                )}

                {state === 'Sign Up' && (
                    <div className='w-full'>
                        <p>{t('fullname')}</p>
                        <input 
                            name="name"
                            className={`border ${errors.name ? 'border-red-500' : 'border-zinc-300'} 
                                rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary`}
                            type="text"
                            onChange={handleInputChange}
                            value={formData.name}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        
                    <p>{t('phone')}</p>
                    <input 
                        name="phone"
                        className={`border ${errors.phone ? 'border-red-500' : 'border-zinc-300'} 
                            rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary`}
                        type="text"
                        onChange={handleInputChange}
                        value={formData.phone}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                )}

                <div className='w-full'>
                    <p>{t('email')}</p>
                    <input 
                        name="email"
                        className={`border ${errors.email ? 'border-red-500' : 'border-zinc-300'} 
                            rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary`}
                        type="email"
                        onChange={handleInputChange}
                        value={formData.email}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className='w-full'>
                    <p>{t('password')}</p>
                    <input 
                        name="password"
                        className={`border ${errors.password ? 'border-red-500' : 'border-zinc-300'} 
                            rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary`}
                        type="password"
                        onChange={handleInputChange}
                        value={formData.password}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <button 
                    className={`bg-primary text-white w-full py-2 rounded-md text-base 
                        ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90'}`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                            </svg>
                            {state === 'Sign Up' ? "Creating Account..." : "Logging in..."}
                        </span>
                    ) : (
                        state === 'Sign Up' ? t("Create Account") : t("Login")
                    )}
                </button>
                <p className="w-full">
                    {state === 'Sign Up' ? t('haveaccout') : t('Createaccount')}
                    <span 
                        onClick={toggleState}
                        className='text-primary underline cursor-pointer ml-1 hover:text-primary/80'
                    >
                        {state === 'Sign Up' ? t('Loginhere') : t('Loginhere1')}
                    </span>
                </p>
                <p>Forget Password ? <button onClick={()=> navigate('/reset')} className='text-primary underline cursor-pointer ml-1 hover:text-primary/80'>Click here</button></p>
            </div>
        </form>
    );
}
