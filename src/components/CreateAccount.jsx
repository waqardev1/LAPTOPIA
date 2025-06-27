// src/components/Auth/CreateAccount.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import styles from "./CreateAccount.module.css";

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/;

const CreateAccount = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  // Inline validation on change
  const validate = (key, value) => {
    switch (key) {
      case "name":
        return value.trim() ? "" : "Name is required.";
      case "email":
        return /^\S+@\S+\.\S+$/.test(value)
          ? ""
          : "Please enter a valid email address.";
      case "password":
        if (!value) return "Password is required.";
        if (!PASSWORD_REGEX.test(value))
          return "Min 8 characters, at least one letter & one number.";
        return "";
      case "confirmPassword":
        return value === form.password
          ? ""
          : "Passwords do not match.";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Validate field immediately
    setErrors((prev) => ({
      ...prev,
      [name]: validate(name, value),
    }));
  };

  // Validate whole form before submit
  const isFormValid = () => {
    const newErrors = {};
    Object.entries(form).forEach(([k, v]) => {
      const err = validate(k, v);
      if (err) newErrors[k] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (!isFormValid()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login", { replace: true }), 1500);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        general: err.message.includes("already")
          ? "Email already registered."
          : err.message,
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createAccountContainer} aria-label="Registration Form">
      <form
        className={styles.createAccountForm}
        onSubmit={handleSubmit}
        autoComplete="off"
        aria-describedby="form-errors"
      >
        <div className={styles.logoRow}>
          <img
            src="/favicon.ico"
            alt="Laptopia Logo"
            className={styles.logoImg}
          />
          <h1 className={styles.brandTitle}>LAPTOPIA</h1>
        </div>
        <h2 className={styles.createTitle}>Create Your Account</h2>

        <div className={styles.formGroup}>
          <label htmlFor="name">
            <FaUserAlt className={styles.inputIcon} /> Name
          </label>
          <input
            ref={nameRef}
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            autoComplete="name"
            tabIndex={0}
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "error-name" : undefined}
            disabled={loading}
          />
          {errors.name && (
            <span id="error-name" className={styles.error}>{errors.name}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">
            <FaEnvelope className={styles.inputIcon} /> Email
          </label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            tabIndex={0}
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "error-email" : undefined}
            disabled={loading}
          />
          {errors.email && (
            <span id="error-email" className={styles.error}>{errors.email}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">
            <FaLock className={styles.inputIcon} /> Password
          </label>
          <div className={styles.passwordInput}>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Min 8 characters, 1 letter, 1 number"
              autoComplete="new-password"
              tabIndex={0}
              required
              aria-required="true"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "error-password" : undefined}
              disabled={loading}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={loading}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <span id="error-password" className={styles.error}>{errors.password}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">
            <FaLock className={styles.inputIcon} /> Confirm Password
          </label>
          <div className={styles.passwordInput}>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              tabIndex={0}
              required
              aria-required="true"
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={
                errors.confirmPassword ? "error-confirm" : undefined
              }
              disabled={loading}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              disabled={loading}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span id="error-confirm" className={styles.error}>
              {errors.confirmPassword}
            </span>
          )}
        </div>

        {errors.general && (
          <div className={styles.error} id="form-errors" role="alert">
            {errors.general}
          </div>
        )}
        {success && (
          <div className={styles.success} role="status">
            {success}
          </div>
        )}
        <button
          type="submit"
          className={styles.createButton}
          disabled={loading || !form.name || !form.email || !form.password || !form.confirmPassword || Object.values(errors).some(Boolean)}
          aria-disabled={loading || Object.values(errors).some(Boolean)}
        >
          {loading ? <FaSpinner className={styles.spinner} /> : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
