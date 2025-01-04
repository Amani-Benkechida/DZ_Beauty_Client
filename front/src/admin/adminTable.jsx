import React, { useState } from 'react';

const initialData = [
  {
    id: 1,
    name: "Bellatreche Hiba",
    email: "Hibatallah@gmail.com",
    date: "4/3/24",
    time: "13:00 PM",
    status: "Pending",
  },
  { id: 2, name: "Bellatreche Hiba", email: "Hibatallah@gmail.com", date: "4/3/24", time: "13:00 PM", status: "Pending" },
  { id: 3, name: "Bellatreche Hiba", email: "Hibatallah@gmail.com", date: "4/3/24", time: "13:00 PM", status: "Pending" },
  { id: 4, name: "Bellatreche Hiba", email: "Hibatallah@gmail.com", date: "4/3/24", time: "13:00 PM", status: "Pending" },
];

const AdminTable = () => {
  const [data, setData] = useState(initialData);

  const handleApprove = (index) => {
    const newData = [...data];
    newData[index].status = "Approved"; 
    setData(newData);  
  };

  const handleDecline = (index) => {
    const newData = [...data];
    newData[index].status = "Declined";  
    setData(newData);  
  };

  const handleEdit = (index) => {
    const newData = [...data];
    newData[index].status = "Pending";  // Resetting to "Pending"
    setData(newData);  
  };

  return (
    <div className="p-6 bg-blue-50 w-3/3">
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
                      className="bg-green-200 text-green-700 px-4 py-2 rounded-lg hover:bg-green-300"
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
                  <div className="flex gap-2 justify-center">
                    <span className="text-green-600 bg-green-100 px-4 py-2 rounded-lg">Approved</span>
                    <button
                      onClick={() => handleEdit(idx)} 
                      className="bg-blue-200 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-300"
                    >
                      Edit
                    </button>
                  </div>
                )}
                {row.status === 'Declined' && (
                  <div className="flex gap-2 justify-center">
                    <span className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Declined</span>
                    <button
                      onClick={() => handleEdit(idx)} 
                      className="bg-blue-200 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-300"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
