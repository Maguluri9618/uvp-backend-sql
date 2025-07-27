import React from 'react';
import logo from '../assets/UVP_Logo.jpeg';

const Ds160Help = () => {
  return (
    <div className="min-h-screen bg-yellow-50 text-gray-800 p-4">
      {/* Logo + Title */}
      <div className="text-center mb-6">
        <img src={logo} alt="UVP Logo" className="mx-auto w-32 h-32 rounded-full shadow-md" />
        <h2 className="text-3xl font-bold mt-2 text-yellow-700">📋 DS-160 Form Filling Help</h2>
        <p className="text-yellow-600 mt-2">The DS-160 is the most important step in your US visa journey.</p>
      </div>

      {/* Highlighted Info */}
      <div className="max-w-3xl mx-auto bg-yellow-100 shadow-lg rounded-xl p-6 text-center">
        <p className="mb-4">
          The <strong>DS-160 form</strong> is mandatory for all non-immigrant US visa applicants.
          Ensure you fill it accurately and truthfully. Any mistakes may lead to visa rejection.
        </p>
        <a
          href="https://ceac.state.gov/genniv/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          👉 Apply for a Nonimmigrant Visa (DS-160)
        </a>
      </div>

      {/* Contact Section */}
      <div className="text-center mt-8 text-yellow-700">
        <p>❓ Facing issues? Reach out to our 24/7 support:</p>
        <p>📧 Email: <a href="mailto:pa1maguluri@uvp.it.com" className="text-blue-600 hover:underline">pa1maguluri@uvp.it.com</a></p>
        <p>📱 WhatsApp: <a href="https://wa.me/917995957701" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">7995957701</a></p>
      </div>
    </div>
  );
};

export default Ds160Help;
