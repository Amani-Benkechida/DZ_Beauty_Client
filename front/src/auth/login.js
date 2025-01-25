import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import flower from './loginflower.png';
import image from './loginpic.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Login = () => {
  const { t, i18n } = useTranslation(); // Access translations
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Check if form is completely filled
  const isFormFilled = email.trim() !== '' && password.trim() !== '' && isChecked;

  const handleLogin = async () => {
    if (email === "admin@gmail.com" && password === "admin@2025") {
      navigate("/admin"); // Redirect to admin page
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login", {
        email: email,
        password: password,
      });

      console.log(response.data);

      // Save the token in localStorage
      localStorage.setItem("token", response.data.token);

      alert(response.data.message); // Display the success message
      navigate("/profile"); // Navigate to the dashboard
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.detail || t('loginFailed')); // Use translation for failure
      } else {
        setErrorMessage(t('loginFailed'));
      }
    }
  };

  return (
    <div className="flex content-center h-screen font-poppins">
      <div className="w-1/2 h-full">
        <img className="h-screen w-full" src={image} alt="Login Illustration" />
      </div>
      <div className="w-1/2 mcenter m-10">
        <div className="object-none h-full content-center mb-11 pb-11" style={{ width: "70%" }}>
          <div className="mb-7">
            <div style={{ color: "#323232" }} className="font-semibold text-4xl pb-2">
              {t('login')}
            </div>
            <h5 style={{ color: "#323232" }} className="mb-3">
              {t('noAccount')}{" "}
              <a onClick={() => { navigate("/Signup") }} className="inline-block hover:underline cursor-pointer">{t('signUp')}</a>
            </h5>
          </div>

          <div>
            <p style={{ color: "#6F6F6F" }}>{t('emailAddress')}</p>
            <input
              style={{ borderColor: "#C1C1C1" }}
              className="border-solid border p-7 rounded-xl w-full h-10 mt-2 mb-5"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p style={{ color: "#6F6F6F" }}>{t('password')}</p>
            <input
              style={{ borderColor: "#C1C1C1" }}
              className="border-solid border p-7 rounded-xl w-full h-10 mt-2 mb-5"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-right">
            <a href="/forgot-password" className="text-blue-500 text-sm hover:underline">
              {t('forgotPassword')}
            </a>
          </div>

          <div className="pb-4">
            <p style={{ color: "#6F6F6F" }}>
              {t('terms')} <span>{t('privacyPolicy')}</span>
            </p>
          </div>

          <div className="flex border-black border w-3/4 mb-6 rounded-xl p-4">
            <input
              style={{ borderRadius: "10px" }}
              type="checkbox"
              className="text-white font-bold p-15 mr-5 w-4 rounded"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <p style={{ color: "#6F6F6F" }}>{t('robotCheck')}</p>
          </div>

          <div>
            <button
              style={{
                backgroundColor: isFormFilled ? '#323232' : '#C1C1C1',
                borderRadius: "10px",
              }}
              className="h-12 text-white text-xl w-3/5"
              disabled={!isFormFilled}
              onClick={handleLogin}
            >
              {t('loginButton')}
            </button>
          </div>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <p>{t('noAccount')} <a className="hover:underline cursor-pointer" onClick={() => { navigate("/Signup") }}>{t('signUp')}</a></p>
          <img src={flower} className="absolute bottom-0 right-0" />
        </div>
      </div>
    </div>
  );
};

export default Login;
