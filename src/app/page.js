"use client";
import axios from "axios";
import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import FilterSidebar from "../app/components/FilterSidebar";
import SearchBar from "../app/helpers/SearchBar";
import CandidateCard from "../app/components/CandidateCard";
import Link from "next/link";
import { Search, MapPin, Bell, User, X, Upload } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInfo } from "../redux/InfoSlicer";
import CountryData from "../data/CountryData.json";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import DashboardNav from "./components/DashboardNav ";


const JobiteDashboard = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    experience: [],
    locations: [],
    employmentType: [],
    skills: [],
  });
  const [locationSearch, setLocationSearch] = useState("");
  const [salaryRange, setSalaryRange] = useState([0, 5000000]);
  const [value, setValue] = useState(30);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const info = useSelector((state) => state.info.data);
  const isLoading = useSelector((state) => state.info.isLoading); // Get loading state
  const [selectedProvince, setSelectedProvince] = useState(""); // Added state for selected province
  const [cities, setCities] = useState([]); // State for cities based on selected province


  useEffect(() => {
    dispatch(fetchInfo());
    console.log("ddddddd", dispatch);
  }, [dispatch]);

  useEffect(() => {
    console.log("Infodtaaa", info);
  }, [info]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //   "Karachi",
  //   "Lahore",
  //   "Islamabad",
  //   "Rawalpindi",
  //   "Faisalabad",
  //   "Multan",
  //   "Peshawar",
  //   "Quetta",
  // ];
  // const filteredLocations = useMemo(
  //   () =>
  //     allLocations.filter((loc) =>
  //       loc.toLowerCase().includes(locationSearch.toLowerCase())
  //     ),
  //   [locationSearch]
  // );

  useEffect(() => {
    const provinceData = CountryData.Pakistan.Provinces.find(
      (data) => data.name === selectedProvince
    );
    setCities(provinceData ? provinceData.cities : []);
  }, [selectedProvince]);

  const filteredLocations = useMemo(() => {
    return CountryData.Pakistan.Provinces.map((data) => data.name).filter(
      (loc) => loc.toLowerCase().includes(locationSearch.toLowerCase())
    );
  }, [locationSearch]);

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
    setSalaryRange([0, 5000000]);
    setLocationSearch("");
    setSearchTerm("");
  };

  const filteredCandidates = useMemo(() => {
    if (!info || !Array.isArray(info)) return [];

    return info.filter((candidate) => {
      const matchesSearch =
        (candidate.fullName &&
          candidate.fullName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (candidate.aboutUs &&
          candidate.aboutUs.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (candidate.skills &&
          candidate.skills.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          ));

      const matchesLocation =
        filters.locations.length === 0 ||
        filters.locations.includes(candidate.city);

      const matchesEmploymentType =
        filters.employmentType.length === 0 ||
        filters.employmentType.includes(candidate.jobType);

      const matchesSkills =
        filters.skills.length === 0 ||
        filters.skills.some(
          (skill) => candidate.skills && candidate.skills.includes(skill)
        );

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
  }, [info, searchTerm, filters, salaryRange]);

  useEffect(() => {
    console.log("Filtered Candidates:", filteredCandidates);
  }, [filteredCandidates]);

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <FilterSidebar
            locationSearch={locationSearch}
            setLocationSearch={setLocationSearch}
            filteredLocations={filteredLocations}
            filters={filters}
            handleFilterToggle={handleFilterToggle}
            availabilityOptions={availabilityOptions}
            skillOptions={skillOptions}
            salaryRange={salaryRange}
            setSalaryRange={setSalaryRange}
            clearAllFilters={clearAllFilters}
            setSelectedProvince={setSelectedProvince}
            cities={cities}
          />

          <div className="flex-1">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {isLoading ? (
              <Box className="flex justify-center items-center h-full">
                <CircularProgress color="inherit" />
              </Box>
            ) : (
              <div className="space-y-4">
                {filteredCandidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
            )}
          </div>
        </div>
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            // count={totalPages}
            // page={page}
            // onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </main>
    </div>
  );
};

export default JobiteDashboard;
