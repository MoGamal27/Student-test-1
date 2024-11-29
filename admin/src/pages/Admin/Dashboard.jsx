import React, {useContext, useEffect} from 'react'
import { assets } from '../../assets/assets'
import logo from '/src/assets/patient_icon.svg'
import { AdminContext } from '../../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { TeacherContext } from '../../context/TeacherContext';


export default function Dashboard() {
  const { token, teacher , bookings ,users, getAllUsers, getAllTeacher, getAllBookings ,completeBooking, deleteBooking } = useContext(AdminContext)
  const { addPoints } = useContext(TeacherContext);
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }
  useEffect(() => {
    if (token) {
      //getAllUsers()
      //getAllTeacher()
      getAllBookings()
    }
  }, [token])
  return (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.people_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{teacher.length}</p>
            <p className='text-gray-400'>Teacher</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{bookings.length}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={logo} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{users.length}</p>
            <p className='text-gray-400'>Student</p>
          </div>
        </div>
      </div>

      <div className='bg-white mt-10'>
        <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {bookings && bookings.length > 0 ? (
            bookings.map((item, index) => (
              <div className='flex items-center justify-between px-6 py-3 hover:bg-gray-100' key={index}>
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800'>Teacher: {item.teacher.name}</p>
                  <p className='text-gray-800'>Student: {item.student.name}</p>
                  <p className='text-gray-600'>Date: {item.slotDate}</p>
                  <p className='text-gray-600'>Time: {item.slotTime}</p>
                </div>
                <div className='flex gap-2'>
                  <button onClick={() => deleteBooking(item.id)} className='cursor-pointer bg-red-400 text-white text-sm font-medium px-2 py-1 rounded'>Cancel</button>
                  <button onClick={() => completeBooking(item.id)} className='cursor-pointer bg-green-400 text-white text-sm font-medium px-2 py-1 rounded'>Complete</button>
                </div>
              </div>
            ))
          ) : (
            <p className='px-6 py-4 text-gray-500'>No bookings available</p>
          )}
        </div>
      </div>
    </div>
  )
}
