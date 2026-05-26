import React from "react";
import "../Styles/UpdateNisabRate.css";

export default function ConfirmModel({ previewData, onConfirm, onCancel, onDraft }) {
  return (
    <div className="confirm-modal-backdrop">
      <div className="confirm-modal">
        <h2>Preview Update</h2>
        <div className="confirm-preview">
          <p>
            <strong>Gold Price:</strong> RM {Number(previewData.goldPrice).toFixed(2)}
          </p>
          <p>
            <strong>Nisab Value:</strong> RM {Number(previewData.nisabValue).toFixed(2)}
          </p>
        </div>
        <div className="confirm-modal-buttons">
          <button className="btn btn-dark" onClick={onConfirm}>
            Confirm
          </button>
          <button className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-secondary" onClick={onDraft}>
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
}
