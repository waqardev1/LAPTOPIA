// src/components/LoginPage.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import styles from "./LoginPage.module.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [mfaEnabled, setMfaEnabled] = useState(false);

  // Where to redirect after login
  const redirectTo = location.state?.redirectTo || "/recommended-laptops";

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      // Real login to backend
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Expects: { token, user: {_id, name, email} }
      if (res.data && res.data.token && res.data.user) {
        login({
          ...res.data.user,
          token: res.data.token,
        });
        navigate(redirectTo, { replace: true });
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      setAttempts((prev) => prev + 1);
      const msg = err.response?.data?.message;
      if (msg === "Account not found.") {
        setError("Account not found. Redirecting to Create Account…");
        setTimeout(() => navigate("/create-account"), 2000);
      } else if (msg === "Invalid password.") {
        setError("Incorrect password. Please try again.");
      } else {
        setError(msg || "Login failed.");
      }
    }
    
     finally {
      setLoading(false);
    }
  };

  const handleMfaToggle = () => setMfaEnabled((prev) => !prev);

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleLogin} autoComplete="off">
        <div className={styles.logoRow}>
          <img
            src="/favicon.ico"
            alt="Laptopia Logo"
            className={styles.logoImg}
          />
          <h1 className={styles.brandTitle}>LAPTOPIA</h1>
        </div>

        <h2 className={styles.loginTitle}>Welcome Back!</h2>
        <p className={styles.subText}>Sign in to continue and save your recommendations.</p>
        <div className={styles.formGroup}>
          <label htmlFor="email">
            <FaUserAlt className={styles.inputIcon} /> Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}
            required
            aria-label="Email address"
            autoComplete="username"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">
            <FaLock className={styles.inputIcon} /> Password
          </label>
          <div className={styles.passwordInput}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your secure password"
              disabled={loading}
              required
              aria-label="Password"
              autoComplete="current-password"
            />
            <button
              type="button"
              className={styles.togglePassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={0}
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={loading}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className={styles.rowOptions}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" name="rememberMe" disabled={loading} />
            Remember Me
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={mfaEnabled} onChange={handleMfaToggle} disabled={loading} />
            Enable MFA
          </label>
        </div>
        <div className={styles.forgotRow}>
          <Link to="/forgot-password" className={styles.forgotPasswordLink}>Forgot Password?</Link>
        </div>
        {error && <div className={styles.error} role="alert">{error}</div>}
        <button type="submit" className={styles.loginButton} disabled={loading}>
          {loading ? <FaSpinner className={styles.spinner} /> : "Login"}
        </button>
        <div className={styles.createRow}>
          <span>Don&apos;t have an account?</span>
          <Link to="/create-account" className={styles.createAccountLink}>Create an Account</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
