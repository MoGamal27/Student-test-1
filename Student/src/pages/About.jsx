import React from 'react'
import logo from "/src/assets/assets_frontend/about-img.png"
import { useTranslation } from 'react-i18next';
export default function About() {
  const { t } = useTranslation();

  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>{t('about4')} <span className='text-gray-700 font-medium'>{t('about5')}</span></p>
      </div>
        
        <div className='my-10 pb-20  justify-center  flex flex-col md:flex-row gap-12'>
          <img className='w-full md:max-w-[380px]' src={logo} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
            <p>{t('about')}</p>
            <p>{t('about1')}</p>
            <p>{t('about2')}</p>
          </div>
        </div>
    </div>
  )
}
