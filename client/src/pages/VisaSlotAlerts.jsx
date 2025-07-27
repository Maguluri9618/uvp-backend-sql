import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/UVP_Logo.jpeg';

const VisaSlotAlerts = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    country: '',
    whatsapp: '',
    cgiEmail: '',
    firstName: '',
    lastName: '',
    visaCategory: '',
    visaType: '',
    location: ''
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/visa-slot-alerts', formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting Visa Slot Alerts:', error);
      alert('❌ Could not connect to backend.');
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 text-gray-800 p-4">
      {/* Logo */}
      <div className="text-center mb-6">
        <img src={logo} alt="UVP Logo" className="mx-auto w-32 h-32 rounded-full shadow-md" />
        <h2 className="text-3xl font-bold mt-2 text-yellow-700">Visa Slot Alerts</h2>
        <p className="text-sm text-yellow-600">Real-time updates and agent support</p>
      </div>

      {/* About Us */}
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 mb-6 text-center">
        <p>
          <strong>USA VISA PATH (UVP)</strong> helps students, professionals, and tourists get notified on US visa slot availability. 
          Our team offers live alerts, documentation help, and 24/7 guidance for your visa journey.
        </p>
      </div>

      {/* Form */}
      {!submitted ? (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-yellow-800 mb-4 text-center">
            Visa Slot Alert Request Form
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select name="country" value={formData.country} onChange={handleChange}
              className="w-full border border-yellow-300 p-2 rounded" required>
              <option value="">Select Country</option>
              <option value="India">🇮🇳 India (+91)</option>
              <option value="USA">🇺🇸 USA (+1)</option>
              <option value="UK">🇬🇧 UK (+44)</option>
              <option value="Canada">🇨🇦 Canada (+1)</option>
              <option value="Australia">🇦🇺 Australia (+61)</option>
            </select>

            <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange}
              placeholder="WhatsApp Number (with country code)"
              className="w-full border border-yellow-300 p-2 rounded" required />

            <input type="email" name="cgiEmail" value={formData.cgiEmail} onChange={handleChange}
              placeholder="CGI Mail ID"
              className="w-full border border-yellow-300 p-2 rounded" required />

            <div className="flex gap-4">
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                placeholder="First Name"
                className="w-full border border-yellow-300 p-2 rounded" required />
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                placeholder="Last Name"
                className="w-full border border-yellow-300 p-2 rounded" required />
            </div>

            <select name="visaCategory" value={formData.visaCategory} onChange={handleChange}
              className="w-full border border-yellow-300 p-2 rounded" required>
              <option value="">Visa Category</option>
              <option value="Immigrant">Immigrant</option>
              <option value="Non-Immigrant">Non-Immigrant</option>
            </select>

            <select name="visaType" value={formData.visaType} onChange={handleChange}
              className="w-full border border-yellow-300 p-2 rounded" required>
              <option value="">Visa Type</option>
              <option value="Student">🎓 Student (F1, F2, J1) – Dropbox / Regular</option>
              <option value="Work">💼 Work (H1B, H4, L1) – Dropbox / Regular</option>
              <option value="Visitor">🌍 Visitor (B1, B2, B1/B2) – Dropbox / Regular</option>
            </select>

            <input type="text" name="location" value={formData.location} onChange={handleChange}
              placeholder="Preferred Location (e.g., Hyderabad, Delhi)"
              className="w-full border border-yellow-300 p-2 rounded" required />

            <button type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center mt-10 bg-green-100 border border-green-400 p-6 rounded-xl max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-green-800">✅ Submitted successfully!</h3>
          <p className="text-green-700 mt-2">Our agent will contact you soon.</p>
          <p className="mt-4 text-gray-700">For urgent queries, contact us:</p>
          <p className="text-blue-600">📧 pa1maguluri@uvp.it.com</p>
          <p className="text-green-600">
            📱 WhatsApp: <a href="https://wa.me/917995957701" target="_blank" rel="noopener noreferrer">7995957701</a>
          </p>
          <p className="text-pink-600">
            📸 Instagram: <a href="https://instagram.com/UVP_USA_VISA_SLOTS_BOOKING"
              target="_blank" rel="noopener noreferrer">@UVP_USA_VISA_SLOTS_BOOKING</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default VisaSlotAlerts;
