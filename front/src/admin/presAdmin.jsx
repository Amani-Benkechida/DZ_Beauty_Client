import React, { useState } from 'react';
import ProviderCard from './ProviderCard'; 
import img from './image 9.png';

const providers = [
  {
    name: 'Jason Price',
    role: 'Hair Stylist',
    expertise: 'Master',
    imgSrc: img, 
  },
  {
    name: 'Ikram Ouali',
    role: 'Hair Stylist',
    expertise: 'Elite',
    imgSrc: img,
  },
  {
    name: 'Hadjira',
    role: 'Nail Stylist',
    expertise: 'Master',
    imgSrc: img,
  },
  {
    name: 'Hibat Allah',
    role: 'Massage & Body Therapy',
    expertise: 'Master',
    imgSrc: img,
  },
];

const Prestataires = () => {
  const [filter, setFilter] = useState('All'); // Manage the active filter

  // Function to filter providers based on the selected role
  const filteredProviders = providers.filter((provider) => {
    return filter === 'All' || provider.role === filter;
  });

  return (
    <div className="flex">
      <div className="w-1/5"></div>
      <div className="p-6 bg-gray-50 w-2/3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Prestataires</h2>
          <button className="px-4 py-2 bg-button_hover text-white rounded-lg hover:bg-black">
            Add New Prestataire
          </button>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            className={`px-3 py-1 ${filter === 'All' ? 'bg-[#EDDADA] text-button_hover' : 'bg-gray-200 text-gray-700'} rounded-lg`}
            onClick={() => setFilter('All')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 ${filter === 'Hair Stylist' ? 'bg-[#EDDADA] text-button_hover' : 'bg-gray-200 text-gray-700'} rounded-lg`}
            onClick={() => setFilter('Hair Stylist')}
          >
            Hair Stylist
          </button>
          <button
            className={`px-3 py-1 ${filter === 'Nail Stylist' ? 'bg-[#EDDADA] text-button_hover' : 'bg-gray-200 text-gray-700'} rounded-lg`}
            onClick={() => setFilter('Nail Stylist')}
          >
            Nail Stylist
          </button>
          <button
            className={`px-3 py-1 ${filter === 'Massage & Body Therapy' ? 'bg-[#EDDADA] text-button_hover' : 'bg-gray-200 text-gray-700'} rounded-lg`}
            onClick={() => setFilter('Massage & Body Therapy')}
          >
            Massage & Body Therapy
          </button>
          <button
            className={`px-3 py-1 ${filter === 'Skin Care & Facial' ? 'bg-[#EDDADA] text-button_hover' : 'bg-gray-200 text-gray-700'} rounded-lg`}
            onClick={() => setFilter('Skin Care & Facial')}
          >
            Skin Care & Facial
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {filteredProviders.map((provider, index) => (
            <ProviderCard
              key={index}
              name={provider.name}
              role={provider.role}
              expertise={provider.expertise}
              imgSrc={provider.imgSrc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prestataires;
