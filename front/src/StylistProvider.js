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
    const [firstletter,setFirstletr]=useState('')
    const [idservice,setIdservice]=useState(1)
    const [userid,setiserid]=useState(1);


  return (
    <StylistContext.Provider value={{stylistData,Oclick,fun,firstletter,setFirstletr,idservice,setIdservice,userid,setiserid}}>
      {children}
    </StylistContext.Provider>
  );
};

// Custom Hook to Use Context
export const useStylists = () => {
  return useContext(StylistContext);
};
