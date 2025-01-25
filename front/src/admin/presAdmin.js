import React, { useEffect, useState } from "react";
import ProviderCard from "./providercard"; 
import img from "./image 9.png";
import axios from "axios";
const providers = [
  {
    name: "Jason Price",
    role: "Hair Stylist",
    expertise: "Master",
    imgSrc: img,
  },
  {
    name: "Ikram Ouali",
    role: "Hair Stylist",
    expertise: "Elite",
    imgSrc: img,
  },
  {
    name: "Hadjira",
    role: "Nail Stylist",
    expertise: "Master",
    imgSrc: img,
  },
  {
    name: "Hibat Allah",
    role: "Massage & Body Therapy",
    expertise: "Master",
    imgSrc: img,
  },
];
const Prestataires = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 
  const [filter, setFilter] = useState(1); 

  
  
  const idservice=1
const [info,setInfo]=useState(0)
  const fetchPrestatairesByService = async (serviceId) => {
    try {
      const response = await axios.get("http://localhost:8000/prestataire", {
        params: { service_id:parseInt(serviceId)}
      });
      console.log("Prestataires:", response.data.prestataires);
      console.log(response.data)
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
    if (filter) {
      fetchPrestatairesByService(filter);

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







 
  
  
  
  
  
  
  
  
  
  
  // Manage the active filter
  const [editProvider, setEditProvider] = useState(null); // Track provider being edited

  // Function to filter providers based on the selected role
  const filteredProviders = providers.filter((provider) => {
    return filter === "All" || provider.role === filter;
  });

  // Edit button handler
  const handleEdit = (provider) => {
    setEditProvider(provider); // Set the provider being edited
  };
  console.log(filter)



 const [selectedCategory, setSelectedCategory] = useState(0); // State for numeric value

  const categories = [
    { name: "All", value: 0 },
    { name: "Hair Stylist", value: 1 },
    { name: "Nail Stylist", value: 2 },
    { name: "Massage & Body Therapy", value: 3 },
    { name: "Skin Care & Facial", value: 4 },
  ];

  const handleCategoryClick = (category) => {
    setFilter(category.name);
    setSelectedCategory(category.value);
  };


  return (
    <div className="flex font-poppins">
      
      <div className="p-6  ">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Prestataires</h2>
          <button className="px-4 py-2 bg-button_hover text-white rounded-lg hover:bg-black">
            Add New Prestataire
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4 mt-4">
          {["Hair Stylist", "Nail Stylist", "Massage & Body Therapy", "Skin Care & Facial"].map((category,index) => (
            <button
              key={index}
              className={`px-3 py-1 ${
                filter === category ? "bg-[#EDDADA] text-button_hover" : "bg-gray-200 text-gray-700"
              } rounded-lg`}
              onClick={() => {setFilter(index+1)}}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {users.map((provider, index) => (
            <ProviderCard
              key={index}
              name={provider.name}
              role={provider.phone_number}
              imgSrc={img}

            
              
              onEdit={() => {handleEdit(provider);}} // Pass edit handler
            />
          ))}
        </div>

        {/* Edit Form/Modal */}
        {editProvider && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-semibold">Edit Provider</h3>
              <form>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm">Name</label>
                  <input
                    type="text"
                    value={editProvider.name}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm">Role</label>
                  <input
                    type="text"
                    value={editProvider.role}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm">Expertise</label>
                  <input
                    type="text"
                    value={editProvider.expertise}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg mr-2"
                    onClick={() => setEditProvider(null)} // Close modal
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prestataires;