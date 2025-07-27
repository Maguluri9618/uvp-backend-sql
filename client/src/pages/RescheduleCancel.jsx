import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/UVP_Logo.jpeg';

const RescheduleCancel = () => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    issue: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.whatsapp || !formData.issue) {
      alert('⚠️ Please fill all fields.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/reschedule-cancel', formData);

      if (res.status === 200) {
        alert('✅ Issue submitted successfully! Our agent will contact you shortly.');
        setFormData({ name: '', whatsapp: '', issue: '' });
      } else {
        alert('⚠️ Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting issue:', error);
      alert('❌ Could not connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 text-gray-800 font-sans p-4">
      {/* Logo */}
      <div className="text-center mb-6">
        <img src={logo} alt="UVP Logo" className="mx-auto w-32 h-32 rounded-full shadow-md" />
        <h2 className="text-2xl font-bold mt-2 text-yellow-700">Rescheduling or Canceling Slots</h2>
      </div>

      {/* Info */}
      <div className="max-w-3xl mx-auto bg-yellow-100 shadow-md rounded-xl p-6 mb-6">
        <p className="mb-4">
          We assist in rescheduling or canceling your visa appointment slots if you're facing issues
          on the CGI Federal portal. Please share the details below.
        </p>
        <p className="mb-4 text-yellow-800 font-semibold">Common issues:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Unable to log in to CGI Federal account</li>
          <li>Errors while rescheduling appointments</li>
          <li>Slot not appearing after payment</li>
        </ul>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="tel"
            name="whatsapp"
            placeholder="WhatsApp Number"
            value={formData.whatsapp}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            name="issue"
            placeholder="Describe your issue"
            value={formData.issue}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Issue'}
          </button>
        </form>
        <p className="mt-4 text-red-700">
          Our agent will contact you within a few hours. For urgent issues, kindly include your
          contact details.
        </p>
      </div>

      {/* About Us */}
      <footer className="text-center text-sm text-yellow-800 mt-10">
        <div className="border-t pt-4 max-w-3xl mx-auto">
          <p>
            <strong>USA VISA PATH (UVP)</strong> provides 24/7 assistance with visa slot booking and
            rescheduling services.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RescheduleCancel;
