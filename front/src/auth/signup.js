import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Import the hook
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "./Frame 1000001074.png"; // Your image
import flower from "./6f38207e8c3572bc2e268a7583a977e1-removebg-preview 1.png"; // Your image
import "./Signup.css";

export const Signup = () => {
  const { t } = useTranslation(); // Initialize the translation hook
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isNotRobot: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // To manage loading state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = t("usernameRequired");
    }
    if (!formData.email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = t("invalidEmail");
    }
    if (!formData.password) {
      newErrors.password = t("passwordRequired");
    } else if (formData.password.length < 8) {
      newErrors.password = t("passwordMinLength");
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("passwordsDontMatch");
    }
    if (!formData.isNotRobot) {
      newErrors.isNotRobot = t("confirmNotRobot");
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await axios.post("http://127.0.0.1:8000/auth/register", {
          name: formData.username,
          email: formData.email,
          password: formData.password,
          role: "client",
        });
        alert(t("registrationSuccess"));
        setLoading(false);
        navigate("/login"); // Redirect to login page after success
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.data.detail) {
          alert(error.response.data.detail);
        } else {
          alert(t("errorOccurred"));
        }
      }
    }
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }} className="flex w-full">
      <div className="w-1/2 h-full">
        <img className="w-full" src={image} alt={t("signupIllustration")} />
      </div>
      <div className="w-1/2 mcnter">
        <form onSubmit={handleSubmit} style={{ width: "80%" }}>
          <div style={{ color: "#323232" }} className="text-2xl font-bold pb-2">
            {t("createAccount")}
          </div>
          <h5 style={{ color: "#323232" }} className="mb-3 text-lg">
            {t("alreadyHaveAccount")}{" "}
            <a
              className="hover:underline cursor-pointer"
              onClick={() => navigate("/Login")}
            >
              {t("login")}
            </a>
          </h5>
          <div>
            <div>
              <p style={{ color: "#6F6F6F" }} className="text-lg">
                {t("username")}
              </p>
              <input
                style={{ borderColor: "#C1C1C1" }}
                className="border-solid border p-7 rounded-xl w-full h-10 mt-2 mb-2"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-500 text-lg">{errors.username}</p>
              )}
            </div>
            <div>
              <p style={{ color: "#6F6F6F" }} className="text-lg">
                {t("emailAddress")}
              </p>
              <input
                style={{ borderColor: "#C1C1C1" }}
                className="border-solid border p-7 rounded-xl w-full h-10 mt-2 mb-2"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-lg">{errors.email}</p>
              )}
            </div>
            <div>
              <p className="text-lg" style={{ color: "#6F6F6F" }}>
                {t("password")}
              </p>
              <input
                style={{ borderColor: "#C1C1C1" }}
                className="border-solid border p-7 rounded-xl w-full h-10 mt-2 mb-2"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-lg">{errors.password}</p>
              )}
              <div className="text-lg" style={{ color: "#6F6F6F" }}>
                {t("passwordHint")}
              </div>
            </div>
            <div>
              <p className="pt-3 text-lg" style={{ color: "#6F6F6F" }}>
                {t("confirmPassword")}
              </p>
              <input
                style={{ borderColor: "#C1C1C1" }}
                className="border-solid border p-7 rounded-xl w-full h-10 mt-2 mb-2"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-lg">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
          <div className="pb-4">
            <p style={{ color: "#6F6F6F" }} className="text-lg">
              {t("termsAndPrivacy")}
              <div className="flex">
                <p className="pr-2 text-lg" style={{ color: "#323232" }}>
                  {t("termsOfUse")}
                </p>
                <p className="pr-2">{t("and")}</p>
                <p style={{ color: "#323232" }} className="text-lg">
                  {t("privacyPolicy")}
                </p>
              </div>
            </p>
          </div>
          <div className="flex border-black border w-3/4 mb-6 rounded-xl p-4">
            <input
              style={{ borderRadius: "10px" }}
              type="checkbox"
              className="text-white font-bold p-15 mr-5 w-4 rounded accent-green-600"
              name="isNotRobot"
              checked={formData.isNotRobot}
              onChange={handleChange}
            />
            <p style={{ color: "#6F6F6F" }} className="text-lg">
              {t("imNotARobot")}
            </p>
          </div>
          {errors.isNotRobot && (
            <p className="text-red-500 text-lg">{errors.isNotRobot}</p>
          )}
          <div>
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#000",
                borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              className="h-12 pt-1 text-white text-lg w-3/5"
            >
              {loading ? t("creatingAccount") : t("createAccount")}
            </button>
            <div className="text-lg pt-4 flex">
              {t("alreadyHaveAccount")}{" "}
              <p
                className="hover:underline cursor-pointer"
                onClick={() => navigate("/Login")}
              >
                {t("login")}
              </p>
            </div>
          </div>
        </form>
        <img className="mflower" src={flower} alt="Decorative Flower" />
      </div>
    </div>
  );
};
