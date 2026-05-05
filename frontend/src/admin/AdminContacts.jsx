import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setContacts(data);
  };

  return (
    <div>
      <h2>Contact Messages</h2>

      {contacts.map(c => (
        <div key={c.id} style={{
          padding: 15,
          border: "1px solid #ddd",
          marginBottom: 10,
          borderRadius: 8
        }}>
          <p><b>Name:</b> {c.name}</p>
          <p><b>Email:</b> {c.email}</p>
          <p><b>Topic:</b> {c.topic}</p>
          <p><b>Message:</b> {c.message}</p>
        </div>
      ))}
    </div>
  );
}