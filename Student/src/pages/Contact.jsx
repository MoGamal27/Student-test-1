import React from 'react'
import header from "/src/assets/assets_frontend/contact-header.jpg"
import { MdOutlinePhone } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { NavLink } from 'react-router-dom';


export default function Contact() {
  return (
    <div className='pb-16'>
      <div className='header'>
      </div>
      <div className='flex justify-center w-9/6 flex-col md:flex-row p-4 bg-sky-300 items-center  sm:gap-10'>
      <div className=' justify-center text-center flex flex-col md:flex-row'>
      <NavLink to={'https://wa.me/972502926398'}><p className='flex font-semibold gap-1 justify-center items-center'><MdOutlinePhone/> WhatsApp</p></NavLink>
      </div>
      <div className='justify-center text-center  flex flex-col md:flex-row'>
      <NavLink to={'https://wa.me/972502926398'}><p className='flex font-semibold gap-1 justify-center items-center'><TfiEmail/> eteachermode@gmail.com</p></NavLink>

        </div>
   </div>
    </div>
  )
}
