import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./LegalHeader.css";

export default function LegalHeader({ title, updated }) {
  return (
    <div className="legal-header">
      <Link to="/" className="legal-logo-wrap">
        <img src={logo} alt="SickleCare Logo" className="legal-logo" />
      </Link>

      <h1>{title}</h1>

      {updated && <p className="legal-updated">Last Updated: {updated}</p>}
    </div>
  );
}