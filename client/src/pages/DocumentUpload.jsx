import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/UVP_Logo.jpeg';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('⚠️ Please select a file before submitting.');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('document', file);

      const res = await axios.post('http://localhost:5000/api/document-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.status === 200) {
        alert('✅ Document uploaded successfully!');
        setFile(null);
      } else {
        alert('⚠️ Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Document Upload Error:', error);
      alert('❌ Unable to upload. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 text-gray-800 p-4">
      {/* Logo + Title */}
      <div className="text-center mb-6">
        <img src={logo} alt="UVP Logo" className="mx-auto w-32 h-32 rounded-full shadow-md" />
        <h2 className="text-3xl font-bold mt-2 text-yellow-700">📄 Document Checklist Upload</h2>
        <p className="text-yellow-600 mt-2">Upload your required documents securely.</p>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="max-w-xl mx-auto bg-yellow-100 shadow-md rounded-xl p-6 text-center">
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>

      {/* Note */}
      <p className="text-sm text-center mt-4 text-gray-600">
        Please upload PDF, JPG, or PNG formats only. Max size: 5MB.
      </p>
    </div>
  );
};

export default DocumentUpload;
