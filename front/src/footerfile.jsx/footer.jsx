import React from 'react';
import MapPin from './MapPin';
import Facebook from './Facebook';
import Instagram from './Instagram';
import Snapchat from './Snapchat';

const Footer = () => {
  return (
    <footer className="bg-[#8E8B63] text-white py-6 font-poppins absolute bottom-0 w-full left-0 right-0">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        {/* Logo & Locations */}
        <div>
          <h2 className="text-lg font-bold mb-3 font-klaristha">Bijo.Dadi</h2>
          <p className="mb-1">Book Before</p>
          <ul className="space-y-[18px]">
            <li className="flex items-center gap-2">
              <MapPin /> Lerabaa - Blida
            </li>
            <li className="flex items-center gap-2">
              <MapPin /> Bab Ezzouar - Alger
            </li>
          </ul>
        </div>
        {/* Book Now Section */}
        <div>
          <h3 className="text-lg font-bold mb-3 font-klaristha">Book Now</h3>
          <ul className="space-y-[18px]">
            <li className="hover:underline cursor-pointer">Nail Care</li>
            <li className="hover:underline cursor-pointer">Hair Services</li>
            <li className="hover:underline cursor-pointer">Facial & Skin Care</li>
          </ul>
        </div>
        {/* Browse Section */}
        <div>
          <h3 className="text-lg font-bold mb-3 font-klaristha">Browse</h3>
          <ul className="space-y-[18px]">
            <li className="hover:underline cursor-pointer">Services</li>
            <li className="hover:underline cursor-pointer">Our Offers</li>
            <li className="hover:underline cursor-pointer">Our Team</li>
          </ul>
        </div>
        {/* Follow Us Section */}
        <div>
          <h3 className="text-lg font-bold mb-3 font-klaristha">Follow Us</h3>
          <ul className="space-y-[18px]">
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline cursor-pointer"
              >
                <Facebook className="w-5 h-5" />
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline cursor-pointer"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.snapchat.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline cursor-pointer"
              >
                <Snapchat className="w-5 h-5" />
                Snapchat
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="border-t border-white mt-6 pt-4 text-center text-xs mr-4 ml-4">
        <div className="flex flex-col md:flex-row gap-[950px] mr-[270px] justify-center items-center gap-4">
          <p>2023 © All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="underline hover:underline cursor-pointer">
              Terms & Conditions
            </a>
            <a href="#" className="underline hover:underline cursor-pointer">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
