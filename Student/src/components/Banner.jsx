import React from 'react'
import logo1 from "/src/assets/assets_frontend/comp-video-bg.png"
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';


export default function Banner() {

    const navigate = useNavigate()
    const { t } = useTranslation();

  return (
    <div className='flex items-center justify-center bg-sky-200 p-10 rounded-lg px-6 sm:px-10  md:px-14 lg:px-12 my-20 md:mx-10'>
        <div>
            <div>
                <p className='font-bold text-2xl'>{t('learn')}</p>
                <p className='font-semibold mt-4'>{t('learn1')}<span>{t('learn2')}</span> </p>
            </div>
            <button onClick={()=> navigate('/about')} className='bg-sky-400 text-sm sm:text-base  text-black font-semibold px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>{t('learn3')}</button>
        </div>


        <div className='hidden items-center justify-center md:block w-[1980px] '>
             <img className='w-full  'src={logo1} alt="" />
        </div>
    </div>
  )
}
