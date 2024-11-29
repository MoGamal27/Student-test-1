import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import dropdown from "/src/assets/assets_frontend/dropdown_icon.svg";
import { assets } from '../assets/assets_frontend/assets';
import { UserContext } from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LnaguageSwitcher';
import yalla from '/src/assets/assets_frontend/2yalla.png'

export default function Navbar() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { user, getUserById } = useContext(UserContext);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const initializeUser = () => {
            if (token && typeof token === 'string') {
                try {
                    const decodedToken = jwtDecode(token);
                    const id = decodedToken?.id ? parseInt(decodedToken.id, 10) : null;
                    setUserId(id);
                } catch (error) {
                    console.error('Invalid token:', error);
                    localStorage.removeItem('token');
                    setToken(null);
                    setUserId(null);
                }
            } else {
                setToken(null);
                setUserId(null);
            }
        };

        initializeUser();
    }, [token]);

    useEffect(() => {
        if (token && userId) {
            getUserById(userId);
        }
    }, [token, userId, getUserById]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUserId(null);
        navigate('/');
    };

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <NavLink to={'/'}>
                <div>
                <h2 className='cursor-pointer justify-center items-center flex font-semibold text-2xl'><img className='w-12 flex' src={yalla} alt="" /> {t('Arabe')}</h2>
                </div>
            </NavLink>
            
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to={'/'}>
                    <li className='py-1'>{t('Home')}</li>
                </NavLink>
                <NavLink to={'/about'}>
                    <li className='py-1'>{t('aboutus')}</li>
                </NavLink>
                <NavLink to={'/contact'}>
                    <li className='py-1'>{t('Contact')}</li>
                </NavLink>
             
            </ul>
            
            <div className='flex items-center gap-4'>     
                <LanguageSwitcher/>
                {token && user ? (
                    <div className='flex items-center gap-2 cursor-pointer group relative'>
                        <span className='font-medium'>{user.name}</span>
                        <img className='w-2.5' src={dropdown} alt="" />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                <p onClick={() => navigate('my-appointment')} className='hover:text-black cursor-pointer'>
                                    {t('MyAppointment')}
                                </p>
                                <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>
                                    {t('My Profile')}
                                </p>
                                <p onClick={handleLogout} className='hover:text-black cursor-pointer'>
                                    {t('Logout')}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    
                    <div className='flex'>
                         <div>
                        <button   onClick={() => navigate('/login')} className='font-semibold text-black px-2 py-1 hover:bg-sky-800 hover:text-white rounded-full hidden md:block'>Sign in</button>
                        </div>
                      {/*  <button 
                        onClick={() => navigate('/login')} 
                        className='font-semibold text-black px-2 py-1 hover:bg-sky-800 hover:text-white rounded-full hidden md:block'>
                        Create account
                         </button> */} 
                    </div>
                    
                )}
                
                <img 
                    onClick={() => setShowMenu(true)} 
                    className='w-6 md:hidden' 
                    src={assets.menu_icon} 
                    alt="" 
                />
                
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className='flex items-center justify-end px-5 py-6'>
                        <img 
                            className='w-7' 
                            onClick={() => setShowMenu(false)} 
                            src={assets.cross_icon} 
                            alt="" 
                        />
                    </div>
                    <ul className='flex flex-col items-start gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to={'/'}>
                            <p className='px-4 py-2 rounded inline-block'>{t('Home')}</p>
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to={'/about'}>
                            <p className='px-4 py-2 rounded inline-block'>{t('aboutus')}</p>
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to={'/contact'}>
                            <p className='px-4 py-2 rounded inline-block'>{t('Contact')}</p>
                        </NavLink>

                      {/*  <a target='_blank' href='http://localhost:5174/'>
                            <li className='py-1 border text-xs border-primary p-1 rounded-full'>Admin Panel</li>
                    </a> */}

                      {/* <NavLink onClick={() => setShowMenu(false)} to={'/Login'}>
                       <p className='px-4 py-2 rounded inline-block'>Create account</p>
                       </NavLink>*/}
                        <LanguageSwitcher/>
                    </ul>
                </div>
            </div>
        </div>
    );
}
