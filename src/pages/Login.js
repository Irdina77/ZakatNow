import React, { useState } from "react";
import "../Styles/Login.css";

function Login({ onLoginSuccess, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("⚠️ Please fill in all fields");
      return;
    }

    if (password !== "123456") {
      setMessage("❌ Invalid credentials");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const isAdmin = normalizedEmail === "admin@gmail.com";
    const isValidUser = normalizedEmail.includes("@") && normalizedEmail.includes(".");

    if (!isAdmin && !isValidUser) {
      setMessage("❌ Invalid email address");
      return;
    }

    setIsLoading(true);
    setMessage("");

setTimeout(() => {
  setIsLoading(false);

  const role = isAdmin ? "admin" : "user";

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", normalizedEmail);
  localStorage.setItem("userRole", role);

  setMessage("✅ Login successful!");

  onLoginSuccess(role);

}, 700);
    }, 1000);
  };

  return (
    <div className="glass-page-container">
      <div className="glass-card">
        <h1 className="title">ZakatNow</h1>
        <p className="subtitle">Welcome back! Please sign in</p>

        {message && (
          <div className={`message ${message.includes("✅") ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <form className="glass-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="floating-group">
            <input id="email" type="email" placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="email">Email Address</label>
          </div>

          <div className="floating-group">
            <input id="password" type="password" placeholder=" " value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className="btn-glass-gold" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="auth-link">
          Don't have an account? <span onClick={onGoToRegister}>Register here</span>
        </div>
      </div>
    </div>
  );
}

export default Login;