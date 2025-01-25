import React from 'react'

import image from './upscaled_image.png'
import icon from './Vector (1).png'
 import {useStylists} from '../StylistProvider'

import { useState } from 'react';
import img from './Column (1).png'
import vect from './Vector (2).png'
import Calenda from './C';
import robot from './google_recaptcha-official 2.png'
import datas from '../info.json'
import axios from 'axios';
import Navbar from '../homepage/navbar';
import Header from '../homepage/header';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Onclick = () => {
  const { t } = useTranslation();

    const today = new Date();
  
    // Get today's date as a string (e.g., "2025-01-24")
    const formattedDate = today.toISOString().split("T")[0];
  
    // Calculate the current week of the year
    const getWeekNumber = (date) => {
      const startOfYear = new Date(date.getFullYear(), 0, 1); // January 1st of the year
      const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000)); // Days passed since Jan 1
      return Math.ceil((days + startOfYear.getDay() + 1) / 7); // Add days of the first week and divide by 7
    };
  
    const weekNumber = getWeekNumber(today);
    console.log(weekNumber)
    const freedays = Array.from({ length: 30 }, (_, i) => i + 1); // Generate days 1–30

const filterFreeDays = () => {
  const today = new Date();

  // Calculate the current week of the month
  const getWeekOfMonth = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1); // First day of the month
    const dayOfMonth = date.getDate(); // Today's day number
    return Math.ceil((dayOfMonth + startOfMonth.getDay()) / 7); // Week of the month
  };

  // Get the current week of the month
  const currentWeek = getWeekOfMonth(today);

  // Function to determine the week of the month for a specific day
  const getDayWeekOfMonth = (day) => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = new Date(year, month, day); // Convert day of the month to a Date object
    return getWeekOfMonth(date);
  };

  // Filter out days that fall in the current week
  const filteredDays = freedays.filter((day) => getDayWeekOfMonth(day) !== currentWeek);

  return filteredDays
};

const remainingDays = filterFreeDays();
console.log("Days not in the current week:", remainingDays);



















    const {fun,userid} = useStylists();

  const [clientId, setClientId] = useState("");
  const [prestataireId, setPrestataireId] = useState("");
  const [services, setServices] = useState([
    {
      service_id: 101,
      date: "2025-01-05",
      start_time: "10:00",
      end_time: "11:00",
      total_price: 50.00,
    },
    {
      service_id: 102,
      date: "2025-01-05",
      start_time: "14:00",
      end_time: "15:00",
      total_price: 60.00,
    }
  ]);
  const [pers,setPrestataire]=useState([])

  useEffect(() => {
    const getUser = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:8000/${userId}`);
       
        setPrestataire(response.data)
        

        // Use data as needed
       
      } catch (error) {
        console.error('Error fetching user:', error);
        alert('Failed to fetch user data');
      }
    };

    // Call the getUser function when the component mounts
    getUser(parseInt(userid));
    console.log('amina touati')
    console.log(userid)
    console.log(pers)
  }, []); 

  const [time, setTime] = useState(''); // assuming time state
  const [availability, setAvailability] = useState(null);
  const [errorMessag, setErrorMessag] = useState('');

  useEffect(() => {
    const checkAvailability = async () => {
      const prestataireId = 30;
      const dayOfWeek = "monday" // Trimmed spaces around the day
       const time = "05:00"

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/prestataire/availability/${prestataireId}/${dayOfWeek}`,
          {
            // Pass time as query parameter
            time:time
          }
        );
        setAvailability(response.data);

        setErrorMessag('');
        console.log('Success amani:', response.data);
      } catch (error) {
        setErrorMessag(error.response?.data?.detail || 'An error occurred');
        setAvailability(null);
        console.log('Error:', error);
      }
    };

    checkAvailability(); // Call the function inside useEffect
  }, [time]); // 
  const [calendar, setCalendar] = useState({});
  const [errorMessa, setErrorMess] = useState('');
  const prestataireI=5
  const month=1
  const year=2025

  useEffect(() => {
       const prestataireI=29
    const month=1
    const year=2025
    const day='monday'

    const fetchCalendar = async () => {
   
      try {
        // Make the request to the backend
        const response = await axios.get(
          `http://127.0.0.1:8000/prestataire/calendar/${prestataireI}`,
          {
            params: { month, year
              },
          }
        );

        // Set the calendar data in the state
        setCalendar(response.data.calendar);
        setErrorMess('');
        console.log('calnder:', response.data);
      } catch (error) {
        // Handle errors, for example, 404 or 422
        setErrorMess(error.response?.data?.detail || 'An error occurred');
        setCalendar({});
      }
    };

    fetchCalendar();
  }, [prestataireId, month, year]); // Refetch if prestataireId, month, or year changes








/* 

   async function handleSubm() {
      const reservationData = {
          client_id:16,// Example client ID
          prestataire_id: 28, 
          services: [
              {
                  service_id: 1,
                  date: "2025-01-10",  // Service reservation date
                  start_time: "14:00",  // Start time
                  end_time: "15:00",  // End time
                  total_price: 100  // Price for this service
              },
           
          ]
      };
  
      try {
          const response = await axios.post('http://127.0.0.1:8000/reservation/reserve', reservationData);
          console.log('Reservation Successful:', response.data);
          alert('Reservation Successful. IDs: ' + response.data.reservation_ids);
      } catch (error) {
          console.error('Error creating reservation:', error);
          alert('Error: ' + error.response?.data?.detail || error.message);
      }
  }
  handleSubm()
  


 */


console.log(pers)







  /* const handleSubmi = async (e) => {
    e.preventDefault();

    const reservationData = {
      client_id: clientId,
      prestataire_id: prestataireId,
      services: services, // Array of service objects
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/reservation/reserve", reservationData);
   
     alert("res")
  
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };  */
 const handleSubmi
 = async () => {
    
const services=[{
  
  "service_id": 1,
  "prestataire_id": 28,
  "date": "Monday",
  "start_time": "10:00",
  "end_time": "11:00",
  "total_price": 50.00
  }]

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8000/reservation/reserve", // Replace with the correct backend URL
        {   "service_id": 1,
          "prestataire_id": 35,
          "date": "monday",
        
          "total_price": 50.00

         },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the access token for authentication
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Reservation successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating reservation:", error.response?.data || error.message);
      throw error;
    }
  };
  

 



  const {stylist,Oclick} = useStylists();
  const freeday = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function getWeekDays(date) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    // Get the current date and the day of the week (0 = Sun, 6 = Sat)
    const currentDate = new Date(date);
    const currentDayOfWeek = currentDate.getDay(); 
  
    // Calculate the difference to get the first day of the week (Sunday)
    const diffToFirstDay = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
    currentDate.setDate(currentDate.getDate() + diffToFirstDay);
  
    // Get the first day of the week
    const firstDay = currentDate.getDate();
    
    // Get the last day of the week
    const lastDay = firstDay + 6;
  
    // Create the ordered days array
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      let dateOfWeek = new Date(currentDate);
      dateOfWeek.setDate(currentDate.getDate() + i); // increment the day
      weekDays.push({
        dayName: days[dateOfWeek.getDay()],
        dayNumber: dateOfWeek.getDate()
      });
    }
  
    return { firstDay, lastDay, weekDays };
  }
  
  // Example usage
  const result = getWeekDays('2025-01-24');
  console.log(`First day of the week: ${result.firstDay}`);
  console.log(`Last day of the week: ${result.lastDay}`);
  console.log("Ordered days of the week:");
  console.log(result.weekDays);
  















    const [date, setDate] = useState(new Date());
  
    console.log(Oclick);
    const data = datas.stylists[parseInt(Oclick, 10)]
    console.log(data)

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 13; hour <= 23; hour++) {
      const start = `${hour}:00`;
      const end = `${hour + 1}:00`;
      slots.push(`${start} to ${end}`);
    }
    return slots;
  };
  const timeSlots = generateTimeSlots();
  const [login,setLogin]=useState(false);
  const [Sign,setSign]=useState(false);
  
    const dates = Array.from({ length: 30 }, (_, i) => i + 1);
    const [clickedDates, setClickedDates] = useState([]);
    const [interd,setInterd]=useState([])
    const [afiche,setafiche]=useState(false)
    const [globaldate,setdateGlobal]=useState(false)
    const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');

      // Login form state
      const [username, setUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [toke, settoke] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("token");

    if (token) {
      settoke(true); // If token exists, set toke to true
    } else {
      settoke(false); // Otherwise, set toke to false
    }
  }, []);
  const validateForm = () => {
    const errors = [];

    // Check if all fields are filled
    if (!username || !signupEmail || !signupPassword || !confirmPassword) {
      errors.push('Please fill out all fields.');
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(signupEmail)) {
      errors.push('Please enter a valid email address.');
    }

    // Validate password (at least 8 characters, with letters, numbers, and symbols)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
    if (!passwordRegex.test(signupPassword)) {
      errors.push('Password must be at least 8 characters long and contain letters, numbers, and symbols.');
    }

    // Check if passwords match
    if (signupPassword !== confirmPassword) {
      errors.push('Passwords do not match.');
    }

    return errors;
  };
















    const handleClick = (date) => {
      if (!remainingDays .includes(date)) {
        // Handle non-free day clicks
        if (clickedDates.includes(date)) {
          setClickedDates(clickedDates.filter((d) => d !== date)); // Deselect
        } else {
          setClickedDates([date]); // Select a new date
        }
        setInterd([]);
      } else {
        // Handle free day clicks
        setInterd([date]);

        setClickedDates([]); // Clear non-free dates when a free date is selected
      }
      setdateGlobal(date);
    };
    


    const afichagedetab = (selectedDate) => {
      if (remainingDays .includes(selectedDate)) {
        setafiche(false); // Hide table if the date is a free day
      } else {
        setafiche(true); // Show table otherwise
      }
    };
   
    

   


    const [loading, setLoading] = useState(false);

    const validateFor = () => {
      const errors = [];
  
      // Check if both fields are filled
      if (!email || !password) {
        errors.push('Please fill out both the email/username and password fields.');
      }
  
      // Validate email format if email is provided
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (email && !emailRegex.test(email)) {
        errors.push('Please enter a valid email address.');
      }
  
      return errors;
    };
  
   
    const handleLogin = async () => {
      const errors = validateFor();
      if (errors.length > 0) {
        setErrorMessages(errors);
      } else {
        // Proceed to login logic
        setLoading(true);
      try {
        const response = await axios.post("http://127.0.0.1:8000/auth/login", {
          email: email,
          password: password,
        });

  
        console.log(response.data);
  
        // Save the token in localStorage
        localStorage.setItem("token", response.data.token);
        setLogin(false);
  
        alert(response.data.message); // Display the success message
        fetchProfile()

       
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.detail || "Login failed");
        } else {
          setErrorMessage("An unexpected error occurred");
        }
      }
    };}

  
    const handleCreateAccount = () => {
      const errors = validateForm();
      if (errors.length > 0) {
        setErrorMessages(errors);
      } else {
        // Proceed to submit form data
        handleSubmit();
      }
    };
  
    const handleSubmit = async (e) => {
      e && e.preventDefault(); // Prevent the default form submission if event is passed
  
      if (validateForm().length === 0) {
      
        try {
          const response = await axios.post('http://127.0.0.1:8000/auth/register', {
            name: username,
            email: signupEmail,
            password: signupPassword,
            role: 'client',
          });
  
          alert('Registration successful!');
          fetchProfile()
        
          setSign(false); // Close modal
          // Redirect to login page after success
        } catch (error) {
          
          if (error.response && error.response.data.detail) {
            alert(error.response.data.detail);
          } else {
            alert('An error occurred. Please try again later.');
          }
        }
      }
    };
    const API_BASE_URL = "http://127.0.0.1:8000/profile";
      
        // Fetch profile data from the backend
        
          const fetchProfile = async () => {
            const token = localStorage.getItem("token"); 
         
      
            if (!token) {
              console.error("User is not logged in.");
              return;
            }
      
            try {
              const response = await fetch(API_BASE_URL, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`, // Pass token in Authorization header
                },
              });
      
              if (response.ok) {
                const data = await response.json();
              
                if (data.name && data.name.length > 0) {
                  const firstLetter = data.name.charAt(0).toUpperCase();
                 
                  localStorage.setItem("firstletter", firstLetter); // Save in localStorage
                }
                
              } else {
                console.error("Failed to fetch profile data:", await response.text());
              }
            } catch (error) {
              console.error("Error fetching profile:", error);
            }
          };



          // Assuming the JWT token is stored in localStorage
const token = localStorage.getItem("token"); // Replace this with sessionStorage if needed
const [idlogin,setidlogin]=useState((null))

fetch("http://127.0.0.1:8000/users/current-user", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`, // Send the token in the Authorization header
    "Content-Type": "application/json"
  }
})
  .then(response => {
    if (!response.ok) {
      if (response.status === 401) {
        console.error("Token is invalid or expired");
        // Redirect to login or refresh token logic here
      }
      throw new Error("Failed to fetch user details");
    }
    return response.json();
  })
  .then(data => {
    console.log("User data:", data);
    setidlogin(data.id)
    console.log("user_id")
    console.log(idlogin)

    // Use the user data in your frontend app (e.g., display user info, role-based UI rendering, etc.)
  })
  .catch(error => {
    console.error("Error fetching user details:", error);
  });


  const [prestataireIds, setPrestataireIds] = useState(28);
  const [availabilities, setAvailabilities] = useState([]);
  const [error, setError] = useState("");
  const [daysava,setdaysava]=useState([])


  const fetchAvailabilities = async () => {
     const prestataireIds=28
    try {
      setError(""); // Clear previous errors
      const response = await fetch(`http://127.0.0.1:8000/prestataire/available-days/${prestataireIds}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data.available_days) {
        setAvailabilities(data.available_days);
        setdaysava(data)
        console.log(data)

        console.log("avalibility")
        
      } else {
        setError(data.message || "No data found");
        setAvailabilities([]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAvailabilities();
  }, [prestataireIds]);
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDatee = today.toLocaleDateString('en-GB', options);


  const [selectedDay, setSelectedDay] = useState(null);
   // Handle the selection of a day (e.g., Monday, Friday, etc.)
 
 const convertToDate = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Function to generate hourly slots between the start and end time
  const generateHourlySlots = (startTime, endTime) => {
    const start = convertToDate(startTime);
    const end = convertToDate(endTime);
    const slots = [];

    while (start < end) {
      const slotStart = new Date(start);
      const slotEnd = new Date(start);
      slotEnd.setHours(start.getHours() + 1); // Increment by 1 hour

      // Format the time slot string
      const startStr = slotStart.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const endStr = slotEnd.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      slots.push({ start: startStr, end: endStr });

      // Move to the next slot
      start.setHours(start.getHours() + 1);
    }

    return slots;
  };

  // Handle the selection of a day (e.g., Monday, Friday, etc.)
  const handleDayClick = (day) => {
    setSelectedDay(day);
  };





  const [selectedSlots, setSelectedSlots] = useState([]);


  const handleCheckboxChange = (day, slot) => {
    const selectedSlot = { day, start: slot.start, end: slot.end };
  
    setSelectedSlots((prevSelectedSlots) => {
      const isSlotSelected = prevSelectedSlots.some(
        (selected) =>
          selected.day === day &&
          selected.start === slot.start &&
          selected.end === slot.end
      );
  
      if (isSlotSelected) {
        // Remove the slot if already selected
        return prevSelectedSlots.filter(
          (selected) =>
            selected.day !== day ||
            selected.start !== slot.start ||
            selected.end !== slot.end
        );
      } else {
        // Add the slot if not already selected
        return [...prevSelectedSlots, selectedSlot];
      }
    });
  };
  

  // Filter available time slots based on the selected day
  const getAvailableSlotsForDay = (day) => {
    const dayAvailabilities = availabilities.filter(
      (availability) => availability.day_of_week === day
    );

    return dayAvailabilities.length > 0 ? (
      dayAvailabilities.map((slot, index) => (
        <div key={index} className="border p-2 mb-2 rounded-lg m-4  items-center">
        
          {/* Display each hourly slot */}
          {generateHourlySlots(slot.start_time, slot.end_time).map((hourSlot, idx) => (
  <div key={idx} className="items-center">
    <input
      type="checkbox"
      className="h-4 w-4 mr-3 accent-green-600 border rounded-full"
      onChange={() => handleCheckboxChange(day, hourSlot)} // Pass day and hourSlot
    />
    <span>{`${hourSlot.start} - ${hourSlot.end}`}</span>
  </div>
))}
        </div>
      ))
    ) : (
      <div>This provider does not work on {day}</div>
    );
  };
















  

  return (
    <div>
    <Navbar/>
    <Header/>

    <div  className='p-10   relative    '>

<div  className={login && toke==false ? 'p-10 inset-0  filter blur-sm z-0 ':'p-10 inset-0 z-0'}>
  


        <div className='text-darkgray '  style={{fontSize:'60px',fontWeight:'100'}} >
        {t('mrs')} {pers.name}
        </div>
<div className='flex gap-10'>
    <div className='w-3/4' >
        <div className='font-poppins text-darkgray '  style={{fontSize:'15px',fontWeight:'800'}} >
      
        </div>
        <div className='font-poppins text-darkgray'  style={{fontSize:'15px',fontWeight:'800'}} >
        {t('number')}:{pers.phone_number}
        </div>
        <div  className='font-poppins text-darkgray ' style={{fontSize:'15px',fontWeight:'800'}} >
        {t('price')}: 3000DA
        </div>
        
<img  className='shadow-lg shadow-gray-400' style={{width:"100%",height:"400px"}}  src={image}/>
<br/>
<div>
    <div  style={{fontSize:'20px',fontWeight:'800'}} className='font-poppins mb-4'>  {t('description')}</div>
    <div className='font-poppins' style={{color:'#6F6F6F',fontSize:'10px'}}>
    {t('loremText')}
    </div>
    <div className='mt-4'>
  
  </div>
    <div>

    </div>
</div>
</div>
<div>
  

<div className="calendrier-container">
      <h1 className='font-poppins text-xl'>{t('chooseDate')}</h1>
      <div className="p-4 max-w-md mx-auto shadow-lg shadow-gray-400 bg-white  rounded-lg font-poppins mt-4">
      <h2 className="text-lg font-semibold text-center mb-4"> {formattedDatee}</h2>
      <div className="grid grid-cols-7 gap-2 text-center">
        {result.weekDays.map((day) => (
          <div  className="text-black-700 font-medium">
            
          {day.dayName} <div></div>
          </div>
        ))}
   {dates.map((date) => (
  <button
    key={date}
    onClick={() => {
      handleClick(date);
      afichagedetab(date);
    }}
    className={`p-2 rounded-full transition-colors ${
      clickedDates.includes(date)
        ? "bg-buttongreen text-white" // Selected non-free date
        : interd.includes(date)
        ? "bg-button_hover text-white" // Selected free day
        : remainingDays.includes(date)
        ? "text-red-500" // Free day (not clicked)
        : "text-black-700" // Default state
    }`}
  >
    {date}
  </button>
))}

      </div>
      <div className="mt-4 text-center"></div>
    </div>
  
      
      
      
      
      
      
      
      

      </div>
      { afiche===true  &&
        <div className=''>
      <h1 className='font-poppins text-xl mt-4 mb-4'>Choose Time :</h1>
       <div className='font-poppins    bg-white shadow-lg shadow-gray-400 rounded-lg pb-4 ' >
      
     <div className='bg-SecondaryColor w-auto  text-darkgray p-2'>
  {formattedDatee}
      
     </div>
      <div>
   

      
      </div><div>
  <div className="border p-2 mb-2 mt-2 rounded-lg shadow-amber-100 m-4 flex items-center">
    <input
      type="checkbox"
      className="h-4 w-4 mr-3 accent-green-600 border rounded-full"
    />
    <span>8 AM - 9 AM</span>
  </div>

  <div className="border p-2 mb-2 rounded-lg flex m-4   items-center">
    <input
      type="checkbox"
      className="h-4 w-4 mr-3 accent-green-600 border rounded-full"
    />
    <span>9 AM - 10 AM</span>
  </div>

  <div className="border p-2 mb-2 rounded-lg flex m-4  items-center">
    <input
      type="checkbox"
      className="h-4 w-4 mr-3 accent-green-600 border rounded-full"
    />
    <span>10 AM - 11 AM</span>
  </div>

  <div className="border p-2 mb-2 rounded-lg m-4  flex items-center">
    <input
      type="checkbox"
      className="h-4 w-4 mr-3 accent-green-600 border rounded-full"
    />
    <span>11 AM - 12 PM</span>
  </div>

  <div className="border p-2 mb-2 rounded-lg m-4 text-red-500  flex items-center">
    <input
      type="checkbox"
      className="h-4 w-4 mr-3  accent-green-600 border rounded-full"
    />
    <span>12 PM - 1 PM</span>
  </div>

  <div className="border p-2 mb-2 rounded-lg m-4  flex items-center">
    <input
      type="checkbox"
      className="h-4 w-4 mr-3 accent-green-600 border rounded-full"
    />
    <span>1 PM - 2 PM</span>
  </div>

  <div className="border p-2 mb-2 rounded-lg m-4  flex items-center">
    <input
      type="checkbox"
      className="h-4 w-4 mr-3 accent-green-600 border rounded-full"
    />
    <span>2 PM - 3 PM</span>
  </div>

  <div className="border p-2 mb-2 rounded-lg m-4  flex items-center">
    <input
      type="checkbox"
      className="h-4 w-4 mr-3 accent-green-600 border rounded-full"
    />
    <span>3 PM - 4 PM</span>
  </div>

</div>
      



    </div>
    <button className='bg-darkgray w-full  font-poppins flex justify-center gap-2  text-white  p-2 text-sm mt-4'>
      <img src={vect}/>
      <span onClick={(e)=>{setLogin(true);handleSubmi(e)}} >{t('navigation.bookNow')}</span>
 
  </button></div>}
    </div>
    </div>
    </div>
    
    
    {login && !Sign && toke==false &&  (
        <div className=''>
          <div className='font-poppins shadow-xl shadow-gray-300 absolute bg-white w-1/2 items-center justify-center left-80 bottom-80 z-50'>
            <div className='flex relative text-white' style={{ background: '#CB8587' }}>
              <div className='p-2 pl-4'>Log In to continue</div>
              <button
                onClick={() => {
                  setLogin(false);
                }}
                className='text-white text-2xl bg-none border-none cursor-pointer absolute right-0'
              >
                &times;
              </button>
            </div>

            <div className='m-7'>
              {/* Error messages */}
              {errorMessages.length > 0 && (
                <div className='mb-4'>
                  {errorMessages.map((error, index) => (
                    <div key={index} className='text-red-500'>{error}</div>
                  ))}
                </div>
              )}

              <div style={{ color: '#6F6F6F' }} className='pt-2 pb-2'>
                User name Or Email
              </div>
              <input
                className='w-full border p-2 rounded-lg'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className='pt-2 pb-2' style={{ color: '#6F6F6F' }}>
                Password
              </div>
              <input
                type='password'
                className='w-full border p-2 rounded-lg'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={handleLogin}
                className='w-full text-white p-2 mt-4'
                style={{ background: '#CB8587' }}
                disabled={loading}
              >
                {loading ? 'Logging In...' : 'Log In'}
              </button>

              <div style={{ color: '#6F6F6F' }} className='pt-2 justify-center items-center flex mt-4'>
                Forgot password?
              </div>
              <div className='border border-b-gray-400 mb-5 mt-4'></div>

              <button
                onClick={() => {
                  setSign(true);
                }}
                className='w-full text-white p-2'
                style={{ background: '#CB8587' }}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    {Sign && (
        <div className=''>
          <div className='font-poppins shadow-xl shadow-gray-300 absolute bg-white w-1/2 items-center justify-center left-80 bottom-80 z-50'>
            <div className='flex relative text-white' style={{ background: '#CB8587' }}>
              <div className='p-2 pl-4'>Create Account</div>
              <button
                onClick={() => {
                  setSign(false);
                }}
                className='text-white text-2xl bg-none border-none cursor-pointer absolute right-0'
              >
                &times;
              </button>
            </div>

            <div className='m-7'>
              {/* Error messages */}
              {errorMessages.length > 0 && (
                <div className='mb-4'>
                  {errorMessages.map((error, index) => (
                    <div key={index} className='text-red-500'>{error}</div>
                  ))}
                </div>
              )}

              <div style={{ color: '#6F6F6F' }} className='pt-2 pb-2'>
                User name
              </div>
              <input
                className='w-full border p-2 rounded-lg'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <div style={{ color: '#6F6F6F' }} className='pt-2 pb-2'>
                Email
              </div>
              <input
                className='w-full border p-2 rounded-lg'
                type='text'
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />

              <div className='pt-2 pb-2' style={{ color: '#6F6F6F' }}>
                Password
              </div>
              <input
                type='password'
                className='w-full border p-2 rounded-lg'
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />

              <div className='pt-2 pb-2' style={{ color: '#6F6F6F' }}>
                Confirm Password
              </div>
              <input
                type='password'
                className='w-full border p-2 rounded-lg mb-4'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div className="pb-4">
                <p style={{ color: "#6F6F6F" }} className="text-lg">
                  By creating an account, you agree to our
                  <div className="flex">
                    <p className="pr-2 text-lg" style={{ color: "#323232" }}>
                      Terms of use
                    </p>
                    <p className="pr-2">and</p>
                    <p style={{ color: "#323232" }} className="text-lg">
                      Privacy Policy
                    </p>
                  </div>
                </p>
              </div>

              <div className="flex border-black border w-3/4 mb-6 rounded-xl p-4 relative">
                <input
                  style={{ borderRadius: "10px" }}
                  type="checkbox"
                  className="text-white font-bold p-15 mr-5 w-4 rounded accent-green-600"
                  name="isNotRobot"
                />
                <p style={{ color: "#6F6F6F" }} className="text-lg">
                  I'm not a robot
                </p>

                <img className='absolute right-2 bottom-1' src={robot} />
              </div>

              <button
                onClick={handleCreateAccount}
                className='w-full text-white p-2'
                style={{ background: '#CB8587' }}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

    <div>
    
    <div>
      <div className="flex space-x-4">
        {/* Day selection buttons */}
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
          (day) => (
            <button
              key={day}
              className="p-2 border rounded-lg"
              onClick={() => handleDayClick(day)}
            >
              {day}
            </button>
          )
        )}
      </div>

      <div>
        {/* Render available slots for the selected day */}
        {selectedDay ? (
          <div>
            <h2>Available Slots for {selectedDay}:</h2>
            <div className='grid'>
            {getAvailableSlotsForDay(selectedDay)}</div>
          </div>
        ) : (
          <div>Select a day to see availability</div>
        )}
      </div>

    </div>




  

      
    </div>
</div>
  )
}

export default Onclick