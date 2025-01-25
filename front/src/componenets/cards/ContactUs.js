import React, { useState } from 'react';
import img from './Polygon 3.png';
import img2 from './Rectangle.png';
 import img3 from './Polygon 2.png'; 
import img4 from './Vector.png'
const ContactUs = () => {
  // Form state
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    objet: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = 'Nom est requis.';
    if (!formData.prenom.trim()) newErrors.prenom = 'Prénom est requis.';
    if (!formData.telephone.trim() || !/^\d+$/.test(formData.telephone))
      newErrors.telephone = 'Un numéro de téléphone valide est requis.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Un email valide est requis.';
    if (!formData.objet.trim()) newErrors.objet = 'Objet est requis.';
    if (!formData.message.trim()) newErrors.message = 'Message est requis.';

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      alert('Formulaire soumis avec succès!');
      setFormData({})
      // You can handle the form submission logic here (e.g., send to API)
    }
  };

  return (
    <div className=" pt-10 pr-16 pl-16 pb-16 relative">
      <div className="m-4">
        <div>
          <div className="text-6xl">Contact Us</div>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <div className="text-4xl">Ou nous trouver ?</div>
            <div className="text-xl flex gap-3">
                <img src={img4} className='h-5'/>
                9th street, Howard st, Paris, France</div>
            <img src={img2} alt="Location" />
          </div>
          <div className="w-1/2 ml-16">
            <div className="text-4xl">Se faire Rappeler</div>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-7 w-full">
                <div className="w-1/2">
                  <input
                    className="mt-4 w-full h-12 text-2xl p-4 border"
                    type="text"
                    name="nom"
                    placeholder="Nom*"
                    value={formData.nom}
                    onChange={handleChange}
                  />
                  {errors.nom && <span className="text-red-500 text-xl">{errors.nom}</span>}
                </div>
                <div className="w-1/2">
                  <input
                    className="mt-4 w-full h-12 text-2xl p-4 border"
                    type="text"
                    name="prenom"
                    placeholder="Prénom*"
                    value={formData.prenom}
                    onChange={handleChange}
                  />
                  {errors.prenom && <span className="text-red-500 text-xl">{errors.prenom}</span>}
                </div>
              </div>
              <input
                className="mt-4 w-full h-12 text-2xl p-4 border"
                type="text"
                name="telephone"
                placeholder="Téléphone*"
                value={formData.telephone}
                onChange={handleChange}
              />
              {errors.telephone && <span className="text-red-500 text-xl">{errors.telephone}</span>}
              <br />
              <input
                className="mt-4 w-full h-12 text-2xl p-4 border"
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="text-red-500 text-xl">{errors.email}</span>}
              <br />
              <input
                className="mt-4 w-full h-12 text-2xl p-4 border"
                type="text"
                name="objet"
                placeholder="Objet*"
                value={formData.objet}
                onChange={handleChange}
              />
              {errors.objet && <span className="text-red-500 text-xl">{errors.objet}</span>}
              <br />
              <textarea
                className="mt-4 w-full h-30 text-2xl p-5 border"
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && <span className="text-red-500 text-xl">{errors.message}</span>}
              <br />
              <button
                className=" text-white p-2 w-full text-2xl"
                style={{ background: '#323232' }}
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <img className="absolute top-0 right-0 " src={img3}alt="Decoration" />
      <img className="absolute top-0 left-0" src={img} alt="Decoration" />
    </div>
  );
};

export default ContactUs;
