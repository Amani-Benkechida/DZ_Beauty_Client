import React, { useEffect, useState } from "react";
import axios from "axios";


const ProviderCard = ({ key,name, role, expertise, imgSrc, onEdit,idser }) => {


  
  const idservice=1
const [info,setInfo]=useState(0)
  const fetchPrestatairesByService = async (serviceId) => {
    try {
      const response = await axios.get("http://localhost:8000/prestataire", {
        params: { service_id:parseInt(1)}
      });
      console.log("Prestataires:", response.data.prestataires);
      console.log(response.data)
      setInfo(response.data.prestataires)
      console.log("khara")

      console.log(serviceId)
   // Update state with fetched data
    } catch (error) {
      console.error("Error fetching prestataires:", error.response?.data || error.message);
    
    }
  };
  
const API_BASE_URL = "http://localhost:8000/prf";
const  [profileResponses,setadd] = useState([]); 

const getPrestataireProfile = async (profileId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${profileId}`);
  
    console.log(response.data);
    setadd((prevProfiles) => [...prevProfiles, response.data.user_id]);

  } catch (error) {
    throw error.response?.data?.detail || "An error occurred";
  }
};

useEffect(() => {
  fetchPrestatairesByService(idservice);
  
 
 /*   getPrestataireProfile(parseInt(info[key])); */  // Fetch profile info for the current serviceId

}, [idservice]); // Only run fetchPrestatairesByService when serviceId changes
 









  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center w-60">
      {/* Profile Image */}
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name and Details */}
      <h3 className="text-lg font-semibold mt-4">{name}</h3>
      <p className="text-gray-500 text-sm">{role}</p>
      <p className="text-gray-700 text-sm font-medium mt-2">
        Level of expertise: {expertise}
      </p>

      {/* Edit Button */}
      <button
         // Pass onEdit function as a prop
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Edit
      </button>
    </div>
  );
};

export default ProviderCard;