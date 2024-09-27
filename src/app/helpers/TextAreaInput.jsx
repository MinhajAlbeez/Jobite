import React from 'react';

const TextAreaInput = ({ label, id, name, value, onChange, required = true }) => (
  <div className="mt-6">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows="4"
      required={required}
    ></textarea>
  </div>
);

export default TextAreaInput;
