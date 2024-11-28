import React, { useState } from "react";
import image from "./Frame 1000001074.png";
import "./Signup.css";
import flower from "./6f38207e8c3572bc2e268a7583a977e1-removebg-preview 1.png";

export const Signup = () => {
  // State to manage form data and errors
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isNotRobot: false,
  });
  const [beggin,setbegin]=useState(true);
  const [eer,seterr]=useState(false);

  

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Validate the form
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
   


      // Proceed with further actions (e.g., send data to an API)
    }

  };
  const black=()=>{
    

  if(formData.username.trim()==!' ' && formData.password.trim()==!' ' && formData.confirmPassword.trim()==!' ' && formData.email.trim()==!' ' && formData.isNotRobot==true)
     setbegin(false)


      // Proceed with further actions (e.g., send data to an API)
    

  };

  return (
    <div className="flex">
      <div className="w-1/2">
        <img src={image} alt="Signup Illustration" />
      </div>
      <div className="w-1/2 mcnter">
        <form onSubmit={handleSubmit} style={{ width: "85%" }}>
          <div style={{ color: "#323232" }} className="text-4xl pb-2">
            Create an account
          </div>
          <h5 style={{ color: "#323232" }} className="mb-3">
            Already have an account?{" "}
            <a className="inline-block border-b-2 border-black">Log in</a>
          </h5>
          <div>
            <div>
              <p style={{ color: "#6F6F6F" }}>User name</p>
              <input
                style={{ borderColor: "#C1C1C1" }}
                className="border-solid border p-7 rounded-xl w-full h-10 mt-2 mb-2"
                type="text"
                name="username"
                value={formData.username}
                onChange={(e)=>{handleChange(e);black()}}
              />
              {errors.username && <p className="text-red-500">{errors.username}</p>}
            </div>
            <div>
              <p style={{ color: "#6F6F6F" }}>Email address</p>
              <input
                style={{ borderColor: "#C1C1C1" }}
                className="border-solid border p-7 rounded-xl w-full h-10 mt-2 mb-2"
                type="text"
                name="email"
                value={formData.email}
              onChange={(e)=>{handleChange(e);black()}}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div>
              <p style={{ color: "#6F6F6F" }}>Password</p>
              <input
                style={{ borderColor: "#C1C1C1" }}
                className="border-solid border p-7 rounded-xl w-full h-10 mt-2 mb-2"
                type="password"
                name="password"
                value={formData.password}
              onChange={(e)=>{handleChange(e);black()}}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
              <div style={{ color: "#6F6F6F", fontSize: "14px" }}>
                Use 8 or more characters with a mix of letters, numbers & symbols
              </div>
            </div>
            <div>
              <p className="pt-3" style={{ color: "#6F6F6F" }}>
                Confirm Password
              </p>
              <input
                style={{ borderColor: "#C1C1C1" }}
                className="border-solid border p-7 rounded-xl w-full h-10 mt-2 mb-2"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
              onChange={(e)=>{handleChange(e);black()}}
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
          <div className="pb-4">
            <p style={{ color: "#6F6F6F" }}>
              By creating an account, you agree to our
              <div className="flex">
                <p className="pr-2" style={{ color: "#323232" }}>
                  Terms of use{" "}
                </p>
                <p className="pr-2">and</p>{" "}
                <p style={{ color: "#323232" }}>Privacy Policy</p>
              </div>
            </p>
          </div>
          <div className="flex border-black border w-3/4 mb-6 rounded-xl p-4">
            <input
              style={{ borderRadius: "10px" }}
              type="checkbox"
              className="text-white font-bold p-15 mr-5 w-4 rounded"
              name="isNotRobot"
              checked={formData.isNotRobot}
            onChange={(e)=>{handleChange(e);black()}}
            />
            <p style={{ color: "#6F6F6F" }}>I'm not a robot</p>
          </div>
          {errors.isNotRobot && (
            <p className="text-red-500">{errors.isNotRobot}</p>
          )}
          <div>
            <button
              type="submit"
             

              style={{
                backgroundColor:(beggin )?"#C1C1C1":"black",
                borderRadius: "10px",
              }}
              
              className="h-12 text-white text-xl w-3/5"
            >
              Create an account
            </button>
          </div>
        </form>
        <img className="mflower" src={flower} alt="Decorative Flower" />
      </div>
    </div>
  );
};
