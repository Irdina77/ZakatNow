import React, { useState } from "react";

export default function UpdateForm({ onPreview }) {
  const [goldPrice, setGoldPrice] = useState(0);
  const [nisabValue, setNisabValue] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    onPreview({ goldPrice: Number(goldPrice), nisabValue: Number(nisabValue) });
  };

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <div className="update-form-row">
        <label htmlFor="goldPrice">Gold Price (RM/g)</label>
        <input
          id="goldPrice"
          type="number"
          value={goldPrice}
          onChange={(e) => setGoldPrice(e.target.value)}
          min="0"
          step="0.01"
        />
      </div>
      <div className="update-form-row">
        <label htmlFor="nisabValue">Nisab Value (RM)</label>
        <input
          id="nisabValue"
          type="number"
          value={nisabValue}
          onChange={(e) => setNisabValue(e.target.value)}
          min="0"
          step="0.01"
        />
      </div>
      <button type="submit" className="btn btn-dark">
        Preview Update
      </button>
    </form>
  );
}
