import React from "react";

const Currency = ({ currencies }) => {
  return (
    <div>
      <input type="number" className="input" />
      <select>
        {currencies.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Currency;
