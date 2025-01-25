import React, { useState } from "react";
import ProviderCard from "./providercard"; 
import img from "./image 9.png";

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
  const [filter, setFilter] = useState("All"); // Manage the active filter
  const [editProvider, setEditProvider] = useState(null); // Track provider being edited

  // Function to filter providers based on the selected role
  const filteredProviders = providers.filter((provider) => {
    return filter === "All" || provider.role === filter;
  });

  // Edit button handler
  const handleEdit = (provider) => {
    setEditProvider(provider); // Set the provider being edited
  };

  return (
    <div className="flex">
      >
      <div className="p-6  ">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Prestataires</h2>
          <button className="px-4 py-2 bg-button_hover text-white rounded-lg hover:bg-black">
            Add New Prestataire
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4 mt-4">
          {["All", "Hair Stylist", "Nail Stylist", "Massage & Body Therapy", "Skin Care & Facial"].map((category) => (
            <button
              key={category}
              className={`px-3 py-1 ${
                filter === category ? "bg-[#EDDADA] text-button_hover" : "bg-gray-200 text-gray-700"
              } rounded-lg`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {filteredProviders.map((provider, index) => (
            <ProviderCard
              key={index}
              name={provider.name}
              role={provider.role}
              expertise={provider.expertise}
              imgSrc={provider.imgSrc}
              onEdit={() => handleEdit(provider)} // Pass edit handler
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