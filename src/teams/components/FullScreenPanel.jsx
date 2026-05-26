import React from "react";
import "../Styles/Dashboard.css";

export default function FullScreenPanel({ title, columns, rows, onClose }) {
  return (
    <div className="fullscreen-backdrop">
      <div className="fullscreen-panel">
        <div className="fullscreen-panel-header">
          <h2>{title}</h2>
          <button className="panel-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="fullscreen-panel-content">
          <table className="fullscreen-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
