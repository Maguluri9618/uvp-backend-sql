import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import VisaBooking from "./pages/VisaBooking";
import VisaSlotAlerts from "./pages/VisaSlotAlerts";
import Ds160Help from "./pages/Ds160Help";
import DocumentUpload from "./pages/DocumentUpload";
import CGICreation from './pages/CGICreation';
import RescheduleCancel from './pages/RescheduleCancel';
import MockInterview from './pages/MockInterview';
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visa-booking" element={<VisaBooking />} />
        <Route path="/visa-alerts" element={<VisaSlotAlerts />} />
        <Route path="/ds160-help" element={<Ds160Help />} />
        <Route path="/document-upload" element={<DocumentUpload />} />
        <Route path="/cgi-profile" element={<CGICreation />} />
        <Route path="/reschedule" element={<RescheduleCancel />} />
        <Route path="/mock-interview" element={<MockInterview />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
   </Router>
  </React.StrictMode>
);
