import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route , Routes} from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard';
import AllApontments from './pages/Admin/AllApontments';
import AddTeacher from './pages/Admin/AddTeacher';
import TeacherList from './pages/Admin/TeacherList';
import TeacherAppointement from './pages/Teacher/TeacherAppointement';
import TeacherProfile from './pages/Teacher/TeacherProfile';
import Points from './pages/Admin/points';

export default function App() {

  const { token } = useContext(AdminContext)

  return token ?  (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
        <Navbar/>
        <div className='flex items-start'>
          <Sidebar/>
          <Routes>
            <Route path='/' element={<></>}/>
            <Route path='/admin-dashboard' element={<Dashboard/>}/>
            <Route path='/all-appointments' element={<AllApontments/>}/>
            <Route path='/add-teacher' element={<AddTeacher/>}/>
            <Route path='/teacher-appointemnet' element={<TeacherAppointement/>}/>
            <Route path='/teacher-list' element={<TeacherList/>}/>
            <Route path='/teacher-profile' element={<TeacherProfile/>}/>
            <Route path='/points' element={<Points/>}/>
            
         
          </Routes>
        </div>
    </div>
  ) : (
    <>
    <Login/>
    <ToastContainer/>
    </>
  )
}
