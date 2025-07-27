import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/UVP_Logo.jpeg';
import bgImage from '../assets/USAVISAPATH_Welcome_Banner.jpeg';
import { Link } from "react-router-dom";

const HomePage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    visaType: '',
  });

  const [feedbackLoading, setFeedbackLoading] = useState(false);

  // 📰 Articles state
  const [articles, setArticles] = useState([]);

  // Fetch articles from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/articles')
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => {
        console.error('Error fetching articles:', err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Form submitted!');
  };

  const handleFeedback = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const message = e.target.message.value;

    try {
      setFeedbackLoading(true);
      const res = await axios.post('http://localhost:5000/api/feedback', {
        Name: name,
        Message: message
      });

      if (res.status === 200) {
        alert('✅ Thank you for your feedback!');
        e.target.reset();
      } else {
        alert('⚠️ Something went wrong. Try again.');
      }
    } catch (err) {
      console.error('Feedback Error:', err);
      alert('❌ Unable to submit feedback. Check backend connection.');
    } finally {
      setFeedbackLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 text-gray-800 font-sans p-4">

      {/* 🔹 Scrolling Top 2 Articles Bar */}
      {articles.length > 0 && (
        <div className="bg-yellow-100 py-2 mb-2 overflow-hidden relative rounded-md">
          <div className="flex animate-marquee space-x-12 px-4">
            {articles.slice(0, 2).map((article) => (
              <div key={article.Id} className="flex-shrink-0 text-yellow-800 font-semibold text-sm">
                <span className="mr-2">📰</span>
                {article.Title}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Logo & Brand Name */}
      <div className="text-center mb-6">
        <img
          src={logo}
          alt="UVP Logo"
          className="mx-auto w-32 h-32 rounded-full shadow-md"
        />
        <h2 className="text-3xl font-bold mt-2 text-yellow-700">USA VISA PATH</h2>
        <p className="text-sm text-yellow-600">Your Trusted USA Visa Slot Partner</p>
      </div>

      {/* Welcome Banner */}
      <div className="max-w-5xl mx-auto mb-6">
        <img
          src={bgImage}
          alt="Welcome to UVP"
          className="rounded-xl shadow-lg w-full"
        />
      </div>

      {/* 📰 Full Articles Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-yellow-800">
          Latest Articles & Updates
        </h2>
        {articles.length > 0 ? (
          <ul className="space-y-4">
            {articles.map((article) => (
              <li key={article.Id} className="border-b pb-3">
                <h3 className="text-lg font-bold text-yellow-700">{article.Title}</h3>
                <p className="text-gray-500 text-xs mt-1">
                  {new Date(article.CreatedAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No articles available</p>
        )}
      </div>

      {/* Services */}
      <div className="max-w-4xl mx-auto bg-yellow-100 shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-yellow-800">Our Services</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg text-yellow-900">
          <li>
            <Link to="/visa-booking" className="hover:underline text-blue-700 font-medium">
              🛂 US Visa Slot Booking Assistance
            </Link>
          </li>
          <li>
            <Link to="/visa-alerts" className="hover:underline text-blue-700 font-medium">
              🔔 Visa Slot Alerts
            </Link>
          </li>
          <li>
            <Link to="/ds160-help" className="hover:underline text-blue-700 font-medium">
              📋 DS-160 Form Filling Help
            </Link>
          </li>
          <li>
            <Link to="/document-upload" className="hover:underline text-blue-700 font-medium">
              📄 Document Checklist Upload
            </Link>
          </li>
          <li>
            <Link to="/cgi-profile" className="hover:underline text-blue-700 font-medium">
              👤 Profile Creation on CGI Federal
            </Link>
          </li>
          <li>
            <Link to="/reschedule" className="hover:underline text-blue-700 font-medium">
              🔄 Rescheduling or Canceling Slots
            </Link>
          </li>
          <li>
            <Link to="/mock-interview" className="hover:underline text-blue-700 font-medium">
              🎤 Mock Interview Preparation (Optional)
            </Link>
          </li>
          <li>💬 24/7 Chat & Email Support</li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="text-center mb-8 space-y-2 text-yellow-700">
        <p>📧 Email: <a href="mailto:pa1maguluri@uvp.it.com" className="text-blue-600 hover:underline">pa1maguluri@uvp.it.com</a></p>
        <p>📱 WhatsApp: <a href="https://wa.me/917995957701" className="text-green-600 hover:underline">7995957701</a></p>
        <p>📸 Instagram: <a
          href="https://instagram.com/UVP_USA_VISA_SLOTS_BOOKING"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 hover:underline"
        >@UVP_USA_VISA_SLOTS_BOOKING</a></p>
      </div>

      {/* Feedback */}
      <div className="max-w-xl mx-auto bg-yellow-100 shadow-md rounded-xl p-6 mt-10">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800">Feedback</h2>
        <form onSubmit={handleFeedback} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full border border-yellow-300 p-2 rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Your Feedback"
            className="w-full border border-yellow-300 p-2 rounded"
            rows="4"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={feedbackLoading}
          >
            {feedbackLoading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-yellow-100 mt-16 text-yellow-800">
        <div className="max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">About USA VISA PATH</h3>
            <p className="text-sm">
              USA VISA PATH (UVP) helps individuals with smooth US visa slot booking. From DS-160 form assistance to appointment rescheduling and 24/7 support, UVP is your reliable visa processing partner.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-600">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600">Contact</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4 text-2xl">
              <a href="mailto:pa1maguluri@uvp.it.com" className="hover:text-red-600">📧</a>
              <a href="https://wa.me/917995957701" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">📱</a>
              <a href="https://instagram.com/UVP_USA_VISA_SLOTS_BOOKING" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">📸</a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-yellow-700 py-4 border-t">
          &copy; {new Date().getFullYear()} USA VISA PATH. All rights reserved.
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/917995957701"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50"
      >
        <img
          src="https://img.icons8.com/color/48/000000/whatsapp--v1.png"
          alt="Chat on WhatsApp"
          className="w-12 h-12 hover:scale-110 transition-transform duration-300"
        />
      </a>

      {/* Instagram Floating Button */}
      <a
        href="https://instagram.com/UVP_USA_VISA_SLOTS_BOOKING"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 left-4 z-50"
      >
        <img
          src="https://img.icons8.com/color/48/000000/instagram-new.png"
          alt="Follow on Instagram"
          className="w-12 h-12 hover:scale-110 transition-transform duration-300"
        />
      </a>
    </div>
  );
};

export default HomePage;
