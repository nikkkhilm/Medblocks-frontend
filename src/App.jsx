import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommonPage from "./pages/CommonPage";
import Navbar from "./Components/Navbar";
import Navbars from "./pages/Navbars";
import LandingPage from "./pages/LandingPgae";
import About from "./Components/About";
import Footer from "./Components/Footer";
import DoctorHome from "./pages/DoctorHome"; // Import the DoctorHome page
import PatientHome from "./pages/PatientHome"; // Import the PatientHome page
import PharmacistHome from "./pages/PharmacistHome"; // Import the PharmacistHome page
import RegulatoryHome from "./pages/RegulatoryHome"; // Import the RegulatoryHome page
import AnalyticsDashboard from "./pages/AnalyticsDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/common" element={<CommonPage />} /> */}
        <Route path="/doctor-home" element={<DoctorHome />} />{" "}
        {/* Doctor Home */}
        <Route path="/patient-home" element={<PatientHome />} />{" "}
        {/* Patient Home */}
        <Route path="/pharmacist-home" element={<PharmacistHome />} />{" "}
        {/* Pharmacist Home */}
        <Route path="/regulatory-home" element={<RegulatoryHome />} />{" "}
        {/* Regulatory Home */}
       <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />{" "}
        {/* Analytics Dashboard */}
      </Routes>

      <About />
      <Footer />
    </Router>
  );
}

export default App;
