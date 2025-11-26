import React, { useState, useEffect } from "react";
import api from "../api/axios";
import "./popup.css";

export default function VisitorPopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    study: "",
    city: "",
    message: "",
  });

  // Read cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  useEffect(() => {
    const seen = getCookie("popup_seen");

    if (!seen) {
      // Show popup after 2 minutes = 120000ms
      const timer = setTimeout(() => {
        setOpen(true);
      }, 120000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await api.post("/visitor/register", form);

      // 30 days cookie
      document.cookie =
        "popup_seen=true; max-age=" +
        60 * 60 * 24 * 30 +
        "; path=/; SameSite=Lax";

      alert("Thank you! Your details were submitted.");
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error sending details.");
    }
  };

  // Close icon handler
  const closePopup = () => {
    // still set cookie so popup doesn't show again
    document.cookie =
      "popup_seen=true; max-age=" +
      60 * 60 * 24 * 30 +
      "; path=/; SameSite=Lax";

    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">

        {/* Close Button */}
        <button className="popup-close-btn" onClick={closePopup}>
          ✕
        </button>

        <h2 className="popup-title">Register to continue</h2>
        <p className="popup-subtitle">
          Please fill your details to explore CodingSikho.
        </p>

        <form onSubmit={submitForm} className="popup-form">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email Address"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
          />
          <input
            name="study"
            placeholder="Your Study (e.g., BCA, 12th)"
            value={form.study}
            onChange={handleChange}
            required
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message (optional)"
            value={form.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="popup-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
