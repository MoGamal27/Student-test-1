import React, { useState, useContext, useEffect } from 'react';
import logo from '/src/assets/assets_frontend/upload_area.png';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../context/UserContext';
import { jwtDecode } from 'jwt-decode';

export default function MyProfile() {
  const { user, getUserById, getCompletedCourses } = useContext(UserContext);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [completedCourses, setCompletedCourses] = useState([]);
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id ? parseInt(decodedToken.id, 10) : null;
  const { t } = useTranslation();

  useEffect(() => {
    if (token) {
      getUserById(userId);
      fetchCompletedCourses();
    }
  }, [token]);

  const fetchCompletedCourses = async () => {
    try {
      const response = await getCompletedCourses(userId);
      if (response.success) {
        setCompletedCourses(response.data);
      }
    } catch (error) {
      console.error('Error fetching completed courses:', error);
    }
  };

  return (
    <div className='max-w-lg mx-4 pt-16 sm:mx-[5%] flex flex-col gap-2 text-sm'>
      <p className='font-medium text-3xl text-neutral-800 mt-4'>{user.name}</p>
      <hr className='bg-zinc-400 h-[1px] border-none' />

      {/* User Info Section */}
      <div>
        <p className='text-neutral-500 underline mt-3'>{t('foter8')}</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>{t('email')}</p>
          <p className='text-blue-500'>{user.email}</p>
        </div>
        <div className='mt-4'>
          <p className='font-medium'>{t('Point')} : {user.point}</p>
        </div>
      </div>

      {/* Completed Courses Section */}
      <div className='mt-8'>
        <h3 className='text-xl font-medium mb-4'>{t('Subscribed Courses')}</h3>
        <div className='grid gap-4'>
          {completedCourses.map((course) => (
            <div 
              key={course.id} 
              className='bg-sky-200 p-4 rounded-lg shadow flex items-center gap-4'
            >
              <img 
                src={course.Teacher.image} 
                alt={course.Teacher.name}
                className='w-16 h-16 rounded-full object-cover'
              />
              <div>
                <p className='font-medium capitalize'>{course.Teacher.name}</p>
                <p className='text-sm text-black font-semibold'>
                  Date: {course.slotDate}
                  <br />
                  Time: {course.slotTime}
                </p>
              </div>
            </div>
          ))}
          
          {completedCourses.length === 0 && (
            <p className='text-gray-500 text-center py-4'>
              {t('noCompletedCourses')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
