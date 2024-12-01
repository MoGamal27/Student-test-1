import React, { useContext, useEffect, useState } from 'react';
import { TeacherContext } from '../../context/TeacherContext';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

export default function TeacherProfile() {
    const {getTeacherById, backendUrl, teacher, updateTeacher } = useContext(TeacherContext);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token'));
  const decodedToken = jwtDecode(token);
  const teacherId = decodedToken.id ? parseInt(decodedToken.id, 10) : null;

    useEffect(() => {
        if (token) {
            getTeacherById(teacherId);
        }
    }, [token]);

    const handleEditClick = () => {
        setUpdatedData({
            name: teacher.name,
            bio: teacher.bio,
            fees: teacher.fees,
            image: teacher.image,
            video: teacher.video,
            location: teacher.location,
            specialization: teacher.specialization,
            levelTeache: teacher.levelTeache,
            degree: teacher.degree,
            speaks: teacher.speaks,
            levelSpeak: teacher.levelSpeak,
            courseDescription: teacher.courseDescription,
        });
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        await updateTeacher(teacherId, updatedData);
        setIsEditing(false);
    };

    return (
        <div className='flex flex-col gap-4 m-5'>
            <div>
                <img className='w-full sm:max-w-64 rounded-lg' src={teacher.image} alt="Teacher Profile" />
            </div>

            <div className='flex-1 border border-stone-100 rounded-lg p-8 bg-white py-7'>
                <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{teacher.name}</p>
                <div>
                    <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
                    <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{teacher.bio}</p>
                </div>

                <div>
                    <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>Location:</p>
                    <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{teacher.location}</p>
                </div>

                <div>
                    <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>Teacher:</p>
                    <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{teacher.specialization}</p>
                </div>

                <div>
                    <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>level Teaches:</p>
                    <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{teacher.levelTeache}</p>
                </div>

                <div>
                    <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>Certificate:</p>
                    <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{teacher.degree}</p>
                </div>

                <div>
                    <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>Speaks:</p>
                    <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{teacher.speaks}</p>
                </div>

                <div>
                    <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>level Speaks:</p>
                    <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{teacher.levelSpeak}</p>
                </div>

                <div>
                    <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About Course:</p>
                    <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{teacher.courseDescription}</p>
                </div>

                <p className='text-gray-600 font-medium mt-4'>
                    Appointment fee: <span className='text-gray-800'>{teacher.fees}$</span>
                </p>
                <button onClick={handleEditClick} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
            </div>

            {isEditing && (
               <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                  
                   <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto space-y-4">
                       <h3 className="text-2xl font-semibold text-gray-700">Edit Teacher Details</h3>
               
                     
                       <input
                           type="text"
                           name="name"
                           value={updatedData.name}
                           onChange={handleInputChange}
                           placeholder="Name"
                           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       />
               
                      
                       <textarea
                           name="bio"
                           value={updatedData.bio}
                           onChange={handleInputChange}
                           placeholder="Bio"
                           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           rows="4"
                       ></textarea>
               
                      <textarea
                      name="location"
                      value={updatedData.location}
                      onChange={handleInputChange}
                      placeholder="Location"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      ></textarea>

                      <textarea
                      name="specialization"
                      value={updatedData.specialization}
                      onChange={handleInputChange}
                      placeholder="Specialization"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      ></textarea>

                      <textarea
                      name="levelTeache"
                      value={updatedData.levelTeache}
                      onChange={handleInputChange}
                      placeholder="Level Teaches"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      ></textarea>

                      <textarea
                      name="degree"
                      value={updatedData.degree}
                      onChange={handleInputChange}
                      placeholder="Degree"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      ></textarea>

                      <textarea
                      name="speaks"
                      value={updatedData.speaks}
                      onChange={handleInputChange}
                      placeholder="Speaks"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      ></textarea>

                      <textarea
                      name="levelSpeak"
                      value={updatedData.levelSpeak}
                      onChange={handleInputChange}
                      placeholder="Level Speak"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      ></textarea>

                      <textarea
                      name="courseDescription"
                      value={updatedData.courseDescription}
                      onChange={handleInputChange}
                      placeholder="Course Description"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      ></textarea>
                      
                         <input
                           type="number"
                           name="fees"
                           value={updatedData.fees}
                           onChange={handleInputChange}
                           placeholder="Fees"
                           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       />
               
                    
                       <input
                           type="url"
                           name="image"
                           value={updatedData.image}
                           onChange={handleInputChange}
                           placeholder="Image URL"
                           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       />
               
                      
                       <input
                           type="url"
                           name="video"
                           value={updatedData.video}
                           onChange={handleInputChange}
                           placeholder="Video URL"
                           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       />
               
                      
                       <div className="flex justify-end gap-3">
                           <button
                               onClick={handleSave}
                               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                           >
                               Save
                           </button>
                           <button
                               onClick={() => setIsEditing(false)}
                               className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                           >
                               Cancel
                           </button>
                       </div>
                   </div>  
                   </div>    
            )}
            </div>
    );
}
