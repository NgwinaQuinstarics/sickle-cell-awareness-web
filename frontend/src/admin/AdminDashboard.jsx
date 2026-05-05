import React from "react";
import AdminContacts from "./AdminContacts";

export default function AdminDashboard() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "250px", background: "#111", color: "#fff", minHeight: "100vh", padding: 20 }}>
        <h2>Admin Panel</h2>
        <p>Dashboard</p>
        <p>Contacts</p>
      </div>

      <div style={{ flex: 1, padding: 20 }}>
        <h1>System Overview</h1>
        <AdminContacts />
      </div>
    </div>
  );
}