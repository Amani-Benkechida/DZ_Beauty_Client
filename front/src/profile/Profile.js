import React, { useState } from 'react';
import Sidebar from '../sidebare/Sidebare';

const Profil = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing((prevState) => !prevState);
  };

  return (
    <div className="font-poppins">
      <div className="flex relative">
        <div className="text-lg mb-5">User Profile Summary</div>
        <button
          className="absolute right-10 text-buttonColor"
          onClick={handleEditToggle}
        >
          {isEditing ? 'SAVE' : 'EDIT'}
        </button>
      </div>
      <div>
        <div style={{ color: '#6F6F6F' }} className="pt-2 pb-2">
          User name
        </div>
        <input
          className="w-3/4 border p-2 rounded-lg"
          type="text"
          disabled={!isEditing}
        />
        <div style={{ color: '#6F6F6F' }} className="pt-2 pb-2">
          Email
        </div>
        <input
          className="l border p-2 rounded-lg w-3/4"
          type="text"
          disabled={!isEditing}
        />
           <div style={{ color: '#6F6F6F' }} className="pt-2 pb-2">
        Number
        </div>
        <input
          className="l border p-2 rounded-lg w-3/4"
          type="text"
          disabled={!isEditing}
        />
        <div className="pt-2 pb-2" style={{ color: '#6F6F6F' }}>
          Password
        </div>
        <input
          type="password"
          className="w-3/4 border p-2 rounded-lg"
          disabled={!isEditing}
        />
        {isEditing && (
          <div
            className="pt-2 pb-2 text-buttonColor cursor-pointer"
            onClick={() => alert('Password change functionality coming soon!')}
          >
            CHANGE PASSWORD
          </div>
        )}
      </div>
    
    </div>
  );
};

export default Profil;
