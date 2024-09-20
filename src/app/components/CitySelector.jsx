import React, { useMemo, useEffect } from 'react';
import CountryData from '../../data/CountryData.json'; // Adjust this path as needed

const CitySelector = ({ selectedCountry, setSelectedCountry, selectedProvince, setSelectedProvince, setCity, darkMode,city }) => {
  // Set default country to Pakistan if not already set
  useEffect(() => {
    if (!selectedCountry) {
      setSelectedCountry('Pakistan');
    }
  }, [selectedCountry, setSelectedCountry]);

  const filteredProvinces = useMemo(() => {
    if (!selectedCountry) return [];
    return CountryData[selectedCountry]?.Provinces || [];
  }, [selectedCountry]);

  const filteredCities = useMemo(() => {
    if (!selectedProvince) return [];
    const provinceData = CountryData[selectedCountry]?.Provinces.find(
      (province) => province.name === selectedProvince
    );
    return provinceData ? provinceData.cities : [];
  }, [selectedProvince, selectedCountry]);

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Location</label>

      {/* Country Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Select Country</label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className={`w-full px-4 py-2 rounded-md border-2 ${darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"} focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200`}
        >
          {Object.keys(CountryData).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Province Dropdown */}
      {selectedCountry && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select Province</label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className={`w-full px-4 py-2 rounded-md border-2 ${darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"} focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200`}
          >
            <option value="">Select Province</option>
            {filteredProvinces.map((province) => (
              <option key={province.name} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* City Dropdown */}
      {selectedProvince && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select City</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`w-full px-4 py-2 rounded-md border-2 ${darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"} focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200`}
          >
            <option value="">Select City</option>
            {filteredCities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CitySelector;
