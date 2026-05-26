import React from "react";

export default function NisabCard({ data, history }) {
  return (
    <div className="nisab-card">
      <div className="nisab-card-header">
        <h2>Current Nisab</h2>
      </div>
      <div className="nisab-card-body">
        <p>
          <strong>Gold Price:</strong> RM {Number(data?.goldPrice || 0).toFixed(2)} / g
        </p>
        <p>
          <strong>Nisab Value:</strong> RM {Number(data?.nisabValue || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p>
          <strong>Year:</strong> {data?.year || "2026"}
        </p>
        <p>
          <strong>History Entries:</strong> {history?.length ?? 0}
        </p>
      </div>
    </div>
  );
}
