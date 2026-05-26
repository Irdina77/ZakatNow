import React, { useState } from "react";
import "./BusinessSetup.css";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();

// after success
navigate("/dashboard");

function BusinessSetup() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [assets, setAssets] = useState("");
  const [liabilities, setLiabilities] = useState("");
  const [message, setMessage] = useState("");

  // ✅ SAVE BUTTON
  const handleSave = () => {
    if (!name || !type || !assets || !liabilities) {
      setMessage("⚠️ Please fill in all fields");
      return;
    }

    if (assets < 0 || liabilities < 0) {
      setMessage("❌ Values cannot be negative");
      return;
    }

    const zakat = (assets - liabilities) * 0.025;

    setMessage("✅ Saved! Estimated Zakat: RM " + zakat.toFixed(2));
  };

  // ✅ RESET BUTTON (FIXED)
  const handleReset = () => {
    setName("");
    setType("");
    setAssets("");
    setLiabilities("");
    setMessage("");
  };

  return (
    <div className="container">
      <div className="card">

        <h1 className="title">Business Setup</h1>
        <p className="subtitle">Enter your business details</p>

        {/* MESSAGE */}
        {message && (
          <p style={{
            textAlign: "center",
            color: message.includes("✅") ? "green" : "red",
            fontWeight: "500"
          }}>
            {message}
          </p>
        )}

        <form className="form">

          {/* Business Name */}
          <label>Business Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter business name"
          />

          {/* Business Type */}
          <label>Business Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select type</option>
            <option>Sole Proprietorship</option>
            <option>Partnership</option>
            <option>LLP / PLT</option>
            <option>Sdn Bhd</option>
            <option>Bhd</option>
          </select>

          {/* Assets */}
          <label>Total Assets (RM)</label>
          <input
            type="number"
            value={assets}
            onChange={(e) => setAssets(Number(e.target.value))}
            placeholder="e.g. 50000"
          />

          {/* Liabilities */}
          <label>Total Liabilities (RM)</label>
          <input
            type="number"
            value={liabilities}
            onChange={(e) => setLiabilities(Number(e.target.value))}
            placeholder="e.g. 10000"
          />

          {/* BUTTONS */}
          <button type="button" className="btn-dark" onClick={handleSave}>
            Save
          </button>

          <button type="button" className="btn-outline" onClick={handleReset}>
            Reset
          </button>

        </form>

      </div>
    </div>
  );
}

export default BusinessSetup;