import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/UVP_Logo.jpeg';

const CGICreation = () => {
  const [gmail, setGmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please attach a passport copy!");
      return;
    }

    const formData = new FormData();
    formData.append('Gmail', gmail);         // match backend key
    formData.append('PhoneNumber', phoneNumber); // match backend key
    formData.append('passport', file);       // match backend key

    setSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/profile-creation', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("✅ Details submitted successfully!");
      setGmail('');
      setPhoneNumber('');
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("❌ Unable to submit details. Please check the backend connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 text-gray-800 font-sans p-4">
      <div className="text-center mb-6">
        <img src={logo} alt="UVP Logo" className="mx-auto w-32 h-32 rounded-full shadow-md" />
        <h2 className="text-2xl font-bold mt-2 text-yellow-700">Profile Creation on CGI Federal</h2>
      </div>

      <div className="max-w-3xl mx-auto bg-yellow-100 shadow-md rounded-xl p-6 mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Gmail Address"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Details'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CGICreation;
