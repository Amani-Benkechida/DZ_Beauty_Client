import { useState } from "react";
import React from "react";


const Calenda = ({freeday}) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   const freedays=freeday
   console.log(freeday)


  const dates = Array.from({ length: 30 }, (_, i) => i + 1);
  const [clickedDates, setClickedDates] = useState([]);
  const [interd,setInterd]=useState([])

  const handleClick = (date) => {
    
    if (!freeday.includes(date)) {
      if (clickedDates.includes(date)) {
        // Remove date from clickedDates if it's already there
        setClickedDates(clickedDates.filter((d) => d !== date));
      } else {
        // Add date to clickedDates
        setClickedDates([date]);
        localStorage.setItem("clickedDates", JSON.stringify(clickedDates));

      }
    }else{setInterd([date]);
      console.log(interd)

    }
  };

  return (
    <div className="p-4 max-w-md mx-auto shadow-lg shadow-gray-400 bg-white  rounded-lg font-poppins mt-4">
      <h2 className="text-lg font-semibold text-center mb-4">June 2024</h2>
      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((day) => (
          <div key={day} className="text-black-700 font-medium">
            {day}
          </div>
        ))}
        {dates.map((date) => (
          <button
            key={date}
            onClick={() => handleClick(date)} // Add onClick handler
            className={`p-2 rounded-full transition-colors  ${
              clickedDates.includes(date)
                ? "bg-green-500 text-white" // If clicked, make green
                : freeday.includes(date)
                ? "text-red-500" 
               
               : "text-black-700"
            }`}
       
          >
            {date}
          </button>
        ))}
      </div>
      <div className="mt-4 text-center"></div>
    </div>
  );
};

export default Calenda;
