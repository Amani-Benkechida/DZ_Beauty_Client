import React from "react";

const ProviderCard = ({ name, role, expertise, imgSrc }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center w-60">
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold mt-4">{name}</h3>
      <p className="text-gray-500 text-sm">{role}</p>
      <p className="text-gray-700 text-sm font-medium mt-2">
        Level of expertise: {expertise}
      </p>
    </div>
  );
};

export default ProviderCard;
