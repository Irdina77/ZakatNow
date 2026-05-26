import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("zakatHistory") || "[]");
    setHistory(Array.isArray(stored) ? stored : []);
  }, []);

  const clearHistory = () => {
    if (window.confirm("Clear all saved zakat history?")) {
      localStorage.removeItem("zakatHistory");
      setHistory([]);
    }
  };

  const formatCurrency = (value) =>
    Number(value || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="payment-page-container">
      <div className="payment-page-header">
        <h1 className="payment-title">Check Zakat History</h1>
        <p className="payment-subtitle">
          Review your saved zakat calculations and payment records.
        </p>
      </div>

      <div className="payment-page-shell history-card">
        <div className="history-header">
          <h2>Payment History</h2>
          <div>
            <button
              className="zakat-button zakat-button-secondary"
              type="button"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              className="zakat-button zakat-button-primary"
              type="button"
              onClick={clearHistory}
              style={{ marginLeft: "12px" }}
            >
              Clear History
            </button>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="history-empty">No saved payment history available yet.</div>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Year</th>
                <th>State</th>
                <th>Method</th>
                <th>Gateway</th>
                <th>Transaction</th>
                <th>Total</th>
                <th>Zakat</th>
              </tr>
            </thead>
            <tbody>
              {history
                .slice()
                .reverse()
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.date || "-"}</td>
                    <td>{item.year || "-"}</td>
                    <td>{item.state || "-"}</td>
                    <td>
                      {item.businessMethod === "UntungRugi"
                        ? "Profit & Loss"
                        : "Working Capital"}
                    </td>
                    <td>{item.gateway || "-"}</td>
                    <td>{item.transactionId || "-"}</td>
                    <td>RM {formatCurrency(item.total)}</td>
                    <td>RM {formatCurrency(item.zakat)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
