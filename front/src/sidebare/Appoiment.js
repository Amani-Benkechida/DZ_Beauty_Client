import React from 'react';

const Appoiment = () => {
    const appointments = [
        {
          id: 1,
          date: 'Thu, 19 Dec 2024',
          service: 'Chemical peel',
          stylist: 'Hiba Bell',
          time: '6:00PM - 7:00PM',
        },
        {
          id: 2,
          date: 'Fri, 20 Dec 2024',
          service: 'Haircut',
          stylist: 'John Doe',
          time: '2:00PM - 3:00PM',
        },
        {
          id: 3,
          date: 'Sat, 21 Dec 2024',
          service: 'Facial',
          stylist: 'Jane Smith',
          time: '11:00AM - 12:00PM',
        },
      ];

  return (
    <div className="font-poppins">
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <div key={appointment.id} className="border border-solid mb-7 p-4">
            <div className="flex relative pb-5">
              <div>{appointment.date}</div>
              <div className="text-red-500 border border-red-500 absolute right-0 w-32 h-10 cursor-pointer justify-center flex items-center">
                Delete
              </div>
            </div>
            <div className="border-t-2 flex relative pt-2">
              <div className="grid">
                <span>{appointment.service}</span>
                <span style={{ color: '#6F6F6F' }}>Stylist: {appointment.stylist}</span>
                <span style={{ color: '#6F6F6F' }}>Time: {appointment.time}</span>
              </div>
              <button className="bg-gray-800 absolute right-0 text-white w-32 h-10">
                Done
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center  mt-20">
          No past appointement Available
        </div>
      )}
    </div>
  );
};

export default Appoiment;
