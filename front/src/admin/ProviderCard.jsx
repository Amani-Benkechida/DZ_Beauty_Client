import React from "react";

const ProviderCard = ({ name, role, expertise, imgSrc, onEdit }) => {
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
