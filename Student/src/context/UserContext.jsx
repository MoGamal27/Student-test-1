import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
 export const UserContext = createContext();
import { toast } from 'react-toastify';

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'))

    const getUserById = async (id) => {
        try {
            const response = await axios.get(`https://booking-lessons-production.up.railway.app/api/users/oneUser/${id}`, 
                {id}, 
            );
            if (response.data.success) {
                setUser(response.data.data);
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    const getCompletedCourses = async (id) => {
        try {
            const response = await axios.get(
                `https://booking-lessons-production.up.railway.app/api/bookings/completed-courses`,
                {
                    params: { studentId: id },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
    
            if (response.data.success) {
                return response.data;
            } else {
                toast.error(response.data.message);
                return { success: false, data: [] };
            }
        } catch (error) {
            toast.error(error.message);
            return { success: false, data: [] };
        }
    };

    const PayWithPoints = async (bookingId, studentId) => {
        try {
          const response = await axios.post(
            'http://localhost:3000/api/payment/pay-with-points',
            {
              bookingId,
              studentId,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
    
          if (response.data.success) { 
            alert('Payment successful! According to the policy of the Arabe Academy, if you want to cancel or reschedule the meeting, please notify us at least 3 hours before the lesson. Otherwise, the lesson will be marked as completed. Good luck 🙏🙏 You can contact us through customer service from here whats App +972 54-648-7767');  
        } else {
            alert('Payment failed!');
        }
    } catch (error) {
        alert('Payment failed!', error.message);
        }
    };
    
    

   

    return (
        <UserContext.Provider value={{ user, setUser, getUserById, getCompletedCourses, token, setToken, PayWithPoints }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;