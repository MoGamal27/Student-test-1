/*import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import info from '../assets/assets_frontend/info_icon.svg';
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';

export default function Appointment() {
  const { t, i18n } = useTranslation();
  const { teacherId } = useParams();
  const [teacherInfo, setTeacherInfo] = useState(null);
  const navigate = useNavigate();
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Fetch teacher info
  const fetchTeacherInfo = async () => {
    try {
      const response = await axios.get(`https://booking-lessons-production.up.railway.app/api/teachers/${teacherId}`);
      const teacherData = response.data.data;

      // Translate teacher name and bio using `t`
      setTeacherInfo({
        ...teacherData,
        name: t(`teachers.${teacherId}.name`),
        bio: t(`teachers.${teacherId}.bio`),
      });
    } catch (error) {
      console.error('Error fetching teacher data:', error);
    }
  };

  // Fetch booked slots for the selected date
  const fetchBookedSlots = async (date) => {
    try {
      const formattedDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
      const response = await axios.get(
        `https://booking-lessons-production.up.railway.app/api/bookings/booked-slots`,
        {
          params: { 
            teacherId: teacherId,
            slotDate: formattedDate,
          },
        }
      );

      if (response.data.success) {
        return response.data.bookedSlots;
      }
      return [];
    } catch (error) {
      console.error('Error fetching booked slots:', error);
      return [];
    }
  };

  // Generate available time slots
  const generateAvailableSlots = async () => {
    const slots = [];
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      // Fetch booked slots for this date
      const bookedSlotsForDate = await fetchBookedSlots(currentDate);

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit',
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
          isBooked: bookedSlotsForDate.includes(formattedTime),
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      slots.push(timeSlots);
    }
    setAvailableSlots(slots);
  };

  // Handle time slot selection
  const handleTimeSlotClick = (slot, dateIndex) => {
    if (!slot.isBooked) {
      const slotKey = `${dateIndex}_${slot.time}`;
      const alreadySelected = selectedSlots.some((selectedSlot) => selectedSlot.key === slotKey);

      if (alreadySelected) {
        // Remove the selected slot
        setSelectedSlots((prev) => prev.filter((s) => s.key !== slotKey));
      } else {
        // Add the selected slot
        setSelectedSlots((prev) => [
          ...prev,
          { key: slotKey, dateIndex, time: slot.time, date: availableSlots[dateIndex][0].datetime },
        ]);
      }
    }
  };

  // Book appointment
  const bookAppointment = async () => {
    const decodedToken = jwtDecode(token);
    const studentId = decodedToken.id ? parseInt(decodedToken.id, 10) : null;

    if (!studentId) {
      toast.warn('Please login to book an appointment');
      return navigate('/login');
    }

    try {
      setLoading(true);

      const bookingRequests = selectedSlots.map((slot) => {
        const slotDate = `${slot.date.getDate()}_${slot.date.getMonth() + 1}_${slot.date.getFullYear()}`;
        return axios.post(
          'https://booking-lessons-production.up.railway.app/api/bookings/create',
          { studentId, teacherId, slotDate, slotTime: slot.time },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      });

      const responses = await Promise.all(bookingRequests);

      if (responses.every((res) => res.data.success)) {
        toast.success('Appointments booked successfully');
        navigate('/my-appointment');
      } else {
        toast.error('Some appointments could not be booked');
      }
    } catch (error) {
      toast.error('Error booking appointment: ' + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle date selection
  const handleDateSelect = (index) => {
    setSlotIndex(index);
  };

  useEffect(() => {
    fetchTeacherInfo();
  }, [teacherId, i18n.language]);

  useEffect(() => {
    if (teacherInfo) {
      generateAvailableSlots();
    }
  }, [teacherInfo]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!teacherInfo) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img 
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={teacherInfo.image}
            alt={teacherInfo.name}
          />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0">
          <p className="text-2xl font-semibold text-gray-900">{teacherInfo.name}</p>
          <p className="text-sm text-gray-500 mt-1">{teacherInfo.bio}</p>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee: <span className="text-gray-600">{teacherInfo.fees}$</span>
          </p>
        </div>
      </div>

  
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking Slots</p>
        <div className="flex gap-3 items-center w-full mt-4">
          {availableSlots.map((slots, index) => (
            <div
              key={index}
              onClick={() => handleDateSelect(index)}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'
              }`}
            >
              <p>{slots[0] && daysOfWeek[slots[0].datetime.getDay()]}</p>
              <p>{slots[0] && slots[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {availableSlots[slotIndex]?.map((slot, index) => (
            <p
              key={index}
              onClick={() => handleTimeSlotClick(slot, slotIndex)}
              className={`text-sm px-5 py-2 rounded-full ${
                selectedSlots.some(
                  (s) => s.key === `${slotIndex}_${slot.time}`
                )
                  ? 'bg-primary text-white'
                  : slot.isBooked
                  ? 'bg-gray-100 text-gray-400 line-through cursor-not-allowed'
                  : 'border border-gray-200 cursor-pointer'
              }`}
            >
              {slot.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          disabled={selectedSlots.length === 0 || loading}
          className="bg-primary text-white px-14 py-3 rounded-full mt-4 disabled:opacity-50"
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </div>
    </div>
  );
}*/



import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import { BsChevronDoubleRight } from "react-icons/bs";
import { BsChevronDoubleLeft } from "react-icons/bs";



export default function Appointment() {
  const { t, i18n } = useTranslation();
  const { teacherId } = useParams();
  const [teacherInfo, setTeacherInfo] = useState(null);
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isReadMore, setIsReadMore] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);



  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00","12:00","13:00", "14:00",
    "15:00", "16:00","17:00", "18:00", "19:00", "20:00", "21:00",
    "22:00", "23:00"
  ];

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };


  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const handleDateSelect = (day) => {
    if (day) {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(newDate);
      setSelectedTimeSlots([]); 
      fetchAvailableTimeSlots(newDate);
    }
  };

  const handleTimeSlotSelection = (slot) => {
    setSelectedTimeSlots(prev => {
      if (prev.includes(slot)) {
        return prev.filter(s => s !== slot);
      }
      return [...prev, slot];
    });
  };

  const fetchAvailableTimeSlots = async (date) => {
    try {
      const formattedDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
      const response = await axios.get(
        `https://booking-lessons-production.up.railway.app/api/bookings/booked-slots`,
        {
          params: { 
            teacherId: teacherId,
            slotDate: formattedDate,
          },
        }
      );
      
      const bookedSlots = response.data.bookedSlots || [];
      const available = timeSlots.filter(slot => !bookedSlots.includes(slot));
      setAvailableTimeSlots(available);
    } catch (error) {
      console.error('Error fetching time slots:', error);
      setAvailableTimeSlots([]);
    }
  };

  const bookAppointment = async () => {
    if (selectedTimeSlots.length === 0) {
      toast.warn('Please select at least one time slot');
      return;
    }

    const decodedToken = jwtDecode(token);
    const studentId = decodedToken.id ? parseInt(decodedToken.id, 10) : null;

    if (!decodedToken || !studentId) {
      toast.warn('Please login to book an appointment');
      return navigate('login');
    }

    try {
      setLoading(true);
      const slotDate = `${selectedDate.getDate()}_${selectedDate.getMonth() + 1}_${selectedDate.getFullYear()}`;
      
      const bookingPromises = selectedTimeSlots.map(timeSlot => 
        axios.post(
          'https://booking-lessons-production.up.railway.app/api/bookings/create',
          { 
            studentId, 
            teacherId, 
            slotDate, 
            slotTime: timeSlot 
          },
          { 
            headers: { Authorization: `Bearer ${token}` } 
          }
        )
      );

      const responses = await Promise.all(bookingPromises);
      
      if (responses.every(response => response.data.success)) {
        toast.success('All appointments booked successfully');
        navigate('/my-appointment');
      }
    } catch (error) {
      toast.error('Error booking appointments: ' + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      try {
        const response = await axios.get(
          `https://booking-lessons-production.up.railway.app/api/teachers/${teacherId}`
        );
        setTeacherInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }
    };

    fetchTeacherInfo();
  }, [teacherId]);

  if (!teacherInfo) return null;

  return (
  <div className="container p-4">     
  <div className=" flex-col md:flex-row gap-6 mb-8 w-full">
  <div className="bg-sky-200 p-6 rounded-lg shadow flex flex-col md:flex-row gap-4">
    {/* Teacher Image Section */}
    <div className="flex-col bg-white p-4 rounded-md md:flex-row items-center">
    <div className="flex flex-col sm:flex-row p-4">
  {/* Image Section */}
  <img
    src={teacherInfo.image}
    alt={teacherInfo.name}
    className="rounded-full w-16 max-md:w-32 sm:w-28 md:w-32 lg:w-36 xl:w-52 object-cover mx-auto sm:mx-0"
  />

  {/* Text Info Section */}
  <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 sm:w-2/3">
    <h2 className="text-2xl font-semibold mb-2">{teacherInfo.name}</h2>
    <h3 className="text-gray-500 text-lg">PROFESSIONAL TEACHER</h3>

    {/* Teacher Info Section */}
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
      <p className="font-medium text-gray-500">Teacher</p>
      <p className="text-black font-semibold flex">
        Arabic
        <h2 className="ml-3 border bg-green-100 rounded-lg text-sm text-green-600 pl-1 pr-1">
          Native
        </h2>
      </p>
    </div>

    {/* Speaks Info Section */}
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr_3fr] md:grid-cols-[1fr_2fr_2fr] lg:grid-cols-[1fr_2fr_5fr] gap-y-2.5 mt-3 text-neutral-700">
  <p className="font-medium text-gray-500">Speaks</p>
  <p className="text-black sm:ml-3  font-semibold flex">
    Arabic
    <h2 className="ml-3 border bg-green-100 rounded-lg text-sm text-green-600 pl-1 pr-1">
      Native
    </h2>
  </p>
  <h2 className="ml-1">English (Modern Standard)</h2>
</div>


    {/* Certificate Section */}
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_5fr] gap-y-2.5 mt-3 text-neutral-700">
      <p className="font-medium text-gray-500">Certificate</p>
      <p className="text-black flex">
        Native Arabic and International Certified Teacher with 5 years of Experience
      </p>
    </div>
  </div>
</div>


    <div className="grid grid-cols-1 md:grid-cols-[1fr_5fr]  mt-3 text-neutral-700">
      <p className="font-medium text-black">About Me</p>
      <p className="text-black font-semibold">About the course</p>
    </div>
    <div className="pt-2">
      <p>From Tunisia</p>
      <p>Living in Toronto, Canada (12:46 UTC+01:00)</p>
    </div>

      {/* Read More Section */}
    <div className="pt-2  max-w-3xl">
      <div className="relative">
        <p
          className={`text-gray-600 mb-4 text-base sm:text-lg lg:text-xl ${isReadMore ? "" : "line-clamp-3"}`}
        >
          {teacherInfo.bio}
        </p>
        <button
          onClick={toggleReadMore}
          className="text-blue-500 hover:text-blue-700 font-semibold mt-2"
        >
          {isReadMore ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
    </div>

  {/* Video Section */}
    <div className="flex-col md:h-96 bg-white rounded-md p-4 md:flex-row gap-6">
    <div className="sm:py-5 md:flex-col">
      <video
        width={800}
        height={400}
        src={teacherInfo.video}
        controls
        autoPlay
        loop
        muted
        className="w-full flex mx-auto md:w-96"
      ></video>
    </div>
    <p className="text-lg border bg-blue-400 rounded-md border-blue-300 text-center font-semibold">Fee: ${teacherInfo.fees}/hour</p>
     

    <div className="container mx-auto pt-2">
      <button
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        className="bg-sky-400 text-black font-semibold py-2 px-4 w-full rounded-lg mb-6 hover:bg-blue-700 hover:text-white transition duration-300"
      >
        {isCalendarOpen ? 'Close Calendar' : 'Show Calendar'}
      </button>

    </div>
  </div>

    {/* Calendar */}
  {isCalendarOpen && (
        <div className="bg-white pl-2 pr-2 rounded-lg shadow-lg w-full md:w-96 mx-auto transition-all duration-300">
          <div className="flex pt-2 justify-between items-center mb-4">
            <button
              onClick={() => changeMonth(-1)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              <BsChevronDoubleLeft />
            </button>
            <h3 className="text-xl font-bold text-center">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button
              onClick={() => changeMonth(1)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300"
            >
          <BsChevronDoubleRight />
           </button>
          </div>

          <div className="grid grid-cols-6 sm:grid-flow-col-3 gap-2 mb-6">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center  font-semibold text-gray-700">
                {day}
              </div>
            ))}
            {getDaysInMonth(currentDate).map((day, index) => (
              <div
                key={index}
                onClick={() => day && handleDateSelect(day)}
                className={`
                  text-center p-2 rounded-lg cursor-pointer justify-center items-center flex  transition duration-300
                  ${day ? 'hover:bg-blue-500 hover:text-white' : ''}
                  ${selectedDate?.getDate() === day &&
                  selectedDate?.getMonth() === currentDate.getMonth()
                    ? 'bg-blue-500 text-white'
                    : day ? 'bg-gray-100' : ''}
                `}
              >
                {day}
              </div>
            ))}
          </div>

          {selectedDate && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4">
                Available Time Slots for {selectedDate.toLocaleDateString()}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => handleTimeSlotSelection(slot)}
                    className={`
                      p-2 rounded-lg justify-center items-center flex  text-center transition duration-300
                      ${selectedTimeSlots.includes(slot)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'}
                    `}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <p className="text-gray-600 ">
                  Selected slots: {selectedTimeSlots.length > 0
                    ? selectedTimeSlots.join(', ')
                    : 'None'}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={bookAppointment}
            disabled={selectedTimeSlots.length === 0 || loading}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition duration-300"
          >
            {loading ? 'Booking...' : `Book ${selectedTimeSlots.length} Appointment(s)`}
          </button>
        </div>
      )}
  </div>


</div> 
   </div>
  );
}
