import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../sidebare/Sidebare";
import { useTranslation } from "react-i18next"; // استيراد مكتبة الترجمة

const Profil = () => {
  const { t } = useTranslation(); // استخدام الترجمة
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone_number: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const API_BASE_URL = "http://127.0.0.1:8000/profile";

  // Fetch profile data from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error(t("errors.not_logged_in"));
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/profile", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        setProfileData(response.data);
      } catch (error) {
        console.error(t("errors.fetch_profile_error"), error);
      }
    };

    fetchProfile();
  }, [t]);

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
      console.error(t("errors.not_logged_in"));
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
        alert(t("success.profile_updated"));
        setIsEditing(false);
      } else {
        alert(t("errors.update_failed"));
      }
    } catch (error) {
      console.error(t("errors.update_error"), error);
    }
  };

  // Change password functionality
  const handleChangePassword = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error(t("errors.not_logged_in"));
      return;
    }

    try {
      const oldPassword = prompt(t("prompts.enter_old_password"));

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
        alert(t("success.password_changed"));
      } else {
        alert(t("errors.password_change_failed"));
      }
    } catch (error) {
      console.error(t("errors.change_password_error"), error);
    }
  };

  return (
    <div className="font-poppins">
      <div className="flex relative">
        <div className="text-lg mb-5">{t("profile.title")}</div>
        <button
          className="absolute right-10 text-buttonColor"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? t("buttons.save") : t("buttons.edit")}
        </button>
      </div>
      <div>
        <div style={{ color: "#6F6F6F" }} className="pt-2 pb-2">
          {t("profile.username")}
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
          {t("profile.email")}
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
          {t("profile.phone_number")}
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
              placeholder={t("profile.new_password_placeholder")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div
              className="pt-2 pb-2 text-buttonColor cursor-pointer"
              onClick={handleChangePassword}
            >
              {t("buttons.change_password")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profil;
