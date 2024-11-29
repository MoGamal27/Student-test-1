import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

export default function TeacherList() {
  const { teacher, token, getAllTeacher } = useContext(AdminContext);

  useEffect(() => {
    if (token) {
      getAllTeacher();
      console.log(teacher);
    }
  }, [token]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Teachers</h1>
      <div className='flex flex-wrap w-full gap-4 pt-5 gap-y-5'>
        {teacher ? (
          teacher.map((item, index) => (
            <div
              className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group'
              key={index}
            >
              <img
                className='bg-indigo-50 group-hover:bg-primary transition-all duration-500 h-48 w-full object-cover'
                src={item.image}
                alt={item.name}
              />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>
                  {item.name}
                </p>
                <p className='text-zinc-600 text-sm'>{item.email}</p>
                <p className='text-zinc-600 text-sm'>
                  {item.bio ? item.bio : 'No bio available for this teacher.'}
                </p>
                <a
                  href={item.video}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 text-sm'
                >
                  Watch Intro Video
                </a>
                <p className='text-zinc-600 text-sm'>
                  Fees: {item.fees}$
                  </p>
              </div>
            </div>
          ))
        ) : (
          <p className='text-red-500'>No teachers available to display.</p>
        )}
      </div>
    </div>
  );
}
