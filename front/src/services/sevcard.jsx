import React from "react";

const ServiceCard = ({ image, title, description, time, price, discount }) => {
  return (
    <div className="max-w-sm mx-auto bg-white overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
      </div>
      {/* Button directly under the image with slight transparency */}
      <button className="w-full py-2 bg-[#323232]  text-white text-center font-semibold">
        Book Now
      </button>
      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
        <p className="text-gray-500 text-sm">Time: {time}</p>
        <p className="text-red-500 text-lg font-semibold mt-2">{price}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
