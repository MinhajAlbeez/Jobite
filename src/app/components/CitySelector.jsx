import React, { useState, useMemo, useEffect } from 'react';
import CountryData from '../../data/CountryData.json'; // Adjust this path as needed

const CitySelector = ({ selectedCountry, setSelectedCountry, selectedProvince, setSelectedProvince, setCity, darkMode }) => {
  const [dropdownOpen, setDropdownOpen] = useState({ country: false, province: false, city: false });
  const [citySearch, setCitySearch] = useState('');

  // Set default country to Pakistan if not already set
  useEffect(() => {
    if (!selectedCountry) {
      setSelectedCountry('Pakistan');
    }
  }, [selectedCountry, setSelectedCountry]);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedProvince(''); // Clear selected province when country changes
    setCity('');
    setCitySearch('');
    setDropdownOpen({ country: false, province: false, city: false });
  };

  const handleProvinceChange = (province) => {
    setSelectedProvince(province);
    setCity('');
    setCitySearch('');
    setDropdownOpen({ country: false, province: false, city: true });
  };

  const handleCityChange = (city) => {
    setCity(city);
    setCitySearch('');
    setDropdownOpen({ country: false, province: false, city: false });
  };

  const filteredProvinces = useMemo(() => {
    if (!selectedCountry) return [];
    return CountryData[selectedCountry]?.Provinces || [];
  }, [selectedCountry]);

  const filteredCities = useMemo(() => {
    if (!selectedProvince) return [];
    const provinceData = CountryData[selectedCountry]?.Provinces.find(
      (province) => province.name === selectedProvince
    );
    console.log('Filtered Cities:', provinceData ? provinceData.cities : []); // Debugging output
    return provinceData ? provinceData.cities : [];
  }, [selectedProvince, selectedCountry]);

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Location</label>
      <div className="relative">
        {/* Country Dropdown */}
        <button
          type="button"
          onClick={() => setDropdownOpen(prev => ({ ...prev, country: !prev.country }))}
          className={`w-full px-4 py-2 rounded-md border-2 ${darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"} focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200`}
        >
          {selectedCountry || 'Select Country'}
        </button>
        {dropdownOpen.country && (
          <ul className={`absolute z-10 w-full mt-1 rounded-md shadow-lg max-h-60 overflow-auto ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}>
            {Object.keys(CountryData).map((country) => (
              <li
                key={country}
                className={`px-4 py-2 cursor-pointer ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"}`}
                onClick={() => handleCountryChange(country)}
              >
                {country}
              </li>
            ))}
          </ul>
        )}

        {/* Province Dropdown */}
        {selectedCountry && (
          <div className="relative mt-2">
            <button
              type="button"
              onClick={() => setDropdownOpen(prev => ({ ...prev, province: !prev.province }))}
              className={`w-full px-4 py-2 rounded-md border-2 ${darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"} focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200`}
            >
              {selectedProvince || 'Select Province'}
            </button>
            {dropdownOpen.province && (
              <ul className={`absolute z-10 w-full mt-1 rounded-md shadow-lg max-h-60 overflow-auto ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}>
                {filteredProvinces.map((province) => (
                  <li
                    key={province.name}
                    className={`px-4 py-2 cursor-pointer ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"}`}
                    onClick={() => handleProvinceChange(province.name)}
                  >
                    {province.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* City Input */}
        {selectedProvince && (
          <div className="relative mt-2">
            <input
              type="text"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              className={`w-full px-4 py-2 rounded-md border-2 ${darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"} focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200`}
              placeholder="Search for a city"
            />
            {citySearch && filteredCities.length > 0 && (
              <ul className={`absolute z-10 w-full mt-1 rounded-md shadow-lg max-h-60 overflow-auto ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}>
                {filteredCities.filter(city => city.toLowerCase().includes(citySearch.toLowerCase())).map((city, index) => (
                  <li
                    key={index}
                    className={`px-4 py-2 cursor-pointer ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"}`}
                    onClick={() => handleCityChange(city)}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CitySelector;
