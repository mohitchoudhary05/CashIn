import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const api = import.meta.env.VITE_URL_API;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) =>
    /^[0-9]{10,15}$/.test(phone); // Accepts 10–15 digit phone numbers

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword } = form;

    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (!validatePhone(phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${api}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const res = await response.json();

      if (response.ok && (response.status === 200 || response.status === 201)) {
        toast.success(res.message || "Signup successful!");
        setTimeout(() => navigate("/login"), 2500);
      } else {
        toast.error(res.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="signup-input"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="signup-input"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="signup-input"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="signup-input"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="signup-input"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <button className="signup-button" type="submit">
          Sign Up
        </button>
        <p className="signup-footer">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
