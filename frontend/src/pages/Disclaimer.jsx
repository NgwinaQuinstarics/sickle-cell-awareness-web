import React from "react";
import "./LegalPages.css";
import logo from "../assets/logo.png";

export default function Disclaimer() {
  return (
    <div className="legal-page">

      {/* HEADER */}
      <div className="legal-header">
        <img src={logo} alt="SickleCare Logo" className="legal-logo" />

        <h1>SickleCare Medical Disclaimer</h1>
        <p>Last Updated: May 2026</p>
      </div>

      {/* CONTENT */}
      <div className="legal-container">

        <div className="legal-card">
          <h2>1. General Information</h2>
          <p>
            The information provided by SickleCare is for educational,
            informational, and awareness purposes only. It is not intended
            to replace professional medical advice, diagnosis, or treatment.
          </p>
        </div>

        <div className="legal-card">
          <h2>2. No Medical Advice</h2>
          <p>
            SickleCare does not provide medical advice, prescriptions,
            or emergency healthcare services. Always seek the advice of a
            qualified healthcare provider with any questions regarding a
            medical condition.
          </p>
        </div>

        <div className="legal-card">
          <h2>3. Emergency Situations</h2>
          <p>
            If you are experiencing a medical emergency, immediately call
            emergency services or go to the nearest hospital. Do not rely
            on this platform for urgent medical care.
          </p>
        </div>

        <div className="legal-card">
          <h2>4. Accuracy of Information</h2>
          <p>
            While we strive to keep information accurate and updated,
            SickleCare makes no guarantees regarding completeness,
            reliability, or accuracy of any content.
          </p>
        </div>

        <div className="legal-card">
          <h2>5. External Sources</h2>
          <p>
            SickleCare may include links or references to third-party
            medical resources. We are not responsible for the content
            or accuracy of external websites.
          </p>
        </div>

        <div className="legal-card">
          <h2>6. Use at Your Own Risk</h2>
          <p>
            Any reliance you place on information from SickleCare is strictly
            at your own risk. We are not liable for any loss, harm, or
            consequences resulting from the use of this platform.
          </p>
        </div>

        <div className="legal-card">
          <h2>7. Contact</h2>
          <p>
            If you have questions about this disclaimer, contact:
          </p>
          <p><strong>Email:</strong> support@sicklecare.com</p>
        </div>

      </div>

    </div>
  );
}