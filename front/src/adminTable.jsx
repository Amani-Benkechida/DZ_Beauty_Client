import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminTable = () => {
  const [data, setData] = useState([]);

  // Fetch reservations data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/reservations");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchData();
  }, []);

  // Function to update the status in the backend
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:8000/reservations/${id}`, { status });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handle Approve button click
  const handleApprove = async (index) => {
    const updatedData = [...data];
    updatedData[index].status = "Approved";
    setData(updatedData);

    // Update the backend after updating the front-end state
    await updateStatus(updatedData[index].id, "Approved");
  };

  // Handle Decline button click
  const handleDecline = async (index) => {
    const updatedData = [...data];
    updatedData[index].status = "Declined";
    setData(updatedData);

    // Update the backend after updating the front-end state
    await updateStatus(updatedData[index].id, "Declined");
  };

  return (
    <div className="w-full flex">
      <div className="w-1/5 bg-black"></div>
      <div className="p-6 bg-blue-50 w-2/3">
        <h1 className="w-[315px] h-[48px] font-poppins font-semibold text-[32px] leading-[48px] mb-8 text-center">
          Appointments List
        </h1>

        <table className="table-auto w-full text-center bg-white border-[#D5D5D5] shadow-lg shadow-[#298EA614] rounded-xl mx-auto">
          <thead>
            <tr className="text-gray-700 bg-gray-100">
              <th className="p-4">NAME</th>
              <th className="p-4">Email</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className={`text-gray-600 hover:bg-gray-50 ${idx === data.length - 1 ? '' : 'border-b'}`}>
                <td className="p-4 text-center">{row.name}</td>
                <td className="p-4 text-center">{row.email}</td>
                <td className="p-4 text-center">{`${row.date}; ${row.time}`}</td>
                <td className="p-4 text-center">
                  {row.status === 'Pending' && (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleApprove(idx)}  
                        className="bg-teal-100 text-teal-700 px-4 py-2 rounded-lg hover:bg-teal-200"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDecline(idx)}  
                        className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                  {row.status === 'Approved' && (
                    <span className="text-green-600 bg-green-100 px-4 py-2 rounded-lg">Approved</span>
                  )}
                  {row.status === 'Declined' && (
                    <span className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Declined</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
