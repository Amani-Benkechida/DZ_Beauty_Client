import React, { useState } from "react";
import image from "./Frame 1000001074.png";
import "./Signup.css";
import flower from "./6f38207e8c3572bc2e268a7583a977e1-removebg-preview 1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls


export const Signup = () => {
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
      newErrors.username = "Username is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.isNotRobot) {
      newErrors.isNotRobot = "Please confirm you are not a robot.";
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
        alert("Registration successful! AMINA");
        setLoading(false);
        navigate("/login"); // Redirect to login page after success
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.data.detail) {
          alert(error.response.data.detail);
        } else {
          alert("An error occurred. Please try again later.");
        }
      }
    }
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }} className="flex w-full">
      <div className="w-1/2 h-full">
        <img className="w-full" src={image} alt="Signup Illustration" />
      </div>
      <div className="w-1/2 mcnter">
        <form onSubmit={handleSubmit} style={{ width: "80%" }}>
          <div style={{ color: "#323232" }} className="text-2xl font-bold pb-2">
            Create an account
          </div>
          <h5 style={{ color: "#323232" }} className="mb-3 text-lg">
            Already have an account?{" "}
            <a
            /*   onClick={() => navigate("/login")} */
              className="hover:underline cursor-pointer"
            >
              Log in
            </a>
          </h5>
          <div>
            <div>
              <p style={{ color: "#6F6F6F" }} className="text-lg">
                User name
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
                Email address
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
                Password
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
              <div
                className="text-lg"
                style={{ color: "#6F6F6F" }}
              >
                Use 8 or more characters with a mix of letters, numbers & symbols
              </div>
            </div>
            <div>
              <p className="pt-3 text-lg" style={{ color: "#6F6F6F" }}>
                Confirm Password
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
                <p className="text-red-500 text-lg">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          <div className="pb-4">
            <p style={{ color: "#6F6F6F" }} className="text-lg">
              By creating an account, you agree to our
              <div className="flex">
                <p className="pr-2 text-lg" style={{ color: "#323232" }}>
                  Terms of use
                </p>
                <p className="pr-2">and</p>{" "}
                <p style={{ color: "#323232" }} className="text-lg">
                  Privacy Policy
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
              I'm not a robot 
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
              {loading ? "Creating..." : "Create an account"}
            </button>
            <div className="text-lg pt-4 flex">
              Already have an account?
              <p
              /*   onClick={() => navigate("/login")} */
                className="hover:underline cursor-pointer"
              >
                Log in
              </p>
            </div>
          </div>
        </form>
        <img className="mflower" src={flower} alt="Decorative Flower" />
      </div>
    </div>
  );
};
