import React from "react";
import { MapPin } from "lucide-react";
import Slider from "@mui/material/Slider";

const FilterSidebar = ({
  locationSearch,
  setLocationSearch,
  filteredLocations,
  filters,
  handleFilterToggle,
  availabilityOptions,
  skillOptions,
  salaryRange,
  setSalaryRange,
  clearAllFilters,
  cities,
  setSelectedProvince,
}) => {
  return (
    <div className="w-64 bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-black">Filter</h2>
        <button className="text-sm text-blue-500" onClick={clearAllFilters}>
          Clear all
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-black">
          Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search locations..."
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
        </div>
        <div className="mt-2 max-h-40 overflow-y-auto">
          {filteredLocations.map((location) => (
            <div key={location} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={location}
                checked={filters.locations.includes(location)}
                onChange={() => {
                  handleFilterToggle("locations", location);
                  setSelectedProvince(location);
                }}
                className="mr-2"
              />
              <label htmlFor={location} className="text-sm text-black">
                {location}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Cities */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-black">
          Cities
        </label>
        <div className="max-h-40 overflow-y-auto">
          {cities && cities.length > 0 ? (
            cities.map((city) => (
              <div key={city} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={city}
                  checked={filters.locations.includes(city)}
                  onChange={() => handleFilterToggle("locations", city)}
                  className="mr-2"
                />
                <label htmlFor={city} className="text-sm text-black">
                  {city}
                </label>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No cities available</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-black">
          Availability
        </label>
        {availabilityOptions.map((type) => (
          <div key={type} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={type}
              checked={filters.employmentType.includes(type)}
              onChange={() => handleFilterToggle("employmentType", type)}
              className="mr-2"
            />
            <label htmlFor={type} className="text-sm text-black">
              {type}
            </label>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-black">
          Expected Salary (PKR)
        </label>
        <Slider
          value={salaryRange}
          onChange={(e, newValue) => setSalaryRange(newValue)}
          aria-labelledby="range-slider"
          min={0}
          max={5000000}
          valueLabelDisplay="auto"
          getAriaValueText={(value) => `${value} PKR`}
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>{salaryRange[0].toLocaleString()} PKR</span>
          <span>{salaryRange[1].toLocaleString()} PKR</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-black">
          Skills
        </label>
        <div className="max-h-40 overflow-y-auto">
          {skillOptions.map((skill) => (
            <div key={skill} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={skill}
                checked={filters.skills.includes(skill)}
                onChange={() => handleFilterToggle("skills", skill)}
                className="mr-2"
              />
              <label htmlFor={skill} className="text-sm text-black">
                {skill}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
