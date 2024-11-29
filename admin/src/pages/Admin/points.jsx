import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Points() {
  const { token, approvePoints, getPoints, cancelPoints, } = useContext(AdminContext);
  const [pointsRequests, setPointsRequests] = useState([]);
  // Fetch Points Requests
  const fetchPoints = async () => {
    try {
      const response = await axios.get(`https://booking-lessons-production.up.railway.app/api/admin/point/getPoints`)
      if (response.data.success) {
          toast.success(response.data.message)
          setPointsRequests(response.data.data);
      } else {
          toast.error(response.data.message)
      }
  } catch (error) {
      toast.error(error.message)
  }
  };

  // Approve Points Request
  const handleApprove = async (pointId) => {
    try {
      const response = await axios.put(`https://booking-lessons-production.up.railway.app/api/admin/point/approvePoints`, { 
        pointRequestId: pointId
     });
     
        if (response.data.success) {  
        toast.success(response.data.message) 
        // update pointsRequests state after approval
        setPointsRequests(prevRequests => prevRequests.filter(request => request.id !== pointId));
    } else {
        toast.error(response.data.message)
    }
} catch (error) {
    console.log(error)
    toast.error(error.message)
}
  };

  // Cancel Points Request
  const handleCancel = async (pointId) => {
    try {
      const response = await axios.delete(`https://booking-lessons-production.up.railway.app/api/admin/point/cancelPoints`,
        { params: { pointRequestId: pointId } }
      );
         toast.success(response.data.message)
        setPointsRequests(prevRequests => prevRequests.filter(request => request.id !== pointId));   
} catch (error) {
    console.log(error)
    toast.error(error.message)
}
  }

  useEffect(() => {
    if (token) {
     fetchPoints(); 
    }
  }, [token]);


  return (

<div className="bg-white mt-10">
  <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border">
    <img src={assets.points_icon} alt="Points" />
    <p className="font-semibold">Points Requests</p>
  </div>
  <div className="pt-4 border border-t-0">
    {pointsRequests && pointsRequests.length > 0 ? (
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Request ID</th>
            <th className="py-2 px-4 border-b">Student ID</th>
            <th className="py-2 px-4 border-b">Points</th>
          </tr>
        </thead>
        <tbody>
          {pointsRequests.map((request) => (
            <tr key={request.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{request.id}</td>
              <td className="py-2 px-4 border-b">{request.studentId}</td>
              <td className="py-2 px-4 border-b">{request.points}</td>
              <td className="py-2 px-4 border-b flex gap-2">
                <button
                  onClick={() => handleApprove(request.id)}
                  className="cursor-pointer bg-green-400 text-white text-sm font-medium px-2 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleCancel(request.id)}
                  className="cursor-pointer bg-red-400 text-white text-sm font-medium px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="px-6 py-4 text-gray-500">No points requests available</p>
    )}
  </div>
</div>
  );
}
