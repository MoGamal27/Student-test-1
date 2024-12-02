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
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isReadMore, setIsReadMore] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
const [selectedDates, setSelectedDates] = useState([]);





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


 // Modify handleDateSelect to allow multiple date selections
const handleDateSelect = (day) => {
  if (day) {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    // This will keep existing selections for other dates
    fetchAvailableTimeSlots(newDate);
  }
};

// Add this helper function to count total appointments
const getTotalAppointments = () => {
  return Object.values(selectedTimeSlots).reduce((total, slots) => {
    return total + (slots?.length || 0);
  }, 0);
};



const handleTimeSlotSelection = (slot) => {
  const dateKey = selectedDate.toISOString().split('T')[0];
  setSelectedTimeSlots(prev => {
    const currentSlots = prev[dateKey] || [];
    const newSlots = currentSlots.includes(slot)
      ? currentSlots.filter(s => s !== slot)
      : [...currentSlots, slot];
        return {
      ...prev,
      [dateKey]: newSlots
    };
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
  const currentDateKey = selectedDate.toISOString().split('T')[0];
  const selectedSlots = selectedTimeSlots[currentDateKey] || [];

  if (selectedSlots.length === 0) {
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
    const formattedDate = `${selectedDate.getDate()}_${selectedDate.getMonth() + 1}_${selectedDate.getFullYear()}`;
    
    const bookingPromises = selectedSlots.map(timeSlot => 
      axios.post(
        'https://booking-lessons-production.up.railway.app/api/bookings/create',
        {
          studentId,
          teacherId,
          slotDate: formattedDate,
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

// Add the calculation function
const calculateTotalAppointments = () => {
  const total = Object.values(selectedTimeSlots).reduce((sum, slots) => {
    return sum + (Array.isArray(slots) ? slots.length : 0);
  }, 0);
  return total;
}


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
        {teacherInfo.specialization}
    <h2 className="ml-3 border bg-green-100 rounded-lg text-sm text-green-600 pl-1 pr-1">
          {teacherInfo.levelTeache}
        </h2>
      </p>
    </div>


    {/* Speaks Info Section */}
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr_3fr] md:grid-cols-[1fr_2fr_2fr] lg:grid-cols-[1fr_2fr_5fr] gap-y-2.5 mt-3 text-neutral-700">
  <p className="font-medium text-gray-500">Speaks</p>
  <p className="text-black sm:ml-3  font-semibold flex">
    {teacherInfo.speaks}
<h2 className="ml-3 border bg-green-100 rounded-lg text-sm text-green-600 pl-1 pr-1">
      {teacherInfo.levelSpeak}
    </h2>
  </p>
</div>



    {/* Certificate Section */}
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_5fr] gap-y-2.5 mt-3 text-neutral-700">
      <p className="font-medium text-gray-500">Certificate</p>
      <p className="text-black flex">
       {teacherInfo.degree}
      </p>
    </div>
  </div>
</div>



    <div className="grid grid-cols-1 md:grid-cols-[1fr_5fr]  mt-3 text-neutral-700">
      <p className="font-medium text-black">About Me</p>
      <p className="text-black font-semibold">About Course: {teacherInfo.courseDescription}</p>
    </div>
    <div className="pt-2">
     <p>{teacherInfo.location}</p>
    </div>


      {/* Read More Section */}
    <div className="pt-2  max-w-3xl">
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
              <div key={day} className="text-center  font-semibold text-gray-700">
                {day}
              </div>
            ))}
            {getDaysInMonth(currentDate).map((day, index) => (
  <div
    key={index}
    onClick={() => day && handleDateSelect(day)}
    className={`
      text-center p-2 rounded-lg cursor-pointer justify-center items-center flex transition duration-300
      ${day ? 'hover:bg-blue-500 hover:text-white' : ''}
      ${selectedDates.includes(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0]
      ) ? 'bg-blue-500 text-white' : day ? 'bg-gray-100' : ''}
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
        p-2 rounded-lg justify-center items-center flex text-center transition duration-300
        ${selectedTimeSlots[selectedDate.toISOString().split('T')[0]]?.includes(slot)
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 hover:bg-gray-300'}
      `}
    >
      {slot}
    </button>
  ))}
                </div>

                <div className="mt-4 bg-white p-4 rounded-lg shadow">
  <h3 className="text-lg font-semibold mb-2">Appointment Summary</h3>
  
  <div className="mb-2">
    <p className="text-gray-700">
      Selected for {selectedDate.toLocaleDateString()}: {
        selectedTimeSlots[selectedDate.toISOString().split('T')[0]]?.join(', ') || 'None'
      }
    </p>
  </div>

  <div className="border-t pt-2">
    <p className="mt-2 text-lg font-bold text-blue-600">
      Total Appointments: {calculateTotalAppointments()}
    </p>
  </div>
</div>
              </div>
            )}
<button
  onClick={bookAppointment}
  disabled={!selectedTimeSlots[selectedDate.toISOString().split('T')[0]]?.length || loading}
  className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition duration-300"
>
  {loading ? 'Booking...' : `Book ${selectedTimeSlots[selectedDate.toISOString().split('T')[0]]?.length || 0} Appointment(s)`}
</button>
        </div>
      )}
  </div>


</div>
   </div>
  );
}

