import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [teacher, setTeachers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [role, setRole] = useState('');
    
    //const [completeBookings, setCompleteBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllTeacher = async () => {
        try {
          const  response = await axios.get(`${backendUrl}/teachers/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.success) {
            setTeachers(response.data.data)
        }else{
            toast.error(response.data.message)
        } 
      } catch (error) {
          toast.error(error.message)
          };
      };
      
      // get all bookings
      const getAllBookings = async () => {
        try {
          const response = await axios.get(`${backendUrl}/bookings/`);
          if (response.data.success) {
            const incompleteBookings = response.data.data.filter(booking => !booking.isComplete);
            setBookings(incompleteBookings);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setBookings([]); // Handle 404 by setting bookings to an empty array
            toast.warn("No incomplete bookings found.");
          }
        }
      };
      

          // delete booking 
          const deleteBooking = async (id) => {
            try {
                const response = await axios.delete(`${backendUrl}/bookings/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data.success) {
                    toast.success(response.data.message);
                    // update your local state to remove the deleted booking
                     setBookings(bookings.filter(booking => booking.id !== id));
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('An error occurred while deleting the booking');
                }
            }
        };

              // get all students 
              const getAllUsers = async () => {
                try {
                  const  response  = await axios.get(`${backendUrl}/users/`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  if (response.data.success) {
                    toast.success(response.data.message)
                    setUsers(response.data.data)
                }else{
                    toast.error(response.data.message)
                } 
              } catch (error) {
                toast.error(error.message)
                };
                  }

                  // complete booking
                  const completeBooking = async (id) => {
                    try {
                        // Validate id
                        if (!id) {
                            toast.error('Booking ID is required');
                            return;
                        }
                
                        const response = await axios.put(
                            `${backendUrl}/bookings/completed`,
                            { id },
                            {
                                headers: { 
                                    Authorization: `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                }
                            }
                        );
                
                        if (response.data.success) {
                            toast.success(response.data.message);
                            setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
                        }
                    } catch (error) {
                        console.error('Error completing booking:', error);
                        
                        // Handle different types of errors
                        if (error.response) {
                            // Server responded with an error
                            toast.error(error.response.data.message || 'Failed to complete booking');
                        } else if (error.request) {
                            // Request was made but no response
                            toast.error('No response from server. Please check your connection.');
                        } else {
                            // Error in setting up the request
                            toast.error('Error making request. Please try again.');
                        }
                    }
                };
                  

                  // get complete booking
                  const getCompleteBooking = async () => {
                    try {
                      const  response  = await axios.get('https://booking-lessons-production.up.railway.app/api/bookings/completed-booking', {
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      if (response.data.success) {
                        toast.success(response.data);
                        console.log(response.data.data)
                        setBookings(response.data.data);
                    }else{
                        toast.error(response.data.message)
                    }
        
                } catch (error) {
                    toast.error(error.message)
                }
                      }

                      const getPoints = async () => {
                        try {
                            const response = await axios.get(`https://booking-lessons-production.up.railway.app/api/admin/point/getPoints`)
                            if (response.data.success) {
                                toast.success(response.data.message)
                            } else {
                                toast.error(response.data.message)
                            }
                        } catch (error) {
                            toast.error(error.message)
                        }
                    }

                      const approvePoints = async (pointId) => {
                        try {
                            const response = await axios.put(`https://booking-lessons-production.up.railway.app/api/admin/point/addPoints`, { 
                                pointId: pointId
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
                   
                    const cancelPoints = async (pointId) => {
       
                        try {
                            const response = await axios.delete(`https://booking-lessons-production.up.railway.app/api/admin/point/cancelPoints`, { 
                                pointId: pointId
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
        token, setToken,
        backendUrl, 
        teacher, getAllTeacher, 
        bookings, getAllBookings, 
        deleteBooking, 
        users, getAllUsers, 
        completeBooking, getCompleteBooking,
        role, setRole,
       getPoints, approvePoints, cancelPoints
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
