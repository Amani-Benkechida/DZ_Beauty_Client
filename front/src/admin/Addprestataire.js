import React, { useState } from 'react';
import axios from 'axios';

const AddPrestataire = () => {
  const [formData, setFormData] = useState({
    name: '',
    familyName: '',
    phoneNumber: '',
    email: '',
    gender: '',
    position: '',
    photo: null,
  });

  const [availabilities, setAvailabilities] = useState([]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updatedAvailabilities = [...availabilities];
    updatedAvailabilities[index][field] = value;
    setAvailabilities(updatedAvailabilities);
  };

  const addAvailability = () => {
    setAvailabilities([...availabilities, { day_of_week: '', start_time: '', end_time: '' }]);
  };

  const removeAvailability = (index) => {
    const updatedAvailabilities = availabilities.filter((_, i) => i !== index);
    setAvailabilities(updatedAvailabilities);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.familyName.trim()) newErrors.familyName = 'Family Name is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.photo) newErrors.photo = 'Photo is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('family_name', formData.familyName);
      form.append('phone_number', formData.phoneNumber);
      form.append('email', formData.email);
      form.append('gender', formData.gender);
      form.append('position', formData.position);
      form.append('photo', formData.photo);
      form.append('availabilities', JSON.stringify(availabilities));

      const response = await axios.post('http://localhost:8000/prestataire/create', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Prestataire added successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error creating prestataire:', error.response?.data || error.message);
      alert('Failed to add prestataire.');
    }
  };

  return (
    <form className="font-poppins w-full form pl-10 pr-7 pb-7 mt-2" onSubmit={handleSubmit}>
      <div className="flex relative">
        <h2 className="text-xl font-bold mb-4">Add Prestataire</h2>
        <button type="submit" className="bg-buttonColor border rounded-lg text-white absolute right-10 w-20 h-8">
          Save
        </button>
      </div>

      <div className="shadow-lg shadow-gray-200 rounded-md max-w-full mx-auto font-poppins mr-8">
        <div className="flex flex-col items-center">
          <div
            className="relative w-32 h-32 mb-4 bg-[#C1C1C1] rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => document.getElementById('photoInput').click()}
          >
            {formData.photo ? (
              <img
                src={URL.createObjectURL(formData.photo)}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm justify-center flex items-center">Upload Photo</span>
            )}
          </div>
          <input
            id="photoInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
        </div>

        <div className="space-y-4 pl-32 pr-32 pb-3">
          <div className="flex gap-10">
            <div className="flex-1">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Family Name</label>
              <input
                type="text"
                name="familyName"
                value={formData.familyName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
              {errors.familyName && <p className="text-red-500 text-sm">{errors.familyName}</p>}
            </div>
          </div>

          <div className="flex gap-10">
            <div className="flex-1">
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
          </div>

          <div className="flex gap-10">
            <div className="flex-1">
              <label className="block text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Position</label>
              <select
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            >
               
              <option value="Skin care & facial">Skin care & facial</option>
              <option value="Massage & body therapy">Massage & body therapy</option>
              <option value="Nail Stylist">Nail Stylist</option>
              <option value="Nail Stylist">Nail Stylist</option>
            </select>
              {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg mb-2 font-bold">Availabilities</h3>
        {availabilities.map((availability, index) => (
          <div key={index} className="flex gap-4 mb-3">
            <div className="flex-1">
              <label className="block text-sm font-medium">Day</label>
              <select
                value={availability.day_of_week}
                onChange={(e) => handleAvailabilityChange(index, 'day_of_week', e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">From</label>
              <input
                type="time"
                value={availability.start_time}
                onChange={(e) => handleAvailabilityChange(index, 'start_time', e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">To</label>
              <input
                type="time"
                value={availability.end_time}
                onChange={(e) => handleAvailabilityChange(index, 'end_time', e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={() => removeAvailability(index)}
              className="self-center px-3 py-1 bg-red-500 text-white rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addAvailability}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Add Availability
        </button>
      </div>
    </form>
  );
};

export default AddPrestataire;
