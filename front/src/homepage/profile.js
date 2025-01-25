import { useNavigate } from "react-router-dom";
import {useStylists} from '../StylistProvider'
import { useEffect,useState } from "react";
const Profile = () => {
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check for the token in localStorage
  const [firstletter, setFirstletr] = useState(''); // To store the first letter of the user's name
  useEffect(() => {
   const savedFirstLetter = localStorage.getItem("firstletter");
   if (savedFirstLetter) {
     setFirstletr(savedFirstLetter); // Load from localStorage
   }
 }, []);
 const handleNavigation = () => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  if (token) {
    navigate("/profile"); // Navigate to the profile page if the token exists
  } else {
    navigate("/login"); // Navigate to the login page if no token exists
  }
};
  return (
    <div  onClick={handleNavigation} className="w-1/5 h-1/5 flex items-center justify-center cursor-pointer">
      {token ? (
        // If the token exists, display "L"
        <div
          className="bg-gray-200 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center"
        >
          {firstletter.charAt(0)}
        </div>
      ) : (
        // If no token, display the default SVG icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-user"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )}
    </div>
  );
};

export default Profile;
