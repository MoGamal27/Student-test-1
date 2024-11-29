import React, { useTransition } from 'react';
import gruop from "/src/assets/assets_frontend/group_profiles.png"
import arrow from "/src/assets/assets_frontend/arrow_icon.svg"
import test from "/src/assets/assets_frontend/comp-video-bg.png"
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import videos from '/src/assets/assets_frontend/videoplayback.mp4'


export default function Header() {
    const { t } = useTranslation();

  
  return (
        <section>
        <div className='flex flex-col bg-sky-300 md:flex-row flex-wrap rounded-lg px-6  md:px-10 lg:px-20'>
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
            <p className='text-3xl md:text-4xl lg:text-5xl text-black font-semibold leading-tight md:leading-tight lg:leading-tight'>
            <p>{t('description')}</p>
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-black text-sm font-light'>
                <img className='w-28' src={gruop} alt="" />
                <p>{t('paragraph')}</p>
                <p> <br className='hidden sm:block' /></p>
            </div>
            <NavLink  to={'/Apponint'} className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all'>
                <h3>{t('Book')}</h3> <img className='w-3' src={arrow} alt="" />
            </NavLink>
        </div>
        <div className='md:w-1/2 sm:top-24 relative'>
        <video  width={800} height={400} src={videos} controls autoPlay loop muted></video>     
        </div>
    </div>
 </section>
  )
  
}
