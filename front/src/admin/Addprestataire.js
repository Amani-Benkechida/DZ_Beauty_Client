import React, { useState } from 'react';

const Addprestataire = () => {
  const [formData, setFormData] = useState({
    name: '',
    familyName: '',
    phoneNumber: '',
    email: '',
    gender: '',
    position: '',
    photo: null,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log('Form Submitted Successfully', formData);
      alert('Prestataire added successfully!');
      // Add your form submission logic here (e.g., API call)
    }
  };

  return (

    <form className='font-poppins w-full form pl-10 pr-7  pb-7 mt-2' onSubmit={handleSubmit} >

<div className='flex  relative'>    <h2 className=" text-xl font-bold mb-4">Add Prestataire</h2>
<button type='submit' className='bg-buttonColor border rounded-lg text-white absolute right-10 w-20 h-8'>save</button></div>

     

    <div className="  shadow-lg shadow-gray-200 rounded-md max-w-full mx-auto font-poppins mr-8  ">
    <div className="flex flex-col items-center ">
 
  <div
    className="relative w-32 h-32 mb-4 bg-[#C1C1C1] rounded-full flex items-center justify-center  cursor-pointer "
    onClick={() => document.getElementById('photoInput').click()} // Trigger click on hidden input
  >
    {formData.photo ? (
      <img
        src={URL.createObjectURL(formData.photo)}
        alt="Preview"
        className="w-32 h-32 rounded-full object-cover "
      />
    ) : (
      <span className="text-gray-500 text-sm justify-center flex items-center">Upload Photo</span>
    )}
  </div>
  <input
    id="photoInput" // Unique ID for reference
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className="hidden" // Hide the file input
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
            <label className="block text-sm font-medium">position</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            >
               
              <option value="Skin care & facial">Skin care & facial</option>
              <option value="Massage & body therapy">Massage & body therapy</option>
              <option value="Nail Stylist">Nail Stylist</option>
              <option value="Nail Stylist">Nail Stylist</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Level of expertise</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            />
            {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
          </div>
        </div>

      

       
      </div>
    </div>
    <div className='mt-4 mr-3'>
        <div className='text-lg mb-3 font-bold'>Availabilities</div>
        <div className='grid grid-cols-3 gap-8 mr-4'>
<div className='grid' > <label>Day</label>
<select className="border h-10 rounded-md">
  <option value="monday">Monday</option>
  <option value="tuesday">Tuesday</option>
  <option value="wednesday">Wednesday</option>
  <option value="thursday">Thursday</option>
  <option value="friday">Friday</option>
  <option value="saturday">Saturday</option>
  <option value="sunday">Sunday</option>
</select>

</div>
<div className='grid ml-24 w-1/2'> <label>From</label>
        <input className='border h-10 rounded-md '  type='text'/>
</div><div className='grid ml-16  w-1/2'> <label>To</label>
        <input className='border h-10 rounded-md'  type='text'/>
</div> </div>
    </div>
    
    </form>

  );

};

export default Addprestataire;
