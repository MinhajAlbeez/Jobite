import React from 'react';

const DateInput = ({ label, id, name, value, onChange, required = true }) => (
  <div className="mt-6">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="date"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required={required}
    />
  </div>
);

export default DateInput;
