import React from "react";
import "./LegalPages.css";
import logo from "../assets/logo.png";

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">

      <div className="legal-header">
        <img src={logo} alt="SickleCare Logo" className="legal-logo" />

        <h1>SickleCare Privacy Policy</h1>
        <p>Last Updated: May 2026</p>
      </div>

      <div className="legal-container">

        <div className="legal-card">
          <h2>1. Introduction</h2>
          <p>
            SickleCare respects your privacy and protects your health data.
            This policy explains how we collect and use your information.
          </p>
        </div>

        <div className="legal-card">
          <h2>2. Information We Collect</h2>
          <ul>
            <li>Name & Email</li>
            <li>Health details (if provided)</li>
            <li>Usage data</li>
            <li>Device information</li>
          </ul>
        </div>

        <div className="legal-card">
          <h2>3. How We Use Data</h2>
          <ul>
            <li>Improve app experience</li>
            <li>Provide reminders</li>
            <li>Support health tracking</li>
          </ul>
        </div>

        <div className="legal-card">
          <h2>4. Data Security</h2>
          <p>
            We use secure cloud services (Firebase) to protect your data.
          </p>
        </div>

        <div className="legal-card">
          <h2>5. Contact</h2>
          <p>Email: support@sicklecare.com</p>
        </div>

      </div>
    </div>
  );
}