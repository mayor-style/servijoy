// File: components/custom/Slider.jsx
import React from "react";

const Slider = ({ value, onChange, min, max, step, ariaLabelMin, ariaLabelMax }) => {
  const handleMinChange = (e) => {
    const newMin = Number(e.target.value);
    if (newMin <= value[1]) {
      onChange([newMin, value[1]]);
    }
  };

  const handleMaxChange = (e) => {
    const newMax = Number(e.target.value);
    if (newMax >= value[0]) {
      onChange([value[0], newMax]);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={handleMinChange}
          className="w-full sm:w-auto range range-primary"
          aria-label={ariaLabelMin || "Minimum value"}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={handleMaxChange}
          className="w-full sm:w-auto range range-primary"
          aria-label={ariaLabelMax || "Maximum value"}
        />
      </div>
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>Min: {value[0]}</span>
        <span>Max: {value[1]}</span>
      </div>
    </div>
  );
};

export default Slider;