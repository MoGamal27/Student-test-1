import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaWhatsapp } from "react-icons/fa";
import { RiFacebookCircleLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';


export default function Footer() {
  const { t } = useTranslation();


  return <>
  <footer className='pt-32'>
  <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
    <div className="md:flex md:justify-between">
      <div className="mb-6 md:mb-0">
        <div className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">{t('Arabe')}</span>
        </div>
        <div className="flex pt-4 gap-2">
            <NavLink to={'https://wa.me/972502926398'}>
              <FaWhatsapp className='text-3xl text-teal-700'/>
            </NavLink>
            <NavLink to={'https://www.facebook.com/profile.php?id=61553501452544&mibextid=ZbWKwL'}>
              <RiFacebookCircleLine className='text-3xl font-bold text-teal-700'/>
            </NavLink>
            <NavLink to={'https://www.facebook.com/profile.php?id=61553501452544&mibextid=ZbWKwL'}>
              <FaInstagram className='text-3xl font-bold text-teal-700'/>
            </NavLink>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6">
        <div>
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-black">{t('foter')}</h2>
          <ul className="text-gray-500 dark:text-black font-medium">
            <li className="mb-4">
              <p>{t('foter1')}</p>
            </li>
            <li className='pb-2'>
              <p>{t('foter2')}</p>
            </li>
            <li className='pb-2'>
              <p>{t('foter3')}</p>
            </li>
            <li className='pb-2'>
              <p>{t('foter4')}</p>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 uppercase dark:text-black">{t('foter5')}</h2>
          <ul className="text-gray-500 dark:text-black font-medium">
            <li className="mb-4">
              <Link>{t('foter6')}</Link>
            </li>
            <li>
              <Link>{t('foter7')}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-xl font-semibold text-gray-900 uppercase dark:text-black">{t('foter8')}</h2>
          <ul className="text-gray-500 dark:text-black font-medium">
            <li className="mb-4">
              <Link><span>{t('foter9')}</span> - +972 54-648-7767</Link>
            </li>
            <li className='mb-4'>
              <a target='_blank' href='http://localhost:5173'>{t('foter10')}</a>
            </li>
            <li>
              <Link>Email-eteachermode@gmail.com</Link>
            </li>
            <a target='_blank' href='http://localhost:5174/'>
              <li className='py-1'>Admin Panel</li>
            </a>
          </ul>
        </div>
      </div>
    </div>

    <hr />
    <p className='text-center pt-2'>© Copyright 2023 by Arabe</p>
  </div>
</footer>

  
  
  </>
}
