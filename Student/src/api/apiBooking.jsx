import axios from 'axios';

const API_URL = 'https://booking-lessons-production.up.railway.app/api'; 

export const createBooking = async (token, teacherId, startTime, endTime, studentId) => {
    try {
        const response = await axios.post(`${API_URL}/bookings`, {
            teacherId,
            startTime,
            endTime,
            studentId
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating booking');
    }
};