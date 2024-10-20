import React from 'react';
import { Slider } from 'antd';

const SliderInput = ({ label, value = [0, 0], onChange }) => {
  // Ensure value is defined and has a length of 2
  const minValue = value[0] || 0; // Default to 0 if undefined
  const maxValue = value[1] || 0; // Default to 0 if undefined

  return (
    <div className="col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}: ${minValue.toLocaleString()} - ${maxValue.toLocaleString()}
      </label>
      <Slider
        range // Make the slider a range slider
        value={value} // Use the value prop instead of defaultValue to reflect current state
        max={300000}
        step={1000}
        minStepsBetweenThumbs={10}
        onChange={onChange} // Update the onChange to the correct prop
      />
    </div>
  );
};

export default SliderInput;
