"use client"
import React, { useState } from 'react';
import CircularLoader from '../helpers/Loaders'; // Import the CircularLoader component

const SpinnerDemo = () => {
  // State to control the current variant being shown
  const [currentVariant, setCurrentVariant] = useState('border');

  // List of spinner variants
  const spinnerVariants = [
    'border',
    'double',
    'split',
    'dotted',
    'progress',
    'dashed',
    'eclipse'
  ];

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Circular Loaders</h1>

      {/* Buttons to trigger different variants */}
      <div className="mb-6 space-x-2">
        {spinnerVariants.map((variant) => (
          <button
            key={variant}
            onClick={() => setCurrentVariant(variant)}
            className="px-4 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            {variant.charAt(0).toUpperCase() + variant.slice(1)} Loader
          </button>
        ))}
      </div>

      {/* Display the selected spinner */}
      <div className="flex justify-center items-center">
        <CircularLoader variant={currentVariant} size="md" color="blue" />
      </div>
    </div>
  );
};

export default SpinnerDemo;
