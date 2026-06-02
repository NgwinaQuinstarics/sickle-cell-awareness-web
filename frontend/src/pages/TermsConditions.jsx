import React from "react";
import "./LegalPages.css";
import logo from "../assets/logo.png";

export default function TermsConditions() {
  return (
    <div className="legal-page">

      <div className="legal-header">
        <img src={logo} alt="SickleCare Logo" className="legal-logo" />

        <h1>SickleCare Terms & Conditions</h1>
        <p>Last Updated: May 2026</p>
      </div>

      <div className="legal-container">

        <div className="legal-card">
          <h2>1. Use of Platform</h2>
          <p>
            This platform is for educational and health support purposes only.
          </p>
        </div>

        <div className="legal-card">
          <h2>2. Medical Disclaimer</h2>
          <p>
            We do not provide medical diagnosis or emergency care.
          </p>
        </div>

        <div className="legal-card">
          <h2>3. User Responsibility</h2>
          <p>
            Users must provide accurate information and use the app responsibly.
          </p>
        </div>

        <div className="legal-card">
          <h2>4. Limitation of Liability</h2>
          <p>
            We are not responsible for medical decisions made using this app.
          </p>
        </div>

      </div>
    </div>
  );
}