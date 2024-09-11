"use client";

import React, { useState, useMemo } from "react";
import { Search, MapPin, Bell, User, X, Upload } from "lucide-react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Link from 'next/link';

const JobiteDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    experience: [],
    locations: [],
    employmentType: [],
    skills: [],
  });
  const [locationSearch, setLocationSearch] = useState("");
  const [salaryRange, setSalaryRange] = useState([25000, 500000]);
  const [value, setValue] = useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const allLocations = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
  ];
  const filteredLocations = useMemo(
    () =>
      allLocations.filter((loc) =>
        loc.toLowerCase().includes(locationSearch.toLowerCase())
      ),
    [locationSearch]
  );

  const availabilityOptions = ["Full Time", "Part Time", "Contract"];

  const skillOptions = [
    "JavaScript",
    "Python",
    "Java",
    "C#",
    "C++",
    "Ruby",
    "React",
    "Angular",
    "Vue.js",
    "Node.js",
    "Django",
    "Flask",
    "ASP.NET",
    "Spring Boot",
    "Express.js",
    "PHP",
    "Laravel",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Oracle",
    "SQL Server",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Google Cloud",
    "Git",
    "CI/CD",
    "Agile",
    "Scrum",
  ];

  const handleFilterToggle = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      experience: [],
      locations: [],
      employmentType: [],
      skills: [],
    });
    setSalaryRange([25000, 500000]);
    setLocationSearch("");
    setSearchTerm("");
  };

  // Mock data for demonstration purposes
  const allCandidates = [
    {
      id: 1,
      name: "Ali Khan",
      expectedSalary: 100000,
      intro:
        "Full-stack developer with 5 years of experience in MERN stack. Passionate about building scalable web applications and mentoring junior developers.",
      skills: [
        "JavaScript",
        "React",
        "Node.js",
        "MongoDB",
        "Express.js",
        "AWS",
      ],
      city: "Lahore",
      availability: "Full Time",
    },
    {
      id: 2,
      name: "Fatima Zahra",
      expectedSalary: 120000,
      intro:
        "Senior Python developer specializing in machine learning and data analysis. Experienced in building AI-powered solutions for various industries.",
      skills: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "Django",
        "PostgreSQL",
      ],
      city: "Karachi",
      availability: "Contract",
    },
    // Add more mock candidates as needed
  ];

  const filteredCandidates = useMemo(() => {
    return allCandidates.filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.intro.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesLocation =
        filters.locations.length === 0 ||
        filters.locations.includes(candidate.city);
      const matchesEmploymentType =
        filters.employmentType.length === 0 ||
        filters.employmentType.includes(candidate.availability);
      const matchesSkills =
        filters.skills.length === 0 ||
        filters.skills.some((skill) => candidate.skills.includes(skill));
      const matchesSalary =
        candidate.expectedSalary >= salaryRange[0] &&
        candidate.expectedSalary <= salaryRange[1];

      return (
        matchesSearch &&
        matchesLocation &&
        matchesEmploymentType &&
        matchesSkills &&
        matchesSalary
      );
    });
  }, [allCandidates, searchTerm, filters, salaryRange]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg
              className="w-8 h-8 text-blue-500 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="2" />
            </svg>
            <span className="font-bold text-xl text-gray-800">Jobite</span>
          </div>
          <Link href="/information" passHref>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Upload your resume
            </button>
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className="w-64 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Filter</h2>
              <button
                className="text-sm text-blue-500"
                onClick={clearAllFilters}
              >
                Clear all
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Location</label>
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
                      onChange={() => handleFilterToggle("locations", location)}
                      className="mr-2"
                    />
                    <label htmlFor={location} className="text-sm">
                      {location}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
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
                  <label htmlFor={type} className="text-sm">
                    {type}
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Expected Salary (PKR)
              </label>
              <Slider
                value={value}
                onChange={handleChange}
                aria-labelledby="continuous-slider"
                min={0}
                max={100}
                step={10}
                valueLabelDisplay="auto"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{salaryRange[0].toLocaleString()} PKR</span>
                <span>{salaryRange[1].toLocaleString()} PKR</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Skills</label>
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
                    <label htmlFor={skill} className="text-sm">
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-4 flex">
                <input
                  type="text"
                  placeholder="Search by Name, Skills or any keyword..."
                  className="flex-1 p-2 border rounded-l-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Candidate Cards */}
            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{candidate.name}</h3>
                    <button className="text-gray-400">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {candidate.expectedSalary.toLocaleString()} PKR per month
                  </p>
                  <p className="text-sm mb-4">{candidate.intro}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {candidate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    {candidate.city}, Pakistan • {candidate.availability}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobiteDashboard;
