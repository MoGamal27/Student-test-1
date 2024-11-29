import React from 'react'
import { GiTeacher } from "react-icons/gi";
import { FaBookOpen } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { useTranslation } from 'react-i18next';

export default function SpecialityMenu() {
  const { t } = useTranslation();

  return (
  <section className='flex max-w-7x1 mx-auto px-6 sm:px-4 lg:px-12 items-center flex-col sm:flex-row'>
        <div className='flex flex-col items-center gap-4 py-6 text-gray-800'>
      <div className='flex gap-8 rounded-lg mx-auto p-16  px-4 sm:px-6 lg:px-8 items-center flex-col sm:flex-row'>
    <div className='justify-center items-center flex'>
    <p><span className='font-bold'>{t('Menu')}</span> <br />{t('Menu1')}</p>
    <div className='flex border-2 bg-teal-800 text-white text-3xl rounded-full p-4'>
     <GiTeacher/>
    </div>
    </div>
    <div className='justify-center items-center flex'>
    <p><span className='font-bold '>{t('Menu2')}</span> <br /> {t('Menu3')} </p>
    <div className='flex border-2 bg-teal-800 text-white text-3xl rounded-full p-4'>
     <FaBookOpen/>
    </div>
    </div>
    <div className='justify-center items-center flex'>
    <p><span className='font-bold '>{t('Menu4')}</span> <br /> {t('Menu5')}</p>
    <div className='flex border-2 bg-teal-800 text-white text-3xl rounded-full p-4'>
     <SiBookstack/>
    </div>
    </div>
      </div>
    </div>
  </section>
  )
}
