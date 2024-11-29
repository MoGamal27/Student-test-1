import React, { useContext, useEffect, useState } from 'react';
import { TeacherContext } from '../../context/TeacherContext';
import { assets } from '../../assets/assets';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function TeacherAppointment() {
    const { bookings, getBookingByTeacherId, addPoints } = useContext(TeacherContext);
    const [points, setPoints] = useState('');
    const token = localStorage.getItem('token');

    const decodedToken = token ? jwtDecode(token) : null;
    const teacherId = decodedToken?.id ? parseInt(decodedToken.id, 10) : null;

    useEffect(() => {
        if (teacherId) {
            getBookingByTeacherId(teacherId);
        }
    }, [teacherId]);

    const handleAddPoints = async (teacherId, studentId) => {
        if (!points || points <= 0) {
            toast.error('Please enter a valid points value.');
            return;
        }
        try {
            const response = await axios.post(`https://booking-lessons-production.up.railway.app/api/teachers/point/addPoints`, { 
                teacherId: teacherId,
                studentId: studentId,
                points: points
             }); 
                toast.success('Points added successfully.');   
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };
    return (
        <div className="bg-white mt-10 rounded-lg shadow-md overflow-hidden">
            <div className="flex items-center gap-2.5 px-4 py-4 bg-gray-100 border-b">
                <img src={assets.list_icon} alt="List Icon" className="w-6 h-6" />
                <p className="font-semibold text-lg">Latest Bookings</p>
            </div>

            <div className="pt-4 border-t">
                {bookings && bookings.length > 0 ? (
                    bookings.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition duration-200 ease-in-out"
                        >
                            <div className="flex-1 text-sm">
                                <p className="text-gray-800 font-medium">Teacher: {item.teacher.name}</p>
                                <p className="text-gray-800 font-medium">Student Name: {item.student.name}</p>
                                <p className="text-gray-800 font-medium">Student Email: {item.student.email}</p>
                                <p className="text-gray-600">Date: {item.slotDate}</p>
                                <p className="text-gray-600">Time: {item.slotTime}</p>
                                <p className="text-gray-600">Points: {item.student.point}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="Points"
                                    value={points}
                                    onChange={(e) => setPoints(e.target.value)}
                                    className="border rounded-md px-2 py-1 w-20 text-sm"
                                />
                                <button
                                    onClick={() => handleAddPoints(item.teacher.id, item.student.id)}
                                    className="bg-primary text-white rounded-md px-4 py-2 hover:bg-primary-dark transition duration-200 ease-in-out"
                                >
                                    Add Points
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="px-6 py-4 text-gray-500">No bookings available</p>
                )}
            </div>
        </div>
    );
}
