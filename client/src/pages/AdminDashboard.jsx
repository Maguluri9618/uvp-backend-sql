import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [visaBookings, setVisaBookings] = useState([]);
  const [visaSlotAlerts, setVisaSlotAlerts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch data for Visa Bookings
    axios.get("http://localhost:5000/api/visa-booking")
      .then((res) => setVisaBookings(res.data))
      .catch((err) => console.error(err));

    // Fetch data for Visa Slot Alerts
    axios.get("http://localhost:5000/api/visa-slot-alerts")
      .then((res) => setVisaSlotAlerts(res.data))
      .catch((err) => console.error(err));

    // Fetch Feedback
    axios.get("http://localhost:5000/api/feedback")
      .then((res) => setFeedbacks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <h1 className="text-3xl font-bold text-yellow-800 text-center mb-6">Admin Dashboard</h1>

      {/* Visa Booking Table */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Visa Booking Submissions</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-yellow-100">
              <th className="border px-4 py-2">Full Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Mobile</th>
              <th className="border px-4 py-2">Visa Type</th>
            </tr>
          </thead>
          <tbody>
            {visaBookings.map((booking, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{booking.FullName}</td>
                <td className="border px-4 py-2">{booking.Email}</td>
                <td className="border px-4 py-2">{booking.Mobile}</td>
                <td className="border px-4 py-2">{booking.VisaType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visa Slot Alerts Table */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Visa Slot Alerts</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-yellow-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">WhatsApp</th>
              <th className="border px-4 py-2">Visa Category</th>
            </tr>
          </thead>
          <tbody>
            {visaSlotAlerts.map((alert, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{alert.FirstName} {alert.LastName}</td>
                <td className="border px-4 py-2">{alert.WhatsApp}</td>
                <td className="border px-4 py-2">{alert.VisaCategory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Table */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">User Feedback</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-yellow-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{fb.Name}</td>
                <td className="border px-4 py-2">{fb.Message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
