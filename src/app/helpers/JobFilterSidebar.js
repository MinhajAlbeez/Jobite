import { useState } from 'react';

const SimpleSalaryRange = ({ onSalaryChange }) => {
  const [salary, setSalary] = useState({
    min: 0,
    max: 100000
  });

  const handleChange = (field) => (e) => {
    const value = parseInt(e.target.value) || 0;
    const newSalary = { ...salary, [field]: value };
    setSalary(newSalary);
    onSalaryChange(newSalary);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex-1">
        <label className="block mb-2 text-sm text-gray-600">
          Minimum Salary
        </label>
        <input
          type="number"
          value={salary.min}
          onChange={handleChange('min')}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Min salary"
        />
      </div>

      <div className="flex-1">
        <label className="block mb-2 text-sm text-gray-600">
          Maximum Salary
        </label>
        <input
          type="number"
          value={salary.max}
          onChange={handleChange('max')}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Max salary"
        />
      </div>
    </div>
  );
};

export default SimpleSalaryRange;