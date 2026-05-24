import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    if (!username || !email || !password) {
      setMessage("⚠️ Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setMessage("❌ Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    setMessage("");

    setTimeout(() => {
      setIsLoading(false);
      setMessage("✅ Registration successful!");
      // Clear form fields
      setUsername("");
      setEmail("");
      setPassword("");
      // Redirect to login page (the user must log in with their new credentials)
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }, 800);
  };

  return (
    <div className="auth-container">

      {/* CENTER REGISTER */}
      <div className="auth-center">
        <div className="auth-card">

          <h1 className="title">ZakatNow</h1>
          <p className="subtitle">Create new account</p>

          {message && (
            <p className={`message ${message.includes("✅") ? "success" : "error"}`}>
              {message}
            </p>
          )}

          <div className="auth-form">

            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="btn-dark"
              onClick={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>

            <button
              className="btn-outline"
              type="reset"
              disabled={isLoading}
            >
              Clear Form
            </button>

          </div>

          <p className="switch-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/")}>
              Login
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Register;