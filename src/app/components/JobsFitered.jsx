// components/FilterSidebar.jsx
"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import TextField from "../helpers/TextField";
import { MapPin, Briefcase, Clock, DollarSign } from "lucide-react";

const JobsFiltered = ({
  jobTypes,
  selectedJobTypes,
  onJobTypeChange,
  salaryRange,
  onSalaryRangeChange,
  locations,
  selectedLocation,
  onLocationChange,
}) => {
  return (
    <Card className="w-80 h-[calc(100vh-100px)] overflow-y-auto">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location Filter */}
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </label>
          <TextField
            type="text"
            placeholder="Search location..."
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            list="locations"
          />
          <datalist id="locations">
            {locations.map((location) => (
              <option key={location} value={location} />
            ))}
          </datalist>
        </div>
        {/* Job Type Filter */}
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Job Type
          </label>
          {jobTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={type}
                checked={selectedJobTypes.includes(type)}
                onChange={() => onJobTypeChange(type)}
              />
              <label htmlFor={type} className="text-sm">
                {type}
              </label>
            </div>
          ))}
        </div>

        {/* Salary Range Filter */}
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Salary Range
          </label>
          <Slider
            value={salaryRange}
            onChange={onSalaryRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={150000}
            step={5000}
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>${salaryRange[0].toLocaleString()}</span>
            <span>${salaryRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Advertisement Section */}
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="text-sm text-gray-600">Advertisement</p>
          <p>You can place ads 300x360</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobsFiltered;
