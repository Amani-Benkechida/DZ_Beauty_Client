import React, { createContext, useContext, useState } from "react";

// Create the Context
const StylistContext = createContext();

// Sample Data
const stylistData = [
  {
    name: "Hiba Bella",
    profession: "Hair Stylist",
    expertiseLevel: "Stylist",
    price: "2000 DA",
   
  },
  {
    name: "Amira Zayn",
    profession: "Makeup Artist",
    expertiseLevel: "Senior Artist",
    price: "3000 DA",
   
  },
];



// Context Provider Component
export const StylistProvider = ({ children }) => {
    const [Oclick,setOlick]=useState(2)
    const fun=(id)=>{
        setOlick(id)

    }

  return (
    <StylistContext.Provider value={{stylistData,Oclick,fun}}>
      {children}
    </StylistContext.Provider>
  );
};

// Custom Hook to Use Context
export const useStylists = () => {
  return useContext(StylistContext);
};
