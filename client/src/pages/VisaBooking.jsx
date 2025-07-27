import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/UVP_Logo.jpeg';

const VisaBooking = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    visaType: '',
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/visa-booking', formData);

      if (res.status === 200) {
        alert('✅ Successfully submitted. Our agent will get in touch with you in a few minutes.');
        setFormData({ fullName: '', email: '', mobile: '', visaType: '' }); // Reset form
      } else {
        alert('⚠️ Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('❌ Could not connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 text-gray-800 font-sans p-4">
      {/* Logo & Title */}
      <div className="text-center mb-6">
        <img
          src={logo}
          alt="UVP Logo"
          className="mx-auto w-32 h-32 rounded-full shadow-md"
        />
        <h2 className="text-3xl font-bold mt-2 text-yellow-700">USA VISA PATH</h2>
        <p className="text-sm text-yellow-600">US Visa Slot Booking Assistance</p>
      </div>

      {/* Form */}
      <div className="max-w-xl mx-auto bg-yellow-100 shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800 text-center">Visa Booking Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-yellow-300 p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-yellow-300 p-2 rounded"
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="WhatsApp Number (e.g., +91XXXXXXXXXX)"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border border-yellow-300 p-2 rounded"
            required
          />
          <select
            name="visaType"
            value={formData.visaType}
            onChange={handleChange}
            className="w-full border border-yellow-300 p-2 rounded"
            required
          >
            <option value="">Select Visa Type</option>
            <option value="F1">🎓 F1 - Student Visa</option>
            <option value="B1/B2">🌍 B1/B2 - Visitor Visa</option>
            <option value="H1B">💼 H1B - Work Visa</option>
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>

      {/* About Section / Footer */}
      <footer className="mt-16 text-center text-sm text-yellow-700 max-w-2xl mx-auto px-4 border-t pt-4">
        <p>
          At <strong>USA VISA PATH</strong>, we provide reliable US visa slot assistance for Students, Tourists, and Professionals. Get 24/7 support, form guidance, and expert help — trusted by thousands across the globe.
        </p>
        <p className="mt-2">
          📧 <a href="mailto:pa1maguluri@uvp.it.com" className="text-blue-600 hover:underline">pa1maguluri@uvp.it.com</a> | 📱 <a href="https://wa.me/917995957701" className="text-green-600 hover:underline">+91 7995957701</a>
        </p>
      </footer>
    </div>
  );
};

export default VisaBooking;
