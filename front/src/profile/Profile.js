import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../sidebare/Sidebare";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone_number: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const API_BASE_URL = "http://127.0.0.1:8000/profile/am";

  // Fetch profile data from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      

      if (!token) {
      
        console.error("User is not logged in.");
        return;
      }

      try {
        console.log("amina")
        console.log(token)
        const response = await axios.get("http://127.0.0.1:8000/profile/mina", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save updated profile
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User is not logged in.");
      return;
    }

    try {
      const response = await axios.put(API_BASE_URL, profileData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Change password functionality
  const handleChangePassword = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User is not logged in.");
      return;
    }

    try {
      const oldPassword = prompt("Enter your old password:");

      const response = await axios.put(
        `${API_BASE_URL}/change-password`,
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Password changed successfully!");
      } else {
        alert("Failed to change password.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <div className="font-poppins">
      <div className="flex relative">
        <div className="text-lg mb-5">User Profile Summary</div>
        <button
          className="absolute right-10 text-buttonColor"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? "SAVE" : "EDIT"}
        </button>
      </div>
      <div>
        <div style={{ color: "#6F6F6F" }} className="pt-2 pb-2">
          User Name
        </div>
        <input
          className="w-3/4 border p-2 rounded-lg"
          type="text"
          name="name"
          value={profileData.name}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <div style={{ color: "#6F6F6F" }} className="pt-2 pb-2">
          Email
        </div>
        <input
          className="w-3/4 border p-2 rounded-lg"
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <div style={{ color: "#6F6F6F" }} className="pt-2 pb-2">
          Phone Number
        </div>
        <input
          className="w-3/4 border p-2 rounded-lg"
          type="text"
          name="phone_number"
          value={profileData.phone_number || ""}
          onChange={handleChange}
          disabled={!isEditing}
        />
        {isEditing && (
          <div className="pt-2">
            <input
              className="w-3/4 border p-2 rounded-lg"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div
              className="pt-2 pb-2 text-buttonColor cursor-pointer"
              onClick={handleChangePassword}
            >
              CHANGE PASSWORD
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;