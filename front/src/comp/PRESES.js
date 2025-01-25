import React from 'react';
import Pres from './Pres';
import image1 from './A.png'
import image2 from './B.png'
import data from '../info.json';
import axios from 'axios';
import  { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next'

 import {useStylists} from '../StylistProvider'
 const PRESES = () => {
  const {idservice} = useStylists();
  console.log(idservice)
  const firstStylist = data.stylists[0];
  const secondStylist= data.stylists[1];
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { t } = useTranslation(); // In

  

  
const [info,setInfo]=useState(0)
  const fetchPrestatairesByService = async (serviceId) => {
    try {
      const response = await axios.get("http://localhost:8000/prestataire", {
        params: { service_id:parseInt(idservice)}
      });
      console.log("Prestataires:", response.data.prestataires);
      setInfo(response.data.prestataires)
      console.log(serviceId)
      setServices(response.data.prestataires); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching prestataires:", error.response?.data || error.message);
      setError("Failed to fetch prestataires.");
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
; // Dependency array ensures this runs when info changes

const [profiles, setProfiles] = useState([]);

const fetchAllProfiles = async () => {
  try {
    console.log("Fetching profiles for IDs:", info);

    // Use Promise.all to fetch all profiles concurrently
    const profilesData = await Promise.all(
      info.map(async (id) => {
        if (!id) {
          console.warn("Invalid ID encountered:", id);
          return undefined;
        }
        try {
          const profile = await getPrestataireProfile(id); // Fetch profile by ID
          console.log(`Profile fetched for ID ${id}:`, profile);
          return profile;
        } catch (err) {
          console.error(`Error fetching profile for ID ${id}:`, err);
          return undefined;
        }
      })
    );

    console.log("All Profiles Data:", profilesData);
    setProfiles(profilesData.filter((profile) => profile)); // Filter out undefined values
  } catch (error) {
    console.error("Error fetching profiles:", error);
    setError("Failed to fetch profiles.");
  }
};

useEffect(() => {
  fetchAllProfiles();
}, [info]);

console.log("Profiles state:", profiles);
console.log('helo')
console.log(profileResponses)



  useEffect(() => {
    if (idservice) {
      fetchPrestatairesByService(idservice);

    }

  }, [idservice]);
   // Dependency array ensures this runs when idservice changes

  

  
   const [users, setUsers] = useState([]);


   async function getUser(id) {
    try {
      const response = await axios.get(`http://localhost:8000/${id}`);
      
      // Update state with fetched data
      setUsers((prevUsers) => {
        // Check if the user ID already exists in the state
        if (!prevUsers.some((user) => user.id === response.data.id)) {
          return [...prevUsers, response.data]; // Add user only if not already in the list
        }
        return prevUsers; // Return the previous state if the user already exists
      });

      return response.data; // Return the user data
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Failed to fetch user data');
      return null; // Return null if there is an error
    }
  }

  async function fetchUsers() {
  if (profileResponses && profileResponses.length > 0) {
    console.log(profileResponses[0]);

    // Use Promise.all to fetch all users concurrently
    const userPromises = profileResponses.map(async (profileId) => {
      const userId = parseInt(profileId);
      console.log("Fetching user with ID:", userId);
      return await getUser(userId);
    });

    // Wait for all user fetching promises to complete
    await Promise.all(userPromises);
  }

  console.log("hello");
  // This will be updated after all users are fetched
}
useEffect(() => {
  if (profileResponses.length > 0) {
    fetchUsers();
  ;// Fetch users whenever `profileResponses` changes
  }
}, [profileResponses])
console.log(users)




  // Dependency array ensures this runs when profileResponses changes



  // Call the function with the user ID you want to fetch
 // Replace 1 with the actual user ID

 
    
  


 const fetchServices = async () => {
  try {
    setLoading(true);
    const response = await axios.get("http://localhost:8000/servicetable");
    setServices(response.data); // Store fetched services in state
    console.log("Services fetched successfully:", response.data);
  } catch (err) {
    console.error("Error fetching services:", err.response?.data || err.message);
    setError("Failed to load services.");
  } finally {
    setLoading(false);
  }
};

// Fetch services when the component mounts
useEffect(() => {
  fetchServices();
}, []);


  return (
    
  


    
          
     <div className='pt-0 p-24'>
           
      <div className='text-darkgray' style={{ fontSize: '45px', fontWeight: '100',fontColor:'#323232' }}>
      {t('best')}
        <br/>
      </div>
      <div className=' grid grid-cols-4 gap-4  p-6  '>
      {users.map((stylist, index) => (
        <Pres
        
          id={stylist.id}
          name={stylist.name}
          profision={stylist.phone_number}
          image={stylist.image} // Ensure a unique key for React rendering
        
      
       
          
        />
      ))}
        
      </div>
    
      </div>
     


  
  );
};

export default PRESES;