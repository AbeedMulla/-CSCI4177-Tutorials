import { useState } from "react";
import { useNavigate } from "react-router-dom";

const onlyLetters = /^[A-Za-z]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function validate() {
    const e = {};

    if (!onlyLetters.test(form.firstName.trim())) {
      e.firstName = "First name must contain only letters.";
    }

    if (!onlyLetters.test(form.lastName.trim())) {
      e.lastName = "Last name must contain only letters.";
    }

    if (!emailRegex.test(form.email.trim())) {
      e.email = "Enter a valid email (e.g., jon_snow@westeros.com).";
    }

    if (form.password.length < 8) {
      e.password = "Password must be at least 8 characters.";
    }

    if (form.confirmPassword !== form.password) {
      e.confirmPassword = "Passwords must match.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    if (!validate()) return;

    localStorage.setItem(
      "tutorial2_profile",
      JSON.stringify({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
      })
    );

    navigate("/profile");
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Profile Registration</h2>
  
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label>First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            style={{ padding: 8 }}
          />
          {submitted && <div style={{ color: "red" }}>{errors.firstName}</div>}
        </div>
  
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label>Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            style={{ padding: 8 }}
          />
          {submitted && <div style={{ color: "red" }}>{errors.lastName}</div>}
        </div>
  
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            style={{ padding: 8 }}
          />
          {submitted && <div style={{ color: "red" }}>{errors.email}</div>}
        </div>
  
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            style={{ padding: 8 }}
          />
          {submitted && <div style={{ color: "red" }}>{errors.password}</div>}
        </div>
  
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            style={{ padding: 8 }}
          />
          {submitted && (
            <div style={{ color: "red" }}>{errors.confirmPassword}</div>
          )}
        </div>
  
        <button
          type="submit"
          style={{
            padding: 10,
            cursor: "pointer",
            marginTop: 6,
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}