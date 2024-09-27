import React from 'react';
import { Slider } from 'antd';

const SliderInput = ({ label, value, onChange }) => (
  <div className="col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}: ${value[0].toLocaleString()} - ${value[1].toLocaleString()}
    </label>
    <Slider
      defaultValue={value}
      max={300000}
      step={1000}
      minStepsBetweenThumbs={10}
      onValueChange={onChange}
    />
  </div>
);

export default SliderInput;
