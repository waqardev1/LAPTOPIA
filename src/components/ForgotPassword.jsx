import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css"; // reuse login styles

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null); // For confirmed users
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const emailRef = useRef();

  // Step 1: Submit email to check if user exists
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/check-email", { email });
      if (res.data && res.data.userId) {
        setUserId(res.data.userId);
        setStep(2);
      } else {
        setError("Account not found.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Account not found.");
    }
  };

  // Step 2: Set new password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!newPassword || newPassword.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      
    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
        userId,
        newPassword,
      });
      if (res.data && res.data.success) {
        setSuccess("Password updated! Redirecting to login…");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Failed to update password.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={step === 1 ? handleEmailSubmit : handlePasswordSubmit}>
        <h2>Forgot Password</h2>
        {step === 1 && (
          <>
            <label htmlFor="email">Enter your registered email:</label>
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoFocus
            />
            <button type="submit">Check Email</button>
          </>
        )}

        {step === 2 && (
          <>
            <label htmlFor="newPassword">Enter your new password:</label>
            <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="New password"
                required
                minLength={8}
            />

            <button type="submit">Update Password</button>
          </>
        )}

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
      </form>
    </div>
  );
};

export default ForgotPassword;
