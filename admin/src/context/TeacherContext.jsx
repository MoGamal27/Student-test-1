import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"

export const TeacherContext = createContext()

const TeacherContextProvider = (props)=> {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [teacher, setTeacher] = useState([])
    const [bookings, setBookings] = useState([])

    const getTeacherById = async (id) => {
        try {
            const  response  = await axios.get(`${backendUrl}/teachers/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            if (response.data.success) {
                setTeacher(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const updateTeacher = async (id, updatedData) => {
        try {
            const  response  = await axios.put(`${backendUrl}/teachers/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            })
            if (response.data.success) {
                toast.success(response.data.message)
                setTeacher(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getBookingByTeacherId = async (id) => {
        try {
            const  response  = await axios.get(`${backendUrl}/bookings/teacher/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            if (response.data.success) {
                setBookings(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
 
    // add points to user
    const addPoints = async (teacherId,userId, points) => {
       
        try {
            const response = await axios.post(`https://booking-lessons-production.up.railway.app/api/teachers/point/addPoints`, { 
                teacherId: teacherId,
                userId: userId,
                points: points
             });
             
                if (response.data.success) {  
                toast.success(response.data.message)   
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const value = {
     teacher, setTeacher, bookings, setBookings, getBookingByTeacherId, addPoints, getTeacherById, updateTeacher
    }

    return (
        <TeacherContext.Provider value={value}>
            {props.children}
        </TeacherContext.Provider>
    )

}

export default TeacherContextProvider