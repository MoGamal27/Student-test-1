import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function AddTeacher() {
    const [teachImg, setTeachImg] = useState(''); 
    const [teachVideo, setTeachVideo] = useState(''); 
    const [name, setName] = useState('');
    const [old, setOld] = useState(''); 
    const [bio, setBio] = useState(''); 
    const { backendUrl, token } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (!teachImg) {
                return toast.error('Image URL not provided');
            }
            if (!teachVideo) {
                return toast.error('Video URL not provided');
            }

            const formData = {
                image: teachImg, // URL for image
                video: teachVideo, // URL for video
                name,
                old,
                bio,
            };

            // Log form data for debugging
            console.log('Form data:', formData);

            // API call to create teacher
            const { data } = await axios.post('https://booking-lessons-production.up.railway.app/api/teachers', formData, {
                headers: { token, 'Content-Type': 'application/json' },
            });

            if (data.success) {
                toast.success(data.message);
                // Clear form
                setTeachImg('');
                setTeachVideo('');
                setName('');
                setOld('');
                setBio('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="m-5 w-full">
            <p className="mb-3 text-lg font-medium">Add Teacher</p>

            <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-scroll">
                <div className="flex flex-col gap-4 mb-8">
                    <label htmlFor="teach-img" className="text-gray-500">Teacher Image URL</label>
                    <input
                        type="url"
                        id="teach-img"
                        value={teachImg}
                        onChange={(e) => setTeachImg(e.target.value)}
                        className="border rounded px-3 py-2"
                        placeholder="Enter image URL"
                        required
                    />
                </div>

                <div className="flex flex-col gap-4 mb-8">
                    <label htmlFor="teach-video" className="text-gray-500">Teacher Video URL</label>
                    <input
                        type="url"
                        id="teach-video"
                        value={teachVideo}
                        onChange={(e) => setTeachVideo(e.target.value)}
                        className="border rounded px-3 py-2"
                        placeholder="Enter video URL"
                        required
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <label className="text-gray-500">Teacher Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded px-3 py-2"
                        placeholder="Name"
                        required
                    />
                </div>

                <div className="flex flex-col gap-4 mt-4">
                    <label className="text-gray-500">Teacher Age</label>
                    <input
                        type="number"
                        value={old}
                        onChange={(e) => setOld(e.target.value)}
                        className="border rounded px-3 py-2"
                        placeholder="Age"
                        required
                    />
                </div>

                <div className="flex flex-col gap-4 mt-4">
                    <label className="text-gray-500">About Teacher</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="border rounded px-3 py-2"
                        placeholder="Write about teacher"
                        rows={5}
                        required
                    />
                </div>

                <button type="submit" className="bg-primary px-10 py-3 mt-6 text-white rounded-full">
                    Add Teacher
                </button>
            </div>
        </form>
    );
}

